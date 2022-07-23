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
      <h2 className='text-center text-xl mt-4 mb-4 underline font-medium'>
        Current Questions
      </h2>
      <div className='overflow-x-auto relative'>
        <table className='w-full text-sm text-left text-black'>
          <thead className='text-xs text-black uppercase bg-gray-200'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                Quiz title
              </th>
              <th scope='col' className='py-3 px-6'>
                Answer
              </th>
              <th scope='col' className='py-3 px-6'>
                Edit
              </th>
              <th scope='col' className='py-3 px-6'>
                Archive
              </th>
            </tr>
          </thead>
          <tbody>
            {quiz.length > 0 &&
              quiz.map((q, index) => (
                <tr
                  key={index}
                  className='bg-gray-50 border-b'
                >
                  <th
                    scope='row'
                    className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
                  >
                    {q.quizTitle}
                  </th>
                  <td className='py-4 px-6'>{getCorrectAnswer(q.options)}</td>
                  <td className='py-4 px-6'>
                    <button
                      onClick={() => handleEdit(q)}
                      className='underline font-bold'
                    >
                      Edit
                    </button>
                  </td>
                  <td className='py-4 px-6'>
                    <button
                      onClick={() =>
                        pushToArchive(q, archive, setArchive, quiz, setQuiz)
                      }
                      className='px-8 py-1 bg-red-300 rounded font-semibold text-red-900'
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default QuestionsList;
