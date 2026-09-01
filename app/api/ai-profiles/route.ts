import { NextResponse } from "next/server";
import { readSession } from "../../../lib/auth";
import { ensureSchema } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await readSession();
    if (session?.role !== "admin")
      return NextResponse.json(
        { error: "仅管理员可以管理 AI 客户" },
        { status: 403 },
      );
    const sql = await ensureSchema();
    const rows =
      await sql`SELECT data FROM redbridge_ai_profiles ORDER BY customer_id`;
    return NextResponse.json(rows.map((row) => row.data));
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await readSession();
    if (session?.role !== "admin")
      return NextResponse.json(
        { error: "仅管理员可以管理 AI 客户" },
        { status: 403 },
      );
    const profile = await request.json();
    if (!profile?.customerId || !profile?.persona?.trim())
      return NextResponse.json(
        { error: "客户编号和画像不能为空" },
        { status: 400 },
      );
    const safeProfile = {
      customerId: String(profile.customerId).slice(0, 100),
      persona: String(profile.persona).slice(0, 4000),
      requirements: String(profile.requirements || "").slice(0, 4000),
      behaviorRules: String(profile.behaviorRules || "").slice(0, 4000),
      failureRules: String(profile.failureRules || "").slice(0, 4000),
      updatedAt: new Date().toISOString(),
    };
    const sql = await ensureSchema();
    const rows = await sql`
      INSERT INTO redbridge_ai_profiles (customer_id, data)
      VALUES (${safeProfile.customerId}, ${JSON.stringify(safeProfile)}::jsonb)
      ON CONFLICT (customer_id) DO UPDATE
      SET data = EXCLUDED.data, updated_at = NOW()
      RETURNING data
    `;
    return NextResponse.json(rows[0].data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 503 });
  }
}
