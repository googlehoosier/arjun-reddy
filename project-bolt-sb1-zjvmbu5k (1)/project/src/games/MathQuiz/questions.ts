interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  topic: 'arithmetic' | 'fractions' | 'decimals' | 'money' | 'geometry';
}

export const questions: Question[] = [
  {
    question: "Solve: 2x + 5 = 15",
    options: ["x = 5", "x = 10", "x = 8", "x = 6"],
    correctAnswer: 0,
    topic: 'arithmetic'
  },
  {
    question: "What is 3/4 of 100?",
    options: ["75", "80", "70", "85"],
    correctAnswer: 0,
    topic: 'fractions'
  },
  {
    question: "Convert 0.75 to a fraction",
    options: ["3/4", "2/3", "4/5", "5/8"],
    correctAnswer: 0,
    topic: 'decimals'
  },
  {
    question: "If an item costs $24.99 and you have a 20% discount, what's the final price?",
    options: ["$19.99", "$21.99", "$18.99", "$20.99"],
    correctAnswer: 0,
    topic: 'money'
  },
  {
    question: "What is the area of a circle with radius 5cm? (Use π = 3.14)",
    options: ["78.5 cm²", "31.4 cm²", "15.7 cm²", "50 cm²"],
    correctAnswer: 0,
    topic: 'geometry'
  },
  // Add more questions here...
];