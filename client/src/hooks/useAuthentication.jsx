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
        navigate("/payment");
      } else {
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
        if (data.user?.username) {
          setUser(data.user.username);
          setData("user", data.user.username);
          navigate("/profile");
        } else {
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
    removeData("user");
    setUser("");
    navigate("/");
  };

  return { signup, login, logout };
}

export { useAuthentication };
