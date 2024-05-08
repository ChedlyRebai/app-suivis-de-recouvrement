import { EdgeStoreProvider } from "@/lib/edgestore";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-screen">
      <EdgeStoreProvider>{children}</EdgeStoreProvider></body>
    </html>
  );
}
