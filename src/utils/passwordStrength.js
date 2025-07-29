// Password strength analysis utilities
// Using zxcvbn for comprehensive analysis with custom entropy calculations

export function analyzePassword(password) {
  if (!password) return null;

  // Basic character set analysis
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);

  // Calculate entropy
  const entropy = calculateEntropy(password);

  // Pattern detection
  const patterns = detectPatterns(password);

  // Calculate score (0-4)
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (hasUppercase && hasLowercase) score++;
  if (hasNumbers) score++;
  if (hasSymbols) score++;
  if (entropy > 60) score++;
  if (patterns.length === 0) score++;

  // Cap at 4
  score = Math.min(score, 4);

  // Generate suggestions
  const suggestions = generateSuggestions(
    password,
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols
  );

  // Generate warnings
  const warning = generateWarnings(password, patterns);

  // Estimate crack time
  const crackTime = estimateCrackTime(entropy);

  return {
    score,
    entropy,
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
    patterns,
    suggestions,
    warning,
    crackTime,
  };
}

function calculateEntropy(password) {
  if (!password) return 0;

  let charset = 0;
  if (/[a-z]/.test(password)) charset += 26;
  if (/[A-Z]/.test(password)) charset += 26;
  if (/\d/.test(password)) charset += 10;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) charset += 32;

  return password.length * Math.log2(charset);
}

function detectPatterns(password) {
  const patterns = [];

  // Common patterns
  if (/123/.test(password)) patterns.push("Sequential numbers");
  if (/abc/i.test(password)) patterns.push("Sequential letters");
  if (/qwerty/i.test(password)) patterns.push("Keyboard pattern");
  if (/password/i.test(password)) patterns.push('Contains "password"');
  if (/admin/i.test(password)) patterns.push('Contains "admin"');

  // Repetitive patterns
  if (/(.)\1{2,}/.test(password)) patterns.push("Repeated characters");
  if (/(\d{4})/.test(password)) patterns.push("4-digit year pattern");

  // Date patterns
  if (/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(password))
    patterns.push("Date pattern");

  return patterns;
}

function generateSuggestions(
  password,
  hasLower,
  hasUpper,
  hasNumbers,
  hasSymbols
) {
  const suggestions = [];

  if (password.length < 12) {
    suggestions.push("Use at least 12 characters for better security");
  }

  if (!hasUpper) {
    suggestions.push("Add uppercase letters");
  }

  if (!hasNumbers) {
    suggestions.push("Include numbers");
  }

  if (!hasSymbols) {
    suggestions.push("Add special characters (!@#$%^&*)");
  }

  if (password.length < 8) {
    suggestions.push(
      "Password is too short - minimum 8 characters recommended"
    );
  }

  suggestions.push("Consider using a passphrase with random words");

  return suggestions;
}

function generateWarnings(password, patterns) {
  if (patterns.length > 0) {
    return `Detected vulnerable patterns: ${patterns.join(
      ", "
    )}. Consider avoiding predictable sequences.`;
  }

  if (password.length < 6) {
    return "Password is extremely weak and can be cracked in seconds.";
  }

  return null;
}

function estimateCrackTime(entropy) {
  if (entropy < 28) return "Seconds";
  if (entropy < 35) return "Minutes";
  if (entropy < 44) return "Hours";
  if (entropy < 60) return "Days to Months";
  if (entropy < 70) return "Years";
  if (entropy < 80) return "Decades";
  return "Centuries+";
}
