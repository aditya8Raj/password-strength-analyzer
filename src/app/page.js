"use client";

import PasswordAnalyzer from "../components/PasswordAnalyzer";
import WordlistGenerator from "../components/WordlistGenerator";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --------- Password Analyzer here ----------*/}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Password Strength Analyzer
            </h2>
            <PasswordAnalyzer />
          </div>
        </div>

        {/* ------- Wordlist Generator here ------- */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Custom Wordlist Generator
            </h2>
            <WordlistGenerator />
          </div>
        </div>
      </div>

      {/* -------- Educational Section here -------- */}
      <div className="card mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          About This Tool
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Password Analysis
            </h3>
            <ul className="space-y-1 text-sm">
              <li>• Real-time strength evaluation</li>
              <li>• Entropy calculations</li>
              <li>• Pattern detection</li>
              <li>• Security recommendations</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Wordlist Generation
            </h3>
            <ul className="space-y-1 text-sm">
              <li>• Personal information patterns</li>
              <li>• Leetspeak transformations</li>
              <li>• Year and number combinations</li>
              <li>• Export for security testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
