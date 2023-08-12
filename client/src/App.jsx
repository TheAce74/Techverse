import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Speakers from "./pages/speakers/Speakers";
import Contact from "./pages/contact/Contact";
import Faq from "./pages/faq/Faq";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Footer from "./components/layout/Footer";

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/speakers",
          element: <Speakers />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/faq",
          element: <Faq />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
