"use client";

import { useState } from "react";
import { generateWordlist } from "../utils/wordlistPatterns";
import { exportToFile } from "../utils/fileExport";

export default function WordlistGenerator() {
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    nickname: "",
    birthYear: "",
    pet: "",
    company: "",
    customWords: "",
  });

  const [options, setOptions] = useState({
    includeLeetspeak: true,
    includeYears: true,
    includeCommonSuffixes: true,
    includeReverse: true,
    minLength: 4,
    maxLength: 20,
  });

  const [generatedWords, setGeneratedWords] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (option, value) => {
    setOptions((prev) => ({ ...prev, [option]: value }));
  };

  const generateWordlistHandler = async () => {
    setIsGenerating(true);
    try {
      const wordlist = generateWordlist(inputs, options);
      setGeneratedWords(wordlist);
    } catch (error) {
      console.error("Error generating wordlist:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportWordlist = () => {
    if (generatedWords.length > 0) {
      exportToFile(generatedWords, "custom-wordlist.txt");
    }
  };

  const clearAll = () => {
    setInputs({
      name: "",
      surname: "",
      nickname: "",
      birthYear: "",
      pet: "",
      company: "",
      customWords: "",
    });
    setGeneratedWords([]);
  };

  return (
    <div className="space-y-6">
      {/* Input Fields */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={inputs.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={inputs.surname}
            onChange={(e) => handleInputChange("surname", e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Nickname"
            value={inputs.nickname}
            onChange={(e) => handleInputChange("nickname", e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Birth Year (e.g., 1990)"
            value={inputs.birthYear}
            onChange={(e) => handleInputChange("birthYear", e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Pet Name"
            value={inputs.pet}
            onChange={(e) => handleInputChange("pet", e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Company/School"
            value={inputs.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            className="input-field"
          />
        </div>
        <textarea
          placeholder="Custom words (comma separated)"
          value={inputs.customWords}
          onChange={(e) => handleInputChange("customWords", e.target.value)}
          rows={3}
          className="input-field"
        />
      </div>

      {/* Options */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Generation Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={options.includeLeetspeak}
              onChange={(e) =>
                handleOptionChange("includeLeetspeak", e.target.checked)
              }
              className="rounded"
            />
            <span className="text-sm">Include Leetspeak (a→@, e→3)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={options.includeYears}
              onChange={(e) =>
                handleOptionChange("includeYears", e.target.checked)
              }
              className="rounded"
            />
            <span className="text-sm">Add Years (2020-2024)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={options.includeCommonSuffixes}
              onChange={(e) =>
                handleOptionChange("includeCommonSuffixes", e.target.checked)
              }
              className="rounded"
            />
            <span className="text-sm">Common Suffixes (!@#$123)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={options.includeReverse}
              onChange={(e) =>
                handleOptionChange("includeReverse", e.target.checked)
              }
              className="rounded"
            />
            <span className="text-sm">Reverse Words</span>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Length: {options.minLength}
            </label>
            <input
              type="range"
              min="3"
              max="15"
              value={options.minLength}
              onChange={(e) =>
                handleOptionChange("minLength", parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Length: {options.maxLength}
            </label>
            <input
              type="range"
              min="8"
              max="30"
              value={options.maxLength}
              onChange={(e) =>
                handleOptionChange("maxLength", parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={generateWordlistHandler}
          disabled={isGenerating}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating..." : "Generate Wordlist"}
        </button>
        {generatedWords.length > 0 && (
          <>
            <button onClick={exportWordlist} className="btn-secondary">
              Export ({generatedWords.length} words)
            </button>
            <button onClick={clearAll} className="btn-secondary">
              Clear All
            </button>
          </>
        )}
      </div>

      {/* Results Preview */}
      {generatedWords.length > 0 && (
        <div className="bg-gray-50 rounded-md p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">
              Generated Wordlist Preview ({generatedWords.length} words)
            </h4>
          </div>
          <div className="max-h-40 overflow-y-auto bg-white rounded border p-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm font-mono">
              {generatedWords.slice(0, 50).map((word, index) => (
                <div key={index} className="text-gray-700">
                  {word}
                </div>
              ))}
              {generatedWords.length > 50 && (
                <div className="text-gray-500 italic">
                  ...and {generatedWords.length - 50} more
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {generatedWords.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📝</div>
          <p>Fill in some personal information and click "Generate Wordlist"</p>
          <p className="text-sm mt-1">
            Perfect for creating targeted password attack lists
          </p>
        </div>
      )}
    </div>
  );
}
