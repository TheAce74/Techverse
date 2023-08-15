import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { getData, setData, removeData } from "../utils/userData";
import { fetchData } from "../utils/fetchData";
import Swal from "sweetalert2";

function useAuthentication() {
  const navigate = useNavigate();
  const { setLoader, setUser } = useAppContext();

  const signup = (url, method, info) => {
    setLoader(true);
    fetchData(url, method, info).then((data) => {
      setLoader(false);
      if (data.status === "success") {
        setUser(data.username);
        setData("user", data.username);
        // Navigate to profile page or ticket page
        navigate("/about");
      } else {
        // throw error data.error contains the error message
        Swal.fire({
          title: "Signup Failed",
          text: data.error,
          icon: "error",
          confirmButtonText: "Try again",
          confirmButtonColor: "var(--clr-secondary-400)",
        });
      }
    });
  };

  const login = (url, method, info) => {
    setLoader(true);
    const user = getData("user");
    if (user) {
      setLoader(false);
      setUser(user);
    } else {
      fetchData(url, method, info).then((data) => {
        setLoader(false);
        console.log(data);
        if (data.status === "success" || data.user.username) {
          setUser(data.username || data.user.username);
          setData("user", data.username || data.user.username);
          // Navigate to profile page
          navigate("/about");
        } else {
          // throw error
          Swal.fire({
            title: "Login Failed",
            text: data.error,
            icon: "error",
            confirmButtonText: "Try again",
            confirmButtonColor: "var(--clr-secondary-400)",
          });
        }
      });
    }
  };

  const logout = () => {
    //add logout request logic later
    setUser("");
    removeData("user");
  };

  return { signup, login, logout };
}

export { useAuthentication };
