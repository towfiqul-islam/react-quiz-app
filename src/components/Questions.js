import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Questions = () => {
  const existingQuiz = JSON.parse(localStorage.getItem('quiz')) || [];
  const archived = JSON.parse(localStorage.getItem('archive')) || [];
  const [quiz, setQuiz] = useState(existingQuiz);
  const [archive, setArchive] = useState(archived);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(uuidv4());
  const [title, setTitle] = useState('');
  const [opt_1, setOpt_1] = useState({
    answer_1: '',
    is_correct_1: false,
  });
  const [opt_2, setOpt_2] = useState({
    answer_2: '',
    is_correct_2: false,
  });
  const [opt_3, setOpt_3] = useState({
    answer_3: '',
    is_correct_3: false,
  });
  const [opt_4, setOpt_4] = useState({
    answer_4: '',
    is_correct_4: false,
  });

  const { answer_1, is_correct_1 } = opt_1;
  const { answer_2, is_correct_2 } = opt_2;
  const { answer_3, is_correct_3 } = opt_3;
  const { answer_4, is_correct_4 } = opt_4;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOptionChange1 = (e) => {
    if (e.target.name === 'answer_1') {
      setOpt_1({ ...opt_1, answer_1: e.target.value });
    } else if (e.target.name === 'is_correct_1') {
      setOpt_1({ ...opt_1, is_correct_1: e.target.checked });
    }
  };

  const handleOptionChange2 = (e) => {
    if (e.target.name === 'answer_2') {
      setOpt_2({ ...opt_2, answer_2: e.target.value });
    } else if (e.target.name === 'is_correct_2') {
      setOpt_2({ ...opt_2, is_correct_2: e.target.checked });
    }
  };

  const handleOptionChange3 = (e) => {
    if (e.target.name === 'answer_3') {
      setOpt_3({ ...opt_3, answer_3: e.target.value });
    } else if (e.target.name === 'is_correct_3') {
      setOpt_3({ ...opt_3, is_correct_3: e.target.checked });
    }
  };

  const handleOptionChange4 = (e) => {
    if (e.target.name === 'answer_4') {
      setOpt_4({ ...opt_4, answer_4: e.target.value });
    } else if (e.target.name === 'is_correct_4') {
      setOpt_4({ ...opt_4, is_correct_4: e.target.checked });
    }
  };

  const clearQuiz = () => {
    setTitle('');
    setOpt_1({
      answer_1: '',
      is_correct_1: false,
    });
    setOpt_2({
      answer_2: '',
      is_correct_2: false,
    });
    setOpt_3({
      answer_3: '',
      is_correct_3: false,
    });
    setOpt_4({
      answer_4: '',
      is_correct_4: false,
    });
    setIsEditing(false);
  };

  const handleValidation = () => {
    let isValid = true;
    if (title === '') {
      isValid = false;
      alert('Must provide a quiz title');
    } else if (
      answer_1 === '' ||
      answer_2 === '' ||
      answer_3 === '' ||
      answer_4 === ''
    ) {
      isValid = false;
      alert('Must provide all the options');
    } else if (
      !is_correct_1 &&
      !is_correct_2 &&
      !is_correct_3 &&
      !is_correct_4
    ) {
      isValid = false;
      alert('At least 1 valid answer required');
    }

    return isValid;
  };

  const checkExistence = (singleQuiz) => {
    let found = false;
    for (const q of quiz) {
      if (q.id === singleQuiz.id) found = true;
    }
    return found;
  };

  const handleAddUpdate = () => {
    const isValid = handleValidation();
    if (isValid) {
      let singleQuiz = {
        id: !isEditing ? uuidv4() : id,
        quizTitle: title,
        options: [
          {
            answer_1,
            is_correct_1,
          },
          {
            answer_2,
            is_correct_2,
          },
          {
            answer_3,
            is_correct_3,
          },
          {
            answer_4,
            is_correct_4,
          },
        ],
      };

      const alreadyExists = checkExistence(singleQuiz);

      if (alreadyExists) {
        let updatedQuiz = quiz;
        const updateIndex = updatedQuiz.findIndex(
          (q) => q.id === singleQuiz.id
        );
        updatedQuiz[updateIndex] = singleQuiz;
        setQuiz(updatedQuiz);
        localStorage.removeItem('quiz');
        localStorage.setItem('quiz', JSON.stringify(updatedQuiz));
      } else {
        if (existingQuiz !== null) existingQuiz.push(singleQuiz);
        else existingQuiz.push(singleQuiz);
        localStorage.setItem('quiz', JSON.stringify(existingQuiz));
        setQuiz(existingQuiz);
      }

      clearQuiz();
    }
  };

  const getCorrectAnswer = (options) => {
    let ans = '';

    for (const [index, opt] of options.entries()) {
      if (opt[`is_correct_${index + 1}`]) {
        ans = opt[`answer_${index + 1}`];
      }
    }

    return ans;
  };

  const deleteFromQuiz = (q) => {
    const updatedQuiz = quiz.filter((qu) => {
      return qu.quizTitle !== q.quizTitle;
    });
    setQuiz(updatedQuiz);
    localStorage.removeItem('quiz');
    localStorage.setItem('quiz', JSON.stringify(updatedQuiz));
  };

  const handleEdit = (q) => {
    setIsEditing(true);
    setId(q.id);
    setTitle(q.quizTitle);
    setOpt_1({
      answer_1: q.options[0]['answer_1'],
      is_correct_1: q.options[0]['is_correct_1'],
    });
    setOpt_2({
      answer_2: q.options[1]['answer_2'],
      is_correct_2: q.options[1]['is_correct_2'],
    });
    setOpt_3({
      answer_3: q.options[2]['answer_3'],
      is_correct_3: q.options[2]['is_correct_3'],
    });
    setOpt_4({
      answer_4: q.options[3]['answer_4'],
      is_correct_4: q.options[3]['is_correct_4'],
    });
  };

  const pushToArchive = (q) => {
    let temp = archive;
    temp.push(q);
    setArchive(temp);
    localStorage.setItem('archive', JSON.stringify(temp));
    deleteFromQuiz(q);
  };

  const handleRestore = (q) => {
    existingQuiz.push(q);
    localStorage.setItem('quiz', JSON.stringify(existingQuiz));
    setQuiz(existingQuiz);

    deleteFromArchive(q);
  };

  const deleteFromArchive = (q) => {
    const updatedArchive = archive.filter((qu) => {
      return qu.quizTitle !== q.quizTitle;
    });
    setArchive(updatedArchive);
    localStorage.removeItem('archive');
    localStorage.setItem('archive', JSON.stringify(updatedArchive));
  };

  return (
    <>
      <div>Questions</div>
      <div className='bg-gray-500 px-2 py-1 w-48 my-4'>
        <Link to='/answers'>Go to Answers</Link>
      </div>
      <label>Title</label>
      <textarea
        className='border border-gray-900'
        rows={2}
        cols={50}
        onChange={handleTitleChange}
        name='title'
        value={title}
      ></textarea>
      <br />
      <br />
      <br />
      <label>Answer 1</label>
      <input
        className='border border-gray-900'
        type='text'
        name='answer_1'
        value={answer_1}
        onChange={handleOptionChange1}
      />
      <input
        type='checkbox'
        onChange={handleOptionChange1}
        name='is_correct_1'
        checked={is_correct_1}
      />
      <label>Is correct</label>
      <br />
      <br />
      <br />
      <label>Answer 2</label>
      <input
        className='border border-gray-900'
        type='text'
        name='answer_2'
        value={answer_2}
        onChange={handleOptionChange2}
      />
      <input
        type='checkbox'
        onChange={handleOptionChange2}
        name='is_correct_2'
        checked={is_correct_2}
      />
      <label>Is correct</label>
      <br />
      <br />
      <br />
      <label>Answer 3</label>
      <input
        className='border border-gray-900'
        type='text'
        name='answer_3'
        value={answer_3}
        onChange={handleOptionChange3}
      />
      <input
        type='checkbox'
        onChange={handleOptionChange3}
        name='is_correct_3'
        checked={is_correct_3}
      />
      <label>Is correct</label>
      <br />
      <br />
      <br />
      <label>Answer 4</label>
      <input
        className='border border-gray-900'
        type='text'
        name='answer_4'
        value={answer_4}
        onChange={handleOptionChange4}
      />
      <input
        type='checkbox'
        onChange={handleOptionChange4}
        name='is_correct_4'
        checked={is_correct_4}
      />
      <label>Is correct</label>
      <br />
      <br />
      <br />
      <button onClick={handleAddUpdate} className='px-8 py-2 bg-gray-300'>
        Add
      </button>

      {/* Quiz List */}
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
                      onClick={() => pushToArchive(q)}
                      className='px-8 py-1 bg-red-300'
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <br />
        <div>
          {archive.length > 0 && (
            <>
              <h2>Archive</h2>
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
                            onClick={() => handleRestore(q)}
                            className='px-8 py-1 bg-gray-500'
                          >
                            Restore
                          </button>
                        </td>

                        <td>
                          <button
                            onClick={() => deleteFromArchive(q)}
                            className='px-8 py-1 bg-red-700'
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Questions;
