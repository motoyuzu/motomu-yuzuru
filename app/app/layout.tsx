import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'モトムユズル',
  description: 'ライブ会場向けグッズ交換・譲渡Webサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
