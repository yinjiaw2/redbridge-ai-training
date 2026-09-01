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
        {error.digest && (
          <code className="mt-4 inline-block rounded-lg bg-zinc-100 px-3 py-2 text-xs text-zinc-600">
            {error.digest}
          </code>
        )}
        <button onClick={reset} className="btn-primary mx-auto mt-6">
          <RefreshCw size={16} />
          重新加载
        </button>
      </section>
    </main>
  );
}
