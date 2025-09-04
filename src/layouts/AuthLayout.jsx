import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
  return (
    <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
