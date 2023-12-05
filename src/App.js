import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import LoginPage from './pages/loginPage/loginPage';
import SignUpPage from './pages/signUpPage/signUpPage';
import AdvertsPage from './pages/advertsPage/advertsPage';
import Layout from './components/layout/Layout';
import AdvertPage from './pages/advertPage/advertPage';
import NewAdvertPage from './pages/newAdvertPage/newAdvertPage';
import RequireAuth from './components/auth/RequireAuth';
import NotFoundPage from './components/tools/NotFoundPage';

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
      <Route
        path="/signup"
        element={
          <RequireAuth>
            <SignUpPage />
          </RequireAuth>
        }
      />
      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route
          index
          element={
            <RequireAuth>
              <AdvertsPage />
            </RequireAuth>
          }
        />
        <Route
          path=":advertId"
          element={
            <RequireAuth>
              <AdvertPage />
            </RequireAuth>
          }
        />
        <Route
          path="new"
          element={
            <RequireAuth>
              <NewAdvertPage />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Navigate to="/adverts" />
          </RequireAuth>
        }
      />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
