import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/Auth.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import { ForgotPasswordForm } from './components/forgot-password-form.jsx';
import { ResetPasswordForm } from './components/reset-password-form.jsx';
import AuthenticatedLayout from './layouts/AuthenticatedLayout.jsx';
import DashboardPage from './pages/Dashboard.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/' element={<AuthPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordForm />} />
            <Route
              path='/reset-password/:username'
              element={<ResetPasswordForm />}
            />
          </Route>
          <Route element={<AuthenticatedLayout />}>
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
