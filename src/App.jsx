import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/Auth.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import { ForgotPasswordForm } from './components/forgot-password-form.jsx';
import { ResetPasswordForm } from './components/reset-password-form.jsx';
import AuthenticatedLayout from './layouts/AuthenticatedLayout.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import UsersPage from './pages/Users.jsx';
import DoctorsPage from './pages/Doctors.jsx';
import ArticlesPage from './pages/Articles.jsx';
import SettingsPage from './pages/Settings.jsx';

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
            <Route path='/users' element={<UsersPage />} />
            <Route path='/doctors' element={<DoctorsPage />} />
            <Route path='/articles' element={<ArticlesPage />} />
            <Route path='/settings' element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
