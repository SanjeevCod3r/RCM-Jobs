import NotFound from '@/components/NotFound';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/LoginPage';
import SignUpChoicePage from '@/pages/SignUpChoicePage';
import RecruiterSignUpPage from '@/pages/RecruiterSignUpPage';
import EmployerSignUpPage from '@/pages/EmployerSignUpPage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpChoicePage />,
      },
      {
        path: 'signup/recruiter',
        element: <RecruiterSignUpPage />,
      },
      {
        path: 'signup/employer',
        element: <EmployerSignUpPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
