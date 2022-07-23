import React, { useState } from 'react';

const Answers = () => {
  const quiz = JSON.parse(localStorage.getItem('quiz')) || [];
  const cached = JSON.parse(localStorage.getItem('cache')) || {};
  const [ans_count, set_ans_count] = useState(
    parseInt(cached['ans_count'] || 0)
  );
  const [current_quiz, set_current_quiz] = useState(quiz[ans_count]);
  const [score, setScore] = useState(parseInt(cached['score'] || 0));
  const [showScore, setShowScore] = useState(false);
  const [done, setDone] = useState(false);
  const { quizTitle, options } = current_quiz || {};

  const addToCache = (ans = false) => {
    cached.ans_count = ans_count + 1;
    if (ans) {
      cached.score = score + 1;
    }

    localStorage.setItem('cache', JSON.stringify(cached));
  };

  const handleAnswer = (answer) => {
    if (ans_count < quiz.length) {
      set_ans_count(ans_count + 1);
      addToCache();
      if (answer) {
        setScore(score + 1);
        addToCache(true);
      }
      if (ans_count + 1 === quiz.length) {
        set_current_quiz(quiz[ans_count]);

        setDone(true);
      } else {
        set_current_quiz(quiz[ans_count + 1]);
      }
    }
  };
  const restartQuiz = () => {
    localStorage.removeItem('cache');
    window.location.reload();
  };
  const quiz_in_progress = !done && options && options.length;
  return (
    <>
      {quiz_in_progress > 0 && (
        <div>
          Answering {ans_count + 1} of {quiz.length} questions
        </div>
      )}

      <div>
        {!done && <h2>{quizTitle}</h2>}
        <div>
          {quiz_in_progress > 0 ? (
            options.map((opt, index) => (
              <div className='mt-4' key={index}>
                <button
                  className='px-8 py-2 bg-green-300 w-48 mb-4'
                  onClick={() => handleAnswer(opt[`is_correct_${index + 1}`])}
                >
                  {opt[`answer_${index + 1}`]}
                </button>{' '}
                <br />
              </div>
            ))
          ) : (
            <div>
              <p>End of the quiz</p>
              {showScore ? (
                <>
                  <span>Your score: {score}</span> <br />
                  <button
                    className='px-8 py-2 bg-gray-400'
                    onClick={restartQuiz}
                  >
                    Restart
                  </button>
                </>
              ) : (
                <button
                  className='px-8 py-2 bg-green-700'
                  onClick={() => {
                    setShowScore(true);
                  }}
                >
                  Show score
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Answers;
