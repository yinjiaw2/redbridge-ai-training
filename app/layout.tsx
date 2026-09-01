import "./globals.css";

export const metadata = {
  title: "Redbridge 客户对话训练平台",
  description: "面向顾问团队的客户沟通情景训练与评审平台",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
