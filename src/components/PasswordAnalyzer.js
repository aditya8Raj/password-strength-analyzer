"use client";

import { useState, useEffect } from "react";
import { analyzePassword } from "../utils/passwordStrength";

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (password) {
      const result = analyzePassword(password);
      setAnalysis(result);
    } else {
      setAnalysis(null);
    }
  }, [password]);

  const getStrengthColor = (score) => {
    const colors = {
      0: "bg-red-500",
      1: "bg-orange-500",
      2: "bg-yellow-500",
      3: "bg-green-500",
      4: "bg-green-600",
    };
    return colors[score] || "bg-gray-300";
  };

  const getStrengthText = (score) => {
    const texts = {
      0: "Very Weak",
      1: "Weak",
      2: "Fair",
      3: "Good",
      4: "Strong",
    };
    return texts[score] || "Unknown";
  };

  return (
    <div className="space-y-4">
      {/* user password Input */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Password to Analyze
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password here..."
            className="input-field pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* analysis results logic */}
      {analysis && (
        <div className="space-y-4">
          {/* strength meter will change as per the user's input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Strength
              </span>
              <span
                className={`text-sm font-semibold ${
                  analysis.score >= 3
                    ? "text-green-600"
                    : analysis.score >= 2
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {getStrengthText(analysis.score)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${getStrengthColor(
                  analysis.score
                )}`}
                style={{ width: `${(analysis.score + 1) * 20}%` }}
              ></div>
            </div>
          </div>

          {/* detailed metrics */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Length:</span>
                <span className="font-medium">{password.length} chars</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Entropy:</span>
                <span className="font-medium">
                  {analysis.entropy?.toFixed(1)} bits
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Crack Time:</span>
                <span className="font-medium text-xs">
                  {analysis.crackTime}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Uppercase:</span>
                <span
                  className={
                    analysis.hasUppercase ? "text-green-600" : "text-red-600"
                  }
                >
                  {analysis.hasUppercase ? "✓" : "✗"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Numbers:</span>
                <span
                  className={
                    analysis.hasNumbers ? "text-green-600" : "text-red-600"
                  }
                >
                  {analysis.hasNumbers ? "✓" : "✗"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Symbols:</span>
                <span
                  className={
                    analysis.hasSymbols ? "text-green-600" : "text-red-600"
                  }
                >
                  {analysis.hasSymbols ? "✓" : "✗"}
                </span>
              </div>
            </div>
          </div>

          {/* security suggestions for user */}
          {analysis.suggestions && analysis.suggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <h4 className="font-medium text-blue-800 mb-2">
                Recommendations:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {/* security warnings as per user's input */}
          {analysis.warning && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <h4 className="font-medium text-red-800 mb-2">
                Security Warning:
              </h4>
              <p className="text-sm text-red-700">{analysis.warning}</p>
            </div>
          )}
        </div>
      )}

      {/* empty state - when there is no user's input */}
      {!password && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🔐</div>
          <p>Enter a password to see detailed strength analysis</p>
        </div>
      )}
    </div>
  );
}
