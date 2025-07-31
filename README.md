# Password Strength Analyzer with Custom Wordlist Generator

A comprehensive Next.js web application that analyzes password strength and generates custom wordlists for security testing purposes.

## Features

### Password Strength Analysis

- Real-time password strength evaluation using zxcvbn
- Custom entropy calculations
- Visual feedback on password quality
- Recommendations for improvement

### Custom Wordlist Generation

- Generate personalized wordlists based on user inputs
- Include common patterns like leetspeak transformations
- Append years, numbers, and special characters
- Export wordlists in .txt format for security tools

### User Input Categories

- Personal information (names, dates, pets)
- Common password patterns
- Custom word combinations
- Automatic pattern variations

## Tech Stack

- **Frontend:** Next.js 14 with React
- **Styling:** Tailwind CSS
- **Password Analysis:** zxcvbn library
- **File Export:** Browser download API
- **Pattern Generation:** Custom algorithms

## Installation & Setup

```bash
# Clone and navigate to project
cd project

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Password Analysis:**

   - Enter password in the analyzer
   - View real-time strength feedback
   - Get recommendations for improvement

2. **Wordlist Generation:**
   - Input personal information (names, dates, pets)
   - Select pattern variations (leetspeak, years)
   - Generate custom wordlist
   - Export as .txt file

## Security Note

This tool is designed for educational and authorized security testing purposes only. Use responsibly and only on systems you own or have explicit permission to test.

## Learning Outcomes

- Password security best practices
- Wordlist attack methodologies
- Web application development with Next.js
- Client-side security tool development

### This is the final project that I made as part of my [internship](https://github.com/aditya8Raj/elevate-labs-internship) at [Elevate Labs](https://www.linkedin.com/company/bebwwijwi/).
