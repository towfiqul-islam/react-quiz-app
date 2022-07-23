import React from 'react';
import { getCorrectAnswer } from '../../utils/helper';

const Archive = ({
  archive,
  handleRestore,
  deleteFromArchive,
  setArchive,
  quiz,
  setQuiz,
}) => {
  return (
    <div>
      <h2 className='text-center text-xl mt-4 mb-4 underline font-medium'>
        Archive
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
                Restore
              </th>
              <th scope='col' className='py-3 px-6'>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {archive.length > 0 &&
              archive.map((q, index) => (
                <tr key={index} className='bg-gray-50 border-b'>
                  <th
                    scope='row'
                    className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
                  >
                    {q.quizTitle}
                  </th>
                  <td className='py-4 px-6'>{getCorrectAnswer(q.options)}</td>
                  <td className='py-4 px-6'>
                    <button
                      onClick={() =>
                        handleRestore(q, quiz, setQuiz, archive, setArchive)
                      }
                      className='underline font-bold'
                    >
                      Restore
                    </button>
                  </td>
                  <td className='py-4 px-6'>
                    <button
                      onClick={() => deleteFromArchive(q, archive, setArchive)}
                      className='px-8 py-1 bg-red-800 rounded font-semibold text-red-100'
                    >
                      Delete
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
    </div>
  );
};

export default Archive;
