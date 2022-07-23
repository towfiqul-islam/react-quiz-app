import React from 'react';
import { getCorrectAnswer } from '../../utils/helper';

const Archive = ({ archive, handleRestore, deleteFromArchive, setArchive, quiz, setQuiz }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Quiz title</th>
            <th>Answer</th>
            <th>Restore</th>
            <th>Delete</th>
          </tr>
          {archive.length > 0 &&
            archive.map((q, index) => (
              <tr key={index}>
                <td>{q.quizTitle}</td>
                <td>{getCorrectAnswer(q.options)}</td>
                <td>
                  <button
                    onClick={() => handleRestore(q, quiz, setQuiz, archive, setArchive)}
                    className='px-8 py-1 bg-gray-500'
                  >
                    Restore
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => deleteFromArchive(q, archive, setArchive)}
                    className='px-8 py-1 bg-red-700'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Archive;
