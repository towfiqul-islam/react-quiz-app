import { v4 as uuidv4 } from 'uuid';
export const quizData = [
    {
        id: uuidv4(),
        quizTitle: 'What year was the very first model of the iPhone released?',
        options: [
          {
            answer_1: '2008',
            is_correct_1: false,
          },
          {
            answer_2: '2007',
            is_correct_2: true,
          },
          {
            answer_3: '2005',
            is_correct_3: false,
          },
          {
            answer_4: '2009',
            is_correct_4: false,
          },
        ],
    },
    {
        id: uuidv4(),
        quizTitle: 'What’s the shortcut for the “copy” function on most computers?',
        options: [
          {
            answer_1: 'ctrl c',
            is_correct_1: true,
          },
          {
            answer_2: 'ctrl v',
            is_correct_2: false,
          },
          {
            answer_3: 'ctrl a',
            is_correct_3: false,
          },
          {
            answer_4: 'ctrl z',
            is_correct_4: false,
          },
        ],
    },
    {
        id: uuidv4(),
        quizTitle: 'What is often seen as the smallest unit of memory?',
        options: [
          {
            answer_1: 'megabyte',
            is_correct_1: false,
          },
          {
            answer_2: 'gigabyte',
            is_correct_2: false,
          },
          {
            answer_3: 'kilobyte',
            is_correct_3: true,
          },
          {
            answer_4: 'petabyte',
            is_correct_4: false,
          },
        ],
    },
    {
        id: uuidv4(),
        quizTitle: 'Which email service is owned by Microsoft?',
        options: [
          {
            answer_1: 'gmail',
            is_correct_1: false,
          },
          {
            answer_2: 'yandex',
            is_correct_2: false,
          },
          {
            answer_3: 'mailtrip',
            is_correct_3: false,
          },
          {
            answer_4: 'hotmail',
            is_correct_4: true,
          },
        ],
    },
    {
        id: uuidv4(),
        quizTitle: 'Google Chrome, Safari, Firefox, and Explorer are different types of what?',
        options: [
          {
            answer_1: 'Web browser',
            is_correct_1: true,
          },
          {
            answer_2: 'OS',
            is_correct_2: false,
          },
          {
            answer_3: 'Drink',
            is_correct_3: false,
          },
          {
            answer_4: 'Pizza',
            is_correct_4: false,
          },
        ],
    }
]