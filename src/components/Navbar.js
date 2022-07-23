import React from 'react';
import { Link } from 'react-router-dom';
import { isAdmin, isUserOrAdmin } from '../utils/permission';

const Navbar = ({ showScore = false }) => {
  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('quiz');
    localStorage.removeItem('cache');
    localStorage.removeItem('archive');
    window.location.reload();
  };
  const handleAnswerNav = () => {
    console.log({ showScore });
    if (showScore) {
      localStorage.removeItem('cache');
      window.location.reload();
    }
  };
  return (
    <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800'>
      <div className='md:w-4/5 flex justify-between items-center mx-auto'>
        <div className='block text-xl font-semibold whitespace-nowrap dark:text-white'>
          Quizz
        </div>

        <div className=''>
          <ul className='flex md:gap-10'>
            {isAdmin && (
              <li>
                <Link
                  to='/questions'
                  className=' py-2 pr-4 pl-3 text-white  dark:text-white'
                  aria-current='page'
                >
                  Questions
                </Link>
              </li>
            )}

            {isUserOrAdmin && (
              <>
                <li>
                  {showScore ? (
                    <span
                      onClick={handleAnswerNav}
                      className=' py-2 pr-4 pl-3 text-white  dark:text-white cursor-pointer'
                    >
                      Answers
                    </span>
                  ) : (
                    <Link
                      to='/answers'
                      className=' py-2 pr-4 pl-3 text-white  dark:text-white'
                      aria-current='page'
                    >
                      Answers
                    </Link>
                  )}
                </li>

                <li onClick={logout}>
                  <span className=' py-2 pr-4 pl-3 text-white  dark:text-white cursor-pointer'>
                    Logout
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
