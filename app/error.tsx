"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Redbridge application error", error);
  }, [error]);

  const diagnostic =
    error.message?.slice(0, 500) || error.digest || "Unknown client error";

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f7f8] p-6">
      <section className="w-full max-w-lg rounded-2xl border border-[#f5d5d6] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#fdf0f0] text-brand">
          <AlertTriangle size={22} />
        </div>
        <h1 className="mt-5 text-xl font-bold text-zinc-900">
          页面暂时无法加载
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          请先刷新页面。如果问题持续发生，请把下方错误编号提供给管理员。
        </p>
        <div className="mt-5 rounded-xl bg-zinc-950 p-4 text-left">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            Diagnostic message
          </p>
          <code className="mt-2 block break-words text-xs leading-5 text-red-200">
            {diagnostic}
          </code>
          {error.digest && error.digest !== diagnostic && (
            <code className="mt-2 block text-[10px] text-zinc-400">
              Digest: {error.digest}
            </code>
          )}
        </div>
        <button onClick={reset} className="btn-primary mx-auto mt-6">
          <RefreshCw size={16} />
          重新加载
        </button>
      </section>
    </main>
  );
}
