import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePageLayout from './Shared/HomePageLayout';


import './App.css'
import InvoiceListPage from './Pages/InvoiceListPage';
import InvoiceDetailPage from './Pages/InvoiceDetailPage';
// import { ThemeToggle } from './component/common/ThemeToggle/ThemeToggle';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",

      element: <HomePageLayout />,
      children: [
                {
          index: true,
          element: <InvoiceListPage />,
        },
        {
          path: "/detail/:id",
          element: <InvoiceDetailPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App
