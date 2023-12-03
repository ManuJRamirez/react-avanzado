import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoginPage from './pages/loginPage/loginPage';
import SignUpPage from './pages/signUpPage/signUpPage';

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
