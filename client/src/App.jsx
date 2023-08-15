import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Speakers from "./pages/speakers/Speakers";
import Contact from "./pages/contact/Contact";
import FAQ from "./pages/faq/Faq";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Footer from "./components/layout/Footer";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "./utils/ScrollToTop";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import AppContextProvider from "./context/AppContext";

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <AppContextProvider>
          <Header />
          <AnimatePresence>
            <Outlet />
          </AnimatePresence>
          <Footer />
          <ScrollToTop />
        </AppContextProvider>
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
          element: <FAQ />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/resetpassword",
          element: <ResetPassword />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
