import React, { useState } from "react";
import Navbar from "./Navbar";

const Answers = () => {
  const quiz = JSON.parse(localStorage.getItem("quiz")) || [];
  const cached = JSON.parse(localStorage.getItem("cache")) || {};
  const [ans_count, set_ans_count] = useState(
    parseInt(cached["ans_count"] || 0)
  );
  const [current_quiz, set_current_quiz] = useState(quiz[ans_count]);
  const [score, setScore] = useState(parseInt(cached["score"] || 0));
  const [showScore, setShowScore] = useState(false);
  const [done, setDone] = useState(false);
  const { quizTitle, options } = current_quiz || {};

  const addToCache = (ans = false) => {
    cached.ans_count = ans_count + 1;
    if (ans) {
      cached.score = score + 1;
    }

    localStorage.setItem("cache", JSON.stringify(cached));
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
    localStorage.removeItem("cache");
    window.location.reload();
  };
  const quiz_in_progress = !done && options && options.length;
  return (
    <>
      <Navbar showScore={showScore} />
      {quiz_in_progress > 0 && (
        <div className="text-center mt-8">
          Answering {ans_count + 1} of {quiz.length} questions
        </div>
      )}

      <div>
        {!done && (
          <h2 className="md:text-2xl text-xl font-semibold text-center px-2 mt-2">
            {quizTitle}
          </h2>
        )}
        <div className="flex flex-col justify-center items-center mt-8">
          {quiz_in_progress > 0 ? (
            options.map((opt, index) => (
              <div className="mt-2" key={index}>
                <button
                  className="inline-block px-6 py-2.5 text-black hover:text-white border bg-gray-300  font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-64 mb-3"
                  onClick={() => handleAnswer(opt[`is_correct_${index + 1}`])}
                >
                  {opt[`answer_${index + 1}`]}
                </button>{" "}
              </div>
            ))
          ) : (
            <div>
              <h2 className="text-xl sm:text-3xl text-center mb-4">
                {" "}
                {showScore ? "Your score" : "End of the quiz"}
              </h2>
              {showScore ? (
                <>
                  <div
                    className="font-bold text-6xl text-gray-700 rounded-full border-gray-700 border-2 bg-white flex items-center justify-center font-mono"
                    style={{
                      height: "180px",
                      width: "180px",
                    }}
                  >
                    <span>{score}</span>
                  </div>
                  <button
                    className="px-8 py-2 underline text-2xl font-semibold block mx-auto mt-4"
                    onClick={restartQuiz}
                  >
                    Restart Quiz
                  </button>
                </>
              ) : (
                <button
                  className="px-8 py-2 block mx-auto rounded border-2 border-gray-700 font-medium"
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
