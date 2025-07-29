import "./globals.css";

export const metadata = {
  title: "Password Strength Analyzer & Wordlist Generator",
  description:
    "Analyze password strength and generate custom wordlists for security testing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-400 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">
              Password Security Toolkit
            </h1>
            <p className="text-black">
              Analyze password strength and generate custom wordlists
            </p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
