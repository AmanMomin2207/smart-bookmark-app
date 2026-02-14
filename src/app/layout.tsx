import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        <div className="mx-auto max-w-4xl px-6 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
