import './styles/App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/Main';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Authenticate from './components/Authenticate';



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />
    },
    {
      path: '/quiz',
      element: <Authenticate><Quiz /></Authenticate>
    },
    {
      path: '/result',
      element: <Authenticate><Result /></Authenticate>
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
