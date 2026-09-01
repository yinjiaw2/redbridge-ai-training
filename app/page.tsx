"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Star,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react";
import type { Scenario, TrainingMessage } from "./types";
import { demoCustomers, demoScenarios, mockReply } from "./data";

type Role = "student" | "admin";
type StudentView =
  "dashboard" | "training" | "assignments" | "history" | "performance";
type AdminView =
  | "dashboard"
  | "students"
  | "customers"
  | "conversations"
  | "scenarios"
  | "assignments"
  | "reviews"
  | "analytics";
const scoreRows = [
  ["需求挖掘", 16, 20],
  ["沟通表达", 13, 15],
  ["专业知识", 16, 20],
  ["异议处理", 15, 20],
  ["对话掌控", 8, 10],
  ["下一步引导", 13, 15],
] as const;

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white">
        <MessageCircle size={20} />
      </div>
      <div>
        <div className="text-[15px] font-bold">Redbridge</div>
        <div className="text-[11px] text-slate-500">客户对话训练平台</div>
      </div>
    </div>
  );
}
function Pill({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "green" | "amber" | "blue" | "red";
}) {
  const c = {
    slate: "bg-slate-100 text-slate-600",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-blue-50 text-blue-700",
    red: "bg-rose-50 text-rose-700",
  }[tone];
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${c}`}
    >
      {children}
    </span>
  );
}

function Login({ onLogin }: { onLogin: (r: Role) => void }) {
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("demo1234");
  const [show, setShow] = useState(false);
  return (
    <main className="login-shell min-h-screen p-4 sm:p-7">
      <div className="mx-auto grid min-h-[calc(100vh-56px)] max-w-[1240px] overflow-hidden rounded-[30px] bg-white shadow-[0_26px_80px_rgba(31,52,44,.13)] lg:grid-cols-[1.08fr_.92fr]">
        <section className="relative hidden overflow-hidden bg-[#18181b] p-14 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#b11217]/35 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10">
              <MessageCircle />
            </div>
            <div>
              <b>Redbridge</b>
              <div className="text-xs text-red-100/70">Customer Training</div>
            </div>
          </div>
          <div className="relative max-w-xl">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-red-100">
              情景实训 · 即时反馈
            </span>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.12] tracking-[-.035em]">
              把每一次客户沟通，
              <br />
              变成专业能力。
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-200/80">
              在安全、真实的模拟场景中练习需求挖掘、异议处理与成交引导。
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-7 text-sm">
              {[
                ["8", "训练场景"],
                ["6", "能力维度"],
                ["24/7", "随时练习"],
              ].map((x) => (
                <div key={x[1]}>
                  <b className="block text-2xl">{x[0]}</b>
                  <span className="text-zinc-300/70">{x[1]}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="relative text-xs text-zinc-400">
            © 2026 Redbridge Group · Phase 1 Mock Environment
          </p>
        </section>
        <section className="flex items-center justify-center px-6 py-12 sm:px-14">
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              onLogin(email.startsWith("admin") ? "admin" : "student");
            }}
            className="w-full max-w-[430px]"
          >
            <div className="mb-10 lg:hidden">
              <Brand />
            </div>
            <p className="text-sm font-semibold text-brand">欢迎回来</p>
            <h2 className="mt-2 text-3xl font-bold">登录训练工作台</h2>
            <p className="mt-3 text-sm text-slate-500">
              使用演示账号探索学员与管理员完整流程。
            </p>
            <label className="label mt-8">邮箱</label>
            <input
              className="input h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-5 flex justify-between">
              <label className="label mb-0">密码</label>
              <button
                type="button"
                className="text-xs font-semibold text-brand"
              >
                忘记密码？
              </button>
            </div>
            <div className="relative">
              <input
                className="input h-12 pr-16"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-xs font-semibold text-slate-500"
              >
                {show ? "隐藏" : "显示"}
              </button>
            </div>
            <button className="btn-primary mt-7 h-12 w-full">
              登录 <ChevronRight size={17} />
            </button>
            <div className="my-7 flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              快速体验
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onLogin("student")}
                className="demo-account"
              >
                <GraduationCap size={18} />
                <span>
                  <b>学员端</b>
                  <small>student@example.com</small>
                </span>
              </button>
              <button
                type="button"
                onClick={() => onLogin("admin")}
                className="demo-account"
              >
                <ShieldCheck size={18} />
                <span>
                  <b>管理端</b>
                  <small>admin@example.com</small>
                </span>
              </button>
            </div>
            <p className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={13} />
              仅使用匿名化的虚拟客户数据
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

const studentNav = [
  ["dashboard", "工作台", LayoutDashboard],
  ["training", "训练中心", MessageCircle],
  ["assignments", "我的任务", Target],
  ["history", "训练记录", History],
  ["performance", "能力表现", BarChart3],
] as const;
const adminNav = [
  ["dashboard", "概览", LayoutDashboard],
  ["students", "学员管理", Users],
  ["customers", "客户画像", UserRound],
  ["conversations", "历史对话", FileText],
  ["scenarios", "训练场景", MessageCircle],
  ["assignments", "任务分配", Target],
  ["reviews", "训练评审", CheckCircle2],
  ["analytics", "数据分析", BarChart3],
] as const;
function Shell({
  role,
  view,
  setView,
  onLogout,
  children,
}: {
  role: Role;
  view: string;
  setView: (v: any) => void;
  onLogout: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const nav = role === "admin" ? adminNav : studentNav;
  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[248px] border-r border-slate-200 bg-white p-5 transition lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between">
          <Brand />
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X />
          </button>
        </div>
        <div className="mt-8 rounded-xl border border-[#f5d5d6] bg-[#fdf0f0] p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand">
            {role === "admin" ? "Admin workspace" : "Student workspace"}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-brand text-xs font-bold text-white">
              {role === "admin" ? "AM" : "JL"}
            </div>
            <div>
              <b className="block text-xs">
                {role === "admin" ? "Alex Morgan" : "Jamie Lee"}
              </b>
              <span className="text-[11px] text-slate-500">
                {role === "admin" ? "培训主管" : "顾问 · 市场组"}
              </span>
            </div>
          </div>
        </div>
        <nav className="mt-7 space-y-1">
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => {
                setView(id);
                setOpen(false);
              }}
              className={`nav-item ${view === id ? "nav-active" : ""}`}
            >
              <Icon size={18} />
              {label}
              {id === "reviews" && (
                <span className="ml-auto rounded-full bg-amber-100 px-2 text-[10px] text-amber-700">
                  3
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 border-t pt-4">
          <button className="nav-item">
            <Settings size={18} />
            设置
          </button>
          <button onClick={onLogout} className="nav-item text-slate-500">
            <LogOut size={18} />
            退出登录
          </button>
        </div>
      </aside>
      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b bg-white/90 px-5 backdrop-blur lg:px-8">
          <button onClick={() => setOpen(true)} className="lg:hidden">
            <Menu />
          </button>
          <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
            <span>{role === "admin" ? "管理中心" : "学习中心"}</span>
            <ChevronRight size={14} />
            <b className="text-slate-700">
              {nav.find((n) => n[0] === view)?.[1]}
            </b>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative grid h-9 w-9 place-items-center rounded-full border">
              <Bell size={17} />
              <i className="absolute right-1 top-1 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
            </button>
            <div className="hidden text-right sm:block">
              <b className="block text-xs">
                {role === "admin" ? "Alex Morgan" : "Jamie Lee"}
              </b>
              <span className="text-[10px] text-slate-400">
                {role === "admin" ? "管理员" : "学员"}
              </span>
            </div>
            <ChevronDown size={14} />
          </div>
        </header>
        {children}
      </div>
      {open && (
        <button
          className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  note,
  tone = "green",
}: {
  icon: any;
  label: string;
  value: string;
  note: string;
  tone?: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex justify-between">
        <div className={`stat-icon ${tone}`}>
          <Icon size={19} />
        </div>
        <MoreHorizontal size={18} className="text-slate-300" />
      </div>
      <p className="mt-5 text-xs text-slate-500">{label}</p>
      <div className="mt-1 flex items-end justify-between">
        <b className="text-3xl">{value}</b>
        <span className="text-[11px] text-slate-400">{note}</span>
      </div>
    </div>
  );
}
function ScenarioMini({
  scenario,
  onStart,
}: {
  scenario: Scenario;
  onStart: (s: Scenario) => void;
}) {
  return (
    <div className="rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex justify-between">
        <div className="stat-icon green">
          <MessageCircle size={17} />
        </div>
        <Pill tone={scenario.difficulty === "困难" ? "red" : "amber"}>
          {scenario.difficulty}
        </Pill>
      </div>
      <b className="mt-4 block text-sm">{scenario.title}</b>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
        {scenario.objective}
      </p>
      <div className="mt-4 flex justify-between text-xs text-slate-400">
        <span className="flex gap-1">
          <Clock3 size={13} />
          {scenario.estimatedMinutes} 分钟
        </span>
        <button
          onClick={() => onStart(scenario)}
          className="font-semibold text-brand"
        >
          开始训练 →
        </button>
      </div>
    </div>
  );
}
function PerformanceCard() {
  return (
    <section className="card p-6">
      <div className="section-head">
        <div>
          <h2>能力概览</h2>
          <p>最近 5 次训练</p>
        </div>
        <span className="flex gap-1 text-xs font-semibold text-emerald-600">
          <TrendingUp size={14} />
          +6%
        </span>
      </div>
      <div className="mt-6 flex justify-center">
        <div className="score-ring">
          <div>
            <b>78</b>
            <span>综合评分</span>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {[
          ["需求挖掘", 82],
          ["沟通表达", 86],
          ["专业知识", 74],
          ["异议处理", 68],
        ].map(([x, n]) => (
          <div key={x as string}>
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="text-slate-500">{x}</span>
              <b>{n}</b>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${n}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function StudentDashboard({
  onStart,
  onView,
}: {
  onStart: (s: Scenario) => void;
  onView: (v: StudentView) => void;
}) {
  return (
    <Page>
      <div className="hero-card relative overflow-hidden rounded-2xl p-7 text-white">
        <p className="text-sm text-zinc-300">星期二，9月1日</p>
        <h1 className="mt-2 text-3xl font-semibold">早上好，Jamie 👋</h1>
        <p className="mt-2 text-sm text-zinc-300/90">
          今天继续精进客户沟通技巧，你有 2 项训练待完成。
        </p>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          icon={Target}
          label="待完成训练"
          value="4"
          note="2 项本周到期"
          tone="blue"
        />
        <Stat icon={CheckCircle2} label="已完成" value="12" note="本月 +3" />
        <Stat
          icon={Trophy}
          label="平均分"
          value="78"
          note="较上月 +4"
          tone="amber"
        />
        <Stat
          icon={Clock3}
          label="训练时长"
          value="6.4h"
          note="本月 1.8h"
          tone="purple"
        />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.75fr]">
        <section className="card p-6">
          <div className="section-head">
            <div>
              <h2>继续训练</h2>
              <p>你上次离开的地方</p>
            </div>
            <button onClick={() => onView("assignments")} className="text-link">
              查看全部 <ChevronRight size={14} />
            </button>
          </div>
          <div className="mt-5 rounded-2xl border border-[#f5d5d6] bg-[#fdf0f0] p-5">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white text-brand">
                  <BriefcaseBusiness />
                </div>
                <div>
                  <div className="flex flex-wrap gap-2">
                    <b>485 市场营销客户</b>
                    <Pill tone="amber">中等</Pill>
                    <Pill tone="blue">进行中</Pill>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    训练目标：识别客户需求并处理价格异议
                  </p>
                </div>
              </div>
              <button
                onClick={() => onStart(demoScenarios[0])}
                className="btn-primary"
              >
                <Play size={15} />
                继续训练
              </button>
            </div>
          </div>
          <div className="section-head mt-7">
            <div>
              <h2>为你推荐</h2>
              <p>基于最近的能力表现</p>
            </div>
            <button onClick={() => onView("training")} className="text-link">
              训练中心 <ChevronRight size={14} />
            </button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {demoScenarios.slice(1, 3).map((s) => (
              <ScenarioMini key={s.id} scenario={s} onStart={onStart} />
            ))}
          </div>
        </section>
        <PerformanceCard />
      </div>
      <section className="card mt-5 p-6">
        <div className="section-head">
          <div>
            <h2>最近训练结果</h2>
            <p>近 30 天已完成训练</p>
          </div>
        </div>
        <ResultTable />
      </section>
    </Page>
  );
}

function TrainingLibrary({ onStart }: { onStart: (s: Scenario) => void }) {
  const [q, setQ] = useState("");
  return (
    <Page>
      <Title
        eyebrow="Training library"
        title="训练中心"
        copy="选择适合你的客户情景，开始一次安全、专注的对话练习。"
      />
      <div className="card mt-6 flex flex-col gap-3 p-4 md:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-2.5 text-slate-400"
            size={17}
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input pl-10"
            placeholder="搜索场景或训练目标"
          />
        </div>
        {["全部难度", "客户类型", "行业"].map((x) => (
          <button className="filter" key={x}>
            {x}
            <ChevronDown size={14} />
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {demoScenarios
          .filter((s) => s.title.includes(q))
          .map((s, i) => (
            <div className="card overflow-hidden" key={s.id}>
              <div
                className={`h-2 ${["bg-brand", "bg-[#18181b]", "bg-[#7f1d1d]"][i % 3]}`}
              />
              <div className="p-5">
                <div className="flex justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-brand">
                    <UserRound />
                  </div>
                  <Pill
                    tone={
                      s.difficulty === "困难"
                        ? "red"
                        : s.difficulty === "简单"
                          ? "green"
                          : "amber"
                    }
                  >
                    {s.difficulty}
                  </Pill>
                </div>
                <h3 className="mt-5 font-bold">{s.title}</h3>
                <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">
                  {s.objective}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 border-y py-4 text-xs">
                  <span>
                    <small>客户类型</small>
                    <b>{s.customerType}</b>
                  </span>
                  <span>
                    <small>预计时长</small>
                    <b>{s.estimatedMinutes} 分钟</b>
                  </span>
                </div>
                <button
                  onClick={() => onStart(s)}
                  className="btn-primary mt-5 w-full"
                >
                  <Play size={15} />
                  开始训练
                </button>
              </div>
            </div>
          ))}
      </div>
    </Page>
  );
}

const makeMessageId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `message-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const demoPrompts = [
  "可以介绍一下您的工作经验吗？",
  "您的雇主愿意提供担保吗？",
  "您最担心的是费用还是时间？",
];

function Chat({
  scenario,
  onEnd,
  onBack,
}: {
  scenario: Scenario;
  onEnd: (m: TrainingMessage[]) => void;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<TrainingMessage[]>([
    {
      id: "m0",
      sender: "CUSTOMER",
      content: scenario.openingMessage,
      time: "09:41",
    },
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [responseMode, setResponseMode] = useState<
    "connecting" | "ai" | "mock"
  >("connecting");
  const [secs, setSecs] = useState(0);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(
    () => end.current?.scrollIntoView({ behavior: "smooth" }),
    [messages, typing],
  );
  const send = async () => {
    if (!text.trim() || typing) return;
    const content = text.trim();
    const history = messages.map(({ sender, content: messageContent }) => ({
      sender,
      content: messageContent,
    }));
    setText("");
    setMessages((m) => [
      ...m,
      { id: makeMessageId(), sender: "STUDENT", content, time: "现在" },
    ]);
    setTyping(true);
    try {
      const response = await fetch("/api/customer-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario,
          conversationHistory: history,
          studentMessage: content,
        }),
      });
      if (!response.ok) throw new Error("AI response unavailable");
      const result = (await response.json()) as { content?: string };
      if (!result.content?.trim()) throw new Error("AI response was empty");
      setMessages((m) => [
        ...m,
        {
          id: makeMessageId(),
          sender: "CUSTOMER",
          content: result.content!.trim(),
          time: "现在",
        },
      ]);
      setResponseMode("ai");
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setMessages((m) => [
        ...m,
        {
          id: makeMessageId(),
          sender: "CUSTOMER",
          content: mockReply(content),
          time: "现在",
        },
      ]);
      setResponseMode("mock");
    } finally {
      setTyping(false);
    }
  };
  return (
    <div className="flex h-[calc(100vh-72px)] min-h-[680px] bg-white">
      <aside className="hidden w-[260px] shrink-0 border-r p-6 xl:block">
        <button
          onClick={onBack}
          className="flex gap-2 text-xs font-semibold text-slate-500"
        >
          <ArrowLeft size={15} />
          返回训练中心
        </button>
        <div className="mt-8 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mint text-2xl font-bold text-brand">
            C{scenario.customerId}
          </div>
          <h2 className="mt-4 font-bold">Customer {scenario.customerId}</h2>
          <p className="text-xs text-slate-400">匿名模拟客户</p>
        </div>
        <div className="mt-8 space-y-4 border-t pt-6 text-xs">
          {[
            ["行业", scenario.industry],
            ["当前签证", scenario.visa],
            ["客户类型", scenario.customerType],
            ["难度", scenario.difficulty],
          ].map(([a, b]) => (
            <div className="flex justify-between" key={a}>
              <span className="text-slate-400">{a}</span>
              <b>{b}</b>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800">
          <ShieldCheck className="mb-2" size={16} />
          隐藏客户心理、信任度与内部备注。
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col bg-[#f7f7f8]">
        <div className="flex h-16 items-center justify-between border-b bg-white px-5">
          <div>
            <b className="block text-sm">{scenario.title}</b>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
              <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              {responseMode === "ai"
                ? "AI 客户 · 训练中"
                : responseMode === "mock"
                  ? "Mock 回退 · 训练中"
                  : "正在连接 AI · 训练中"}
            </span>
          </div>
          <span className="flex gap-2 rounded-lg bg-slate-100 px-3 py-2 font-mono text-xs">
            <Timer size={14} />
            {String(Math.floor(secs / 60)).padStart(2, "0")}:
            {String(secs % 60).padStart(2, "0")}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-7">
          <div className="mx-auto max-w-3xl">
            <p className="mb-7 text-center text-[11px] text-slate-400">
              训练已开始 · 所有消息均会保存用于评审
            </p>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`mb-5 flex gap-3 ${m.sender === "STUDENT" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white ${m.sender === "STUDENT" ? "bg-[#18181b]" : "bg-brand"}`}
                >
                  {m.sender === "STUDENT" ? "JL" : "C"}
                </div>
                <div
                  className={`max-w-[78%] ${m.sender === "STUDENT" ? "text-right" : ""}`}
                >
                  <div
                    className={`message-bubble ${m.sender === "STUDENT" ? "student" : "customer"}`}
                  >
                    {m.content}
                  </div>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>
              </div>
            ))}
            {typing && (
              <div className="message-bubble customer ml-11">正在输入…</div>
            )}
            <div ref={end} />
          </div>
        </div>
        <div className="border-t bg-white p-4">
          <div className="mx-auto mb-3 flex max-w-3xl gap-2 overflow-x-auto pb-1">
            {demoPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setText(prompt)}
                className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-600 transition hover:border-brand/30 hover:bg-mint hover:text-brand"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="mx-auto flex max-w-3xl gap-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              className="input resize-none"
              rows={1}
              placeholder="输入你的回复…（Enter 发送）"
            />
            <button
              onClick={send}
              className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>
      <aside className="hidden w-[280px] shrink-0 border-l p-6 lg:block">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Training objective
        </p>
        <h3 className="mt-3 text-sm font-bold">训练目标</h3>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {scenario.objective}
        </p>
        <div className="mt-6 rounded-xl bg-mint p-4 text-xs">
          <b className="flex gap-2 text-brand">
            <Target size={15} />
            建议关注
          </b>
          <ul className="mt-3 space-y-2 text-[11px] text-slate-600">
            <li>• 主动确认核心诉求</li>
            <li>• 使用开放式问题</li>
            <li>• 清晰解释下一步</li>
          </ul>
        </div>
        <button
          onClick={() => confirm("确定要结束本次训练吗？") && onEnd(messages)}
          className="mt-8 w-full rounded-xl border border-rose-200 px-4 py-3 text-xs font-semibold text-rose-600"
        >
          结束训练
        </button>
      </aside>
    </div>
  );
}

function Result({
  messages,
  onBack,
}: {
  messages: TrainingMessage[];
  onBack: () => void;
}) {
  return (
    <Page>
      <button
        onClick={onBack}
        className="mb-6 flex gap-2 text-xs font-semibold text-slate-500"
      >
        <ArrowLeft size={15} />
        返回训练记录
      </button>
      <div className="rounded-2xl bg-[#18181b] p-8 text-white">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div>
            <Pill tone="green">已完成评审</Pill>
            <h1 className="mt-4 text-2xl font-bold">
              485 市场营销客户 — 价格敏感型
            </h1>
            <p className="mt-2 text-sm text-zinc-300">
              完成于 2026年9月1日 · 用时 08:42
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">
              81<span className="text-xl opacity-50">/100</span>
            </div>
            <span className="text-xs opacity-60">综合评分 · 良好</span>
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_.72fr]">
        <section className="card p-6">
          <h2 className="font-bold">能力评分</h2>
          <div className="mt-6 space-y-5">
            {scoreRows.map(([x, n, max]) => (
              <div key={x}>
                <div className="mb-2 flex justify-between text-xs">
                  <span>{x}</span>
                  <b>
                    {n}/{max}
                  </b>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: `${(n / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-5">
          <Feedback
            icon={Star}
            title="表现亮点"
            text="能够快速识别签证时效和工作经验两个关键信息；解释清晰，语气专业且有同理心。"
          />
          <Feedback
            icon={TrendingUp}
            title="提升建议"
            text="在讨论费用前，可先进一步确认客户的雇主情况与时间安排。"
          />
          <Feedback
            icon={MessageCircle}
            title="培训师反馈"
            text="整体节奏很好。下一次尝试把开放式问题放在建议之前。"
          />
        </section>
      </div>
      <section className="card mt-5 p-6">
        <h2 className="font-bold">对话记录</h2>
        <div className="mt-5 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "STUDENT" ? "justify-end" : ""}`}
            >
              <div
                className={`max-w-2xl rounded-xl px-4 py-3 text-xs leading-5 ${m.sender === "STUDENT" ? "bg-brand text-white" : "bg-slate-100"}`}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
function Feedback({
  icon: Icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) {
  return (
    <div className="card p-6">
      <div className="flex gap-2 text-sm font-bold text-brand">
        <Icon size={17} />
        {title}
      </div>
      <p className="mt-3 text-xs leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function AdminDashboard({ setView }: { setView: (v: AdminView) => void }) {
  return (
    <Page>
      <Title
        eyebrow="Admin overview"
        title="培训运营概览"
        copy="掌握团队训练进度、评审任务和关键能力表现。"
        action={
          <button className="btn-primary">
            <Plus size={16} />
            分配训练
          </button>
        }
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat icon={Users} label="学员总数" value="24" note="21 活跃" />
        <Stat
          icon={MessageCircle}
          label="训练次数"
          value="86"
          note="本月 +14"
          tone="blue"
        />
        <Stat
          icon={Trophy}
          label="平均分"
          value="76.8"
          note="+3.2%"
          tone="amber"
        />
        <Stat icon={CheckCircle2} label="完成率" value="84%" note="目标 90%" />
        <Stat
          icon={Clock3}
          label="待评审"
          value="3"
          note="最早 2h 前"
          tone="purple"
        />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_.7fr]">
        <section className="card p-6">
          <div className="section-head">
            <div>
              <h2>最近训练</h2>
              <p>团队最新完成的训练会话</p>
            </div>
            <button onClick={() => setView("reviews")} className="text-link">
              查看全部 <ChevronRight size={14} />
            </button>
          </div>
          <AdminTable />
        </section>
        <PerformanceCard />
      </div>
      <section className="card mt-5 p-6">
        <div className="section-head">
          <div>
            <h2>训练活动</h2>
            <p>过去 7 天完成会话</p>
          </div>
          <Pill tone="green">本周 23 次</Pill>
        </div>
        <div className="mt-7 flex h-40 items-end gap-3">
          {[34, 58, 42, 76, 55, 88, 68].map((n, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full max-w-12 rounded-t-md bg-brand/80"
                style={{ height: `${n}%` }}
              />
              <span className="text-[10px] text-slate-400">
                {["三", "四", "五", "六", "日", "一", "二"][i]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
function AdminTable() {
  return (
    <div className="table-wrap mt-5">
      <table>
        <thead>
          <tr>
            <th>学员</th>
            <th>训练场景</th>
            <th>完成时间</th>
            <th>状态</th>
            <th>得分</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Jamie Lee", "485 市场营销客户", "今天 09:49", "待评审", "—"],
            ["Ethan Wang", "IT 开发者信任顾虑", "昨天 16:32", "已评审", "82"],
            ["Sofia Chen", "学生签证会计客户", "昨天 14:18", "已评审", "76"],
          ].map((r, i) => (
            <tr key={i}>
              <td>
                <b>{r[0]}</b>
              </td>
              <td>{r[1]}</td>
              <td>{r[2]}</td>
              <td>
                <Pill tone={r[3] === "待评审" ? "amber" : "green"}>{r[3]}</Pill>
              </td>
              <td>
                <b>{r[4]}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Customers() {
  return (
    <Page>
      <Title
        eyebrow="Customer profiles"
        title="客户画像"
        copy="管理匿名客户背景、沟通特征和隐藏模拟参数。"
        action={
          <button className="btn-primary">
            <Plus size={16} />
            新建客户画像
          </button>
        }
      />
      <div className="card mt-6 flex gap-3 p-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-2.5 text-slate-400"
            size={17}
          />
          <input
            className="input pl-10"
            placeholder="搜索客户编号、行业或签证类型"
          />
        </div>
        <button className="filter">
          全部筛选 <ChevronDown size={14} />
        </button>
      </div>
      <div className="card mt-5 overflow-hidden">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>客户</th>
                <th>行业 / 职业</th>
                <th>签证</th>
                <th>客户类型</th>
                <th>意向</th>
                <th>难度</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {demoCustomers.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-mint text-xs font-bold text-brand">
                        C{c.id}
                      </div>
                      <div>
                        <b>{c.displayName}</b>
                        <small className="block text-slate-400">
                          {c.location}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    {c.industry}
                    <small className="block text-slate-400">
                      {c.occupation}
                    </small>
                  </td>
                  <td>{c.visaType}</td>
                  <td>
                    <Pill tone="blue">{c.customerType}</Pill>
                  </td>
                  <td>
                    <Pill tone={c.intentLevel === "高" ? "green" : "amber"}>
                      {c.intentLevel}
                    </Pill>
                  </td>
                  <td>{c.difficulty}</td>
                  <td>
                    <MoreHorizontal size={17} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
function Reviews({ onReview }: { onReview: () => void }) {
  return (
    <Page>
      <Title
        eyebrow="Training reviews"
        title="训练评审"
        copy="阅读完整对话，按能力维度评分并给出可执行反馈。"
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat
          icon={Clock3}
          label="待评审"
          value="3"
          note="需要处理"
          tone="amber"
        />
        <Stat
          icon={CheckCircle2}
          label="本月已评审"
          value="18"
          note="平均 1.2 天"
        />
        <Stat
          icon={Activity}
          label="平均得分"
          value="76.8"
          note="团队整体"
          tone="blue"
        />
      </div>
      <div className="card mt-5 overflow-hidden">
        <AdminTable />
        <button onClick={onReview} className="btn-primary m-5">
          开始评审 Jamie Lee
        </button>
      </div>
    </Page>
  );
}
function ReviewPanel({ onDone }: { onDone: () => void }) {
  const [scores, setScores] = useState<number[]>(scoreRows.map((r) => r[1]));
  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <section className="border-r bg-[#f7f9f8] p-6 lg:p-8">
        <button
          onClick={onDone}
          className="flex gap-2 text-xs font-semibold text-slate-500"
        >
          <ArrowLeft size={15} />
          返回评审列表
        </button>
        <h1 className="mt-6 text-xl font-bold">Jamie Lee 的训练对话</h1>
        <p className="mt-1 text-xs text-slate-500">
          485 市场营销客户 · 8分42秒
        </p>
        <div className="mt-6 rounded-2xl bg-white p-6">
          {[
            [
              "CUSTOMER",
              "你好，我的 485 签证只剩大约 9 个月了。我在市场营销行业工作，想知道能不能申请 482。",
            ],
            [
              "STUDENT",
              "您好。为了判断可行性，我想先了解您目前的职位、工作经验以及雇主是否愿意提供担保？",
            ],
            [
              "CUSTOMER",
              "我大约有一年经验，但不是都在同一家公司。这会有影响吗？",
            ],
            [
              "STUDENT",
              "相关工作经验通常可以累计评估。您目前的雇主是否已经有担保资质？",
            ],
          ].map((m, i) => (
            <div
              key={i}
              className={`mb-4 flex ${m[0] === "STUDENT" ? "justify-end" : ""}`}
            >
              <div
                className={`max-w-[82%] rounded-xl px-4 py-3 text-xs leading-6 ${m[0] === "STUDENT" ? "bg-brand text-white" : "bg-slate-100"}`}
              >
                {m[1]}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white p-6 lg:p-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand">
          Manual evaluation
        </p>
        <h2 className="mt-2 text-xl font-bold">能力评分</h2>
        <div className="mt-7 space-y-5">
          {scoreRows.map(([name, , max], i) => (
            <div key={name}>
              <div className="flex justify-between text-xs">
                <b>{name}</b>
                <b>
                  {scores[i]} / {max}
                </b>
              </div>
              <input
                type="range"
                min="0"
                max={max}
                value={scores[i]}
                onChange={(e) =>
                  setScores((s) =>
                    s.map((x, j) => (j === i ? +e.target.value : x)),
                  )
                }
                className="mt-2 w-full accent-[#b11217]"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between rounded-xl bg-mint p-4 text-brand">
          <b>综合得分</b>
          <b className="text-2xl">{scores.reduce((a, b) => a + b, 0)} / 100</b>
        </div>
        {["表现亮点", "提升建议", "培训师反馈"].map((x) => (
          <div className="mt-5" key={x}>
            <label className="label">{x}</label>
            <textarea
              className="input"
              rows={2}
              defaultValue="沟通专业，能够识别关键信息。建议进一步使用开放式问题推进对话。"
            />
          </div>
        ))}
        <div className="mt-6 flex gap-3">
          <button className="btn-secondary flex-1">保存草稿</button>
          <button onClick={onDone} className="btn-primary flex-1">
            <Check size={16} />
            提交评审
          </button>
        </div>
      </section>
    </div>
  );
}
function GenericAdmin({ view }: { view: AdminView }) {
  const map: any = {
    students: ["学员管理", "创建、停用学员并查看个人训练表现。", Users],
    conversations: [
      "历史对话",
      "仅管理员可见的匿名历史对话与导入记录。",
      FileText,
    ],
    scenarios: [
      "训练场景",
      "配置客户背景、训练目标与 Mock 对话规则。",
      MessageCircle,
    ],
    assignments: ["任务分配", "将训练场景分配给学员并跟踪完成情况。", Target],
    analytics: ["数据分析", "按学员、场景与能力维度洞察训练效果。", BarChart3],
  };
  const [title, copy, Icon] = map[view];
  return (
    <Page>
      <Title
        title={title}
        copy={copy}
        eyebrow="Admin workspace"
        action={
          <button className="btn-primary">
            <Plus size={16} />
            新建
          </button>
        }
      />
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="card p-6 md:col-span-2">
          <div className="stat-icon green">
            <Icon size={20} />
          </div>
          <h2 className="mt-6 text-lg font-bold">{title}工作区</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            此模块已纳入统一导航与权限边界，可连接对应 API 与 Prisma
            数据表实现持久化管理。
          </p>
        </div>
      </div>
    </Page>
  );
}
function ResultTable() {
  return (
    <div className="table-wrap mt-5">
      <table>
        <thead>
          <tr>
            <th>训练场景</th>
            <th>完成日期</th>
            <th>用时</th>
            <th>得分</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["价格敏感型客户", "8月28日", "09:21", "82"],
            ["紧急型客户", "8月23日", "11:04", "74"],
            ["持怀疑态度客户", "8月16日", "08:46", "79"],
          ].map((r, i) => (
            <tr key={i}>
              <td>
                <b>{r[0]}</b>
              </td>
              <td>{r[1]}</td>
              <td>{r[2]}</td>
              <td>
                <b>{r[3]}</b> /100
              </td>
              <td>
                <Pill tone="green">已评审</Pill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function SimpleStudent({ view }: { view: StudentView }) {
  const title = {
    dashboard: "工作台",
    training: "训练中心",
    assignments: "我的任务",
    history: "训练记录",
    performance: "能力表现",
  }[view];
  return (
    <Page>
      <Title
        eyebrow="Student workspace"
        title={title}
        copy={
          view === "assignments"
            ? "查看已分配训练及到期时间。"
            : view === "history"
              ? "回顾每次训练的结果、反馈和完整对话。"
              : "追踪六项核心沟通能力的长期成长。"
        }
      />
      {view === "performance" ? (
        <div className="mt-6 max-w-xl">
          <PerformanceCard />
        </div>
      ) : (
        <div className="card mt-6 p-6">
          <ResultTable />
        </div>
      )}
    </Page>
  );
}
function Page({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-[1480px] p-5 lg:p-8">{children}</main>;
}
function Title({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-brand">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{copy}</p>
      </div>
      {action}
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [studentView, setStudentView] = useState<StudentView>("dashboard");
  const [adminView, setAdminView] = useState<AdminView>("dashboard");
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<TrainingMessage[] | null>(null);
  const [review, setReview] = useState(false);
  if (!role) return <Login onLogin={setRole} />;
  if (role === "student") {
    if (scenario)
      return (
        <Shell
          role="student"
          view="training"
          setView={setStudentView}
          onLogout={() => setRole(null)}
        >
          <Chat
            scenario={scenario}
            onBack={() => setScenario(null)}
            onEnd={(m) => {
              setMessages(m);
              setScenario(null);
            }}
          />
        </Shell>
      );
    if (messages)
      return (
        <Shell
          role="student"
          view="history"
          setView={setStudentView}
          onLogout={() => setRole(null)}
        >
          <Result messages={messages} onBack={() => setMessages(null)} />
        </Shell>
      );
    return (
      <Shell
        role="student"
        view={studentView}
        setView={setStudentView}
        onLogout={() => setRole(null)}
      >
        {studentView === "dashboard" ? (
          <StudentDashboard onStart={setScenario} onView={setStudentView} />
        ) : studentView === "training" ? (
          <TrainingLibrary onStart={setScenario} />
        ) : (
          <SimpleStudent view={studentView} />
        )}
      </Shell>
    );
  }
  return (
    <Shell
      role="admin"
      view={adminView}
      setView={setAdminView}
      onLogout={() => setRole(null)}
    >
      {review ? (
        <ReviewPanel onDone={() => setReview(false)} />
      ) : adminView === "dashboard" ? (
        <AdminDashboard setView={setAdminView} />
      ) : adminView === "customers" ? (
        <Customers />
      ) : adminView === "reviews" ? (
        <Reviews onReview={() => setReview(true)} />
      ) : (
        <GenericAdmin view={adminView} />
      )}
    </Shell>
  );
}
