import "./globals.css";

export const metadata = {
  title: "Password Strength Analyzer & Wordlist Generator",
  description:
    "Analyze password strength and generate custom wordlists for security testing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-400 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1">
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
        <footer className="text-center py-4 text-black">
          <p>
            Made with 💙 by{" "}
            <a
              href="https://adityaraj.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-blue-600 transition-colors duration-200 underline"
            >
              Aditya
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
