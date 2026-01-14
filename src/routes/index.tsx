import { lazy } from 'react';
import NotFound from '@/components/NotFound';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/LoginPage';
import SignUpChoicePage from '@/pages/SignUpChoicePage';
import RecruiterSignUpPage from '@/pages/RecruiterSignUpPage';
import EmployerSignUpPage from '@/pages/EmployerSignUpPage';
import LearningPage from '@/pages/LearningPage';
import CommunityPage from '@/pages/CommunityPage';

// Lazy load the company pages for better performance
const CompaniesPage = lazy(() => import('@/pages/CompaniesPage'));
const CompanyDetailsPage = lazy(() => import('@/pages/CompanyDetailsPage'));
const JobDetailsPage = lazy(() => import('@/pages/JobDetailsPage'));
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
        path: 'learning',
        element: <LearningPage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'companies',
        children: [
          {
            index: true,
            element: <CompaniesPage />,
          },
          {
            path: ':id',
            element: <CompanyDetailsPage />,
          },
          {
            path: ':id/jobs/:jobId',
            element: <JobDetailsPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
