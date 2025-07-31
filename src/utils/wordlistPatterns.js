// wordlist generation utilities with various transformation patterns

export function generateWordlist(inputs, options) {
  const baseWords = extractBaseWords(inputs);
  let wordlist = new Set();

  // add base words
  baseWords.forEach((word) => {
    if (word.length >= options.minLength && word.length <= options.maxLength) {
      wordlist.add(word);
    }
  });

  // applying transformations
  const transformations = [];

  if (options.includeLeetspeak) {
    transformations.push(applyLeetspeak);
  }

  if (options.includeReverse) {
    transformations.push(reverseWord);
  }

  // applying transformations to base words
  baseWords.forEach((word) => {
    transformations.forEach((transform) => {
      const transformed = transform(word);
      if (
        transformed.length >= options.minLength &&
        transformed.length <= options.maxLength
      ) {
        wordlist.add(transformed);
      }
    });
  });

  // to add year combinations
  if (options.includeYears) {
    const wordsWithYears = addYearCombinations([...wordlist]);
    wordsWithYears.forEach((word) => {
      if (
        word.length >= options.minLength &&
        word.length <= options.maxLength
      ) {
        wordlist.add(word);
      }
    });
  }

  // to add common suffixes
  if (options.includeCommonSuffixes) {
    const wordsWithSuffixes = addCommonSuffixes([...wordlist]);
    wordsWithSuffixes.forEach((word) => {
      if (
        word.length >= options.minLength &&
        word.length <= options.maxLength
      ) {
        wordlist.add(word);
      }
    });
  }

  // to convert to array and sort
  return Array.from(wordlist).sort();
}

function extractBaseWords(inputs) {
  const words = [];

  // to extract individual inputs
  if (inputs.name) words.push(inputs.name.toLowerCase().trim());
  if (inputs.surname) words.push(inputs.surname.toLowerCase().trim());
  if (inputs.nickname) words.push(inputs.nickname.toLowerCase().trim());
  if (inputs.pet) words.push(inputs.pet.toLowerCase().trim());
  if (inputs.company) words.push(inputs.company.toLowerCase().trim());

  // for birth year feild
  if (inputs.birthYear) {
    words.push(inputs.birthYear);
    // short year version
    if (inputs.birthYear.length === 4) {
      words.push(inputs.birthYear.slice(-2));
    }
  }

  // to process custom words
  if (inputs.customWords) {
    const customList = inputs.customWords
      .split(",")
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word.length > 0);
    words.push(...customList);
  }

  // adding combinations
  const combinations = generateCombinations(words);
  words.push(...combinations);

  // add capitalized versions
  const capitalizedWords = words.map((word) => capitalizeWord(word));
  words.push(...capitalizedWords);

  // for removeing duplicates and empty strings
  return [...new Set(words.filter((word) => word && word.length > 0))];
}

function generateCombinations(words) {
  const combinations = [];
  const validWords = words.filter(
    (word) => word && word.length > 0 && word.length < 10
  );

  // two-word combinations
  for (let i = 0; i < validWords.length; i++) {
    for (let j = i + 1; j < validWords.length; j++) {
      combinations.push(validWords[i] + validWords[j]);
      combinations.push(validWords[j] + validWords[i]);
    }
  }

  return combinations;
}

function applyLeetspeak(word) {
  const leetMap = {
    a: "@",
    e: "3",
    i: "1",
    o: "0",
    s: "$",
    t: "7",
    l: "1",
    g: "9",
  };

  let leetWord = word.toLowerCase();
  Object.entries(leetMap).forEach(([letter, leet]) => {
    leetWord = leetWord.replace(new RegExp(letter, "g"), leet);
  });

  return leetWord;
}

function reverseWord(word) {
  return word.split("").reverse().join("");
}

function capitalizeWord(word) {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function addYearCombinations(words) {
  const years = [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];
  const combinations = [];

  words.forEach((word) => {
    years.forEach((year) => {
      combinations.push(word + year);
      combinations.push(year + word);
    });
  });

  return combinations;
}

function addCommonSuffixes(words) {
  const suffixes = ["!", "@", "#", "$", "123", "1", "01", "99", "!@#", "123!"];
  const combinations = [];

  words.forEach((word) => {
    suffixes.forEach((suffix) => {
      combinations.push(word + suffix);
    });
  });

  return combinations;
}
