// file export utilities for browser download

export function exportToFile(wordlist, filename = "wordlist.txt") {
  try {
    // to create file content
    const content = wordlist.join("\n");

    // to create blob
    const blob = new Blob([content], { type: "text/plain" });

    // to create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // to trigger download
    document.body.appendChild(link);
    link.click();

    // to cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error exporting file:", error);
    return false;
  }
}

export function exportPasswordAnalysis(
  analysis,
  password,
  filename = "password-analysis.json"
) {
  try {
    const data = {
      timestamp: new Date().toISOString(),
      passwordLength: password.length,
      analysis: {
        ...analysis,
        // don't put the actual password in export for security
        password: "[REDACTED]",
      },
    };

    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: "application/json" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error exporting analysis:", error);
    return false;
  }
}

export function formatWordlistForExport(wordlist, includeStats = true) {
  let content = "";

  if (includeStats) {
    content += `# Custom Wordlist Generated on ${new Date().toLocaleString()}\n`;
    content += `# Total words: ${wordlist.length}\n`;
    content += `# Use for authorized security testing only\n`;
    content += `#\n\n`;
  }

  content += wordlist.join("\n");

  return content;
}
