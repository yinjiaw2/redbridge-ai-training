import { NextResponse } from "next/server";
import { readSession } from "../../../lib/auth";

type Message = { sender?: string; content?: string };

const clamp = (value: number, max: number) => Math.max(0, Math.min(max, value));

export async function POST(request: Request) {
  const session = await readSession();
  if (session?.role !== "learner")
    return NextResponse.json({ error: "请先登录学员账户" }, { status: 401 });
  const {
    messages = [],
    difficulty = "中等",
    failed = false,
  } = (await request.json()) as {
    messages?: Message[];
    difficulty?: string;
    failed?: boolean;
  };
  const studentMessages = messages
    .filter((message) => message.sender === "STUDENT")
    .map((message) => String(message.content || ""));
  const text = studentMessages.join("\n");
  const questionCount = (text.match(/[？?]/g) || []).length;
  const hasGreeting = /您好|你好|感谢|很高兴/.test(text);
  const hasBusinessIntro =
    /Redbridge|红桥|我们(公司|团队)|我们的(业务|服务)|移民.{0,8}(服务|咨询)|签证.{0,8}(服务|咨询)/i.test(
      text,
    );
  const hasNeeds =
    /需求|目标|担心|关心|计划|情况|经验|雇主|时间|预算|原因/.test(text);
  const hasKnowledge = /签证|担保|材料|资格|流程|评估|申请|政策|风险/.test(
    text,
  );
  const hasObjection = /理解|顾虑|担心|费用|价格|风险|疑问/.test(text);
  const hasNextStep = /下一步|预约|评估|材料|跟进|联系|安排|发送|确认/.test(
    text,
  );
  const deductions: string[] = [];

  let needsDiscovery = 8 + Math.min(10, questionCount * 2) + (hasNeeds ? 2 : 0);
  let communication =
    9 + (hasGreeting ? 3 : 0) + (studentMessages.length >= 3 ? 3 : 0);
  let knowledge = 10 + (hasKnowledge ? 7 : 0);
  let objectionHandling = 9 + (hasObjection ? 6 : 0);
  let conversationControl =
    5 + (questionCount >= 2 ? 3 : 0) + (studentMessages.length >= 3 ? 2 : 0);
  let closing = 5 + (hasNextStep ? 6 : 0) + (hasBusinessIntro ? 4 : 0);

  if (!hasBusinessIntro) {
    communication -= 3;
    closing -= 5;
    deductions.push("未介绍 Redbridge、自身身份或可提供的业务服务（-8）");
  }
  if (!hasNextStep) {
    closing -= 4;
    deductions.push("结束前未提出明确下一步或行动计划（-4）");
  }
  if (questionCount < 2) {
    needsDiscovery -= 4;
    conversationControl -= 2;
    deductions.push("开放式或确认性问题不足，需求挖掘不充分（-6）");
  }
  if (studentMessages.length < 3) {
    communication -= 2;
    deductions.push("对话过短，尚未形成完整的专业咨询流程（-2）");
  }
  if (failed) {
    communication -= difficulty === "困难" ? 3 : 5;
    conversationControl -= 4;
    closing -= 5;
    deductions.push(
      `AI 客户在${difficulty}难度下主动终止了对话（-${difficulty === "困难" ? 12 : 14}）`,
    );
  }

  const scores = {
    needsDiscovery: clamp(needsDiscovery, 20),
    communication: clamp(communication, 15),
    knowledge: clamp(knowledge, 20),
    objectionHandling: clamp(objectionHandling, 20),
    conversationControl: clamp(conversationControl, 10),
    closing: clamp(closing, 15),
  };
  const overallScore = Object.values(scores).reduce(
    (sum, score) => sum + score,
    0,
  );
  return NextResponse.json({
    scores,
    overallScore,
    strengths: hasNeeds
      ? "能够围绕客户背景和核心诉求展开沟通。"
      : "语气基本清晰，能够维持客户对话。",
    improvements: deductions.length
      ? deductions.join("；")
      : "表现完整，可继续加强问题之间的逻辑衔接。",
    deductions,
  });
}
