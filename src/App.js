import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Answers from './components/Answers';
import Signin from './components/Signin';
import Questions from './components/Questions';
import AppState from './context/AppState';
import { isAdmin, isUser, isUserOrAdmin } from './utils/permission';
import { generateSeedData } from './utils/helper';

function App() {
  generateSeedData();

  return (
    <>
      <AppState>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={getHomePage()} />
            <Route
              path='/questions'
              element={isAdmin ? <Questions /> : <Navigate to='/' replace />}
            />

            <Route
              path='/answers'
              element={
                isUserOrAdmin ? <Answers /> : <Navigate to='/' replace />
              }
            />

            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
      </AppState>
    </>
  );
}

function getHomePage() {
  if (isAdmin) {
    return <Navigate to='/questions' replace />;
  } else if (isUser) {
    return <Navigate to='/answers' replace />;
  } else {
    return <Signin />;
  }
}

export default App;
