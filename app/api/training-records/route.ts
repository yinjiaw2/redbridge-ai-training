import { NextResponse } from "next/server";
import { readSession } from "../../../lib/auth";
import { ensureSchema } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await readSession();
    if (!session)
      return NextResponse.json({ error: "请先登录" }, { status: 401 });
    const sql = await ensureSchema();
    const rows =
      session.role === "admin"
        ? await sql`SELECT data FROM redbridge_training_records ORDER BY created_at DESC`
        : await sql`SELECT data FROM redbridge_training_records WHERE username = ${session.username} ORDER BY created_at DESC`;
    return NextResponse.json(rows.map((row) => row.data));
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await readSession();
    if (session?.role !== "learner")
      return NextResponse.json({ error: "请先登录学员账户" }, { status: 401 });
    const record = await request.json();
    if (!record?.id || !record?.scenario?.id || !Array.isArray(record.messages))
      return NextResponse.json({ error: "训练记录格式无效" }, { status: 400 });
    const safeRecord = {
      ...record,
      username: session.username,
      learner: session.name,
      completedAt: new Date().toISOString(),
    };
    const sql = await ensureSchema();
    const rows = await sql`
      INSERT INTO redbridge_training_records
        (id, username, learner, scenario_id, data)
      VALUES
        (${safeRecord.id}, ${session.username}, ${session.name}, ${safeRecord.scenario.id}, ${JSON.stringify(safeRecord)}::jsonb)
      ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data
      RETURNING data
    `;
    return NextResponse.json(rows[0].data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await readSession();
    if (session?.role !== "admin")
      return NextResponse.json(
        { error: "仅管理员可以提交评审" },
        { status: 403 },
      );
    const { id, evaluation } = await request.json();
    if (!id || !evaluation?.scores || !Number.isFinite(evaluation.overallScore))
      return NextResponse.json({ error: "评审数据无效" }, { status: 400 });
    const sql = await ensureSchema();
    const existing = await sql`
      SELECT data FROM redbridge_training_records WHERE id = ${id}
    `;
    if (!existing.length)
      return NextResponse.json({ error: "训练记录不存在" }, { status: 404 });
    const updated = {
      ...existing[0].data,
      evaluation: {
        ...existing[0].data.evaluation,
        ...evaluation,
        reviewedBy: session.name,
        reviewedAt: new Date().toISOString(),
        source: "human",
      },
    };
    const rows = await sql`
      UPDATE redbridge_training_records
      SET data = ${JSON.stringify(updated)}::jsonb
      WHERE id = ${id}
      RETURNING data
    `;
    return NextResponse.json(rows[0].data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 503 });
  }
}
