import React from 'react';
import { getCorrectAnswer } from '../../utils/helper';

const QuestionsList = ({
  quiz,
  setQuiz,
  handleEdit,
  pushToArchive,
  archive,
  setArchive,
}) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Quiz title</th>
            <th>Answer</th>
            <th>Edit</th>
            <th>Archive</th>
          </tr>
          {quiz.length > 0 &&
            quiz.map((q, index) => (
              <tr key={index}>
                <td>{q.quizTitle}</td>
                <td>{getCorrectAnswer(q.options)}</td>
                <td>
                  <button
                    onClick={() => handleEdit(q)}
                    className='px-8 py-1 bg-gray-500'
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      pushToArchive(q, archive, setArchive, quiz, setQuiz)
                    }
                    className='px-8 py-1 bg-red-300'
                  >
                    Archive
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsList;
