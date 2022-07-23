import { quizData } from "./seed";

const deleteFromQuiz = (q, quiz, setQuiz) => {
  const updatedQuiz = quiz.filter((qu) => {
    return qu.quizTitle !== q.quizTitle;
  });
  setQuiz(updatedQuiz);
  localStorage.removeItem('quiz');
  localStorage.setItem('quiz', JSON.stringify(updatedQuiz));
};

export const getCorrectAnswer = (options) => {
  let ans = '';

  for (const [index, opt] of options.entries()) {
    if (opt[`is_correct_${index + 1}`]) {
      ans = opt[`answer_${index + 1}`];
    }
  }

  return ans;
};

export const deleteFromArchive = (q, archive, setArchive) => {
  const updatedArchive = archive.filter((qu) => {
    return qu.quizTitle !== q.quizTitle;
  });
  setArchive(updatedArchive);
  localStorage.removeItem('archive');
  localStorage.setItem('archive', JSON.stringify(updatedArchive));
};

export const checkExistence = (singleQuiz, quiz) => {
  let found = false;
  for (const q of quiz) {
    if (q.id === singleQuiz.id) found = true;
  }
  return found;
};

export const handleRestore = (
  q,
  existingQuiz,
  setQuiz,
  archive,
  setArchive
) => {
  existingQuiz.push(q);
  localStorage.setItem('quiz', JSON.stringify(existingQuiz));
  setQuiz(existingQuiz);

  deleteFromArchive(q, archive, setArchive);
};

export const pushToArchive = (q, archive, setArchive, quiz, setQuiz) => {
  let temp = archive;
  temp.push(q);
  setArchive(temp);
  localStorage.setItem('archive', JSON.stringify(temp));
  deleteFromQuiz(q, quiz, setQuiz);
};

export const generateSeedData = () => {
  const existingQuiz = JSON.parse(localStorage.getItem('quiz')) || [];
  if (existingQuiz && existingQuiz.length === 0) {
    localStorage.setItem('quiz', JSON.stringify(quizData));
    localStorage.removeItem('archive');
  }
};
