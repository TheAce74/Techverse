import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { removeData } from "../utils/userData";
import { fetchData } from "../utils/fetchData";
import Swal from "sweetalert2";

function useAuthentication() {
  const navigate = useNavigate();
  const { user, setLoader, addUser } = useAppContext();

  const signup = (url, method, info) => {
    setLoader(true);
    fetchData(url, method, info).then((data) => {
      setLoader(false);
      if (data?.user?.username) {
        addUser({
          ...user,
          username: data.user.username,
          email: data.user.email,
        });
        navigate("/payment");
      } else {
        Swal.fire({
          title: "Signup Failed",
          text: data?.error || data,
          icon: "error",
          confirmButtonText: "Try again",
          confirmButtonColor: "var(--clr-secondary-400)",
        });
      }
    });
  };

  const login = (url, method, info) => {
    setLoader(true);
    fetchData(url, method, info).then((data) => {
      setLoader(false);
      if (data?.user?.username) {
        addUser({
          ...user,
          username: data.user.username,
          email: data.user.email,
          seat_number: data.user?.seat_number || 0,
          ticket_id: data.user?.ticket_id || "",
          ticket_type: data.user?.ticket_type || "",
          image: data.user?.photo_url
            ? `https://techverse-v2.onrender.com/fileinfo/${data.user.photo_url}`
            : "",
        });
        navigate("/profile");
      } else {
        Swal.fire({
          title: "Login Failed",
          text: data?.error || data,
          icon: "error",
          confirmButtonText: "Try again",
          confirmButtonColor: "var(--clr-secondary-400)",
        });
      }
    });
  };

  const logout = () => {
    setLoader(true);
    setTimeout(() => {
      addUser({
        username: "",
        email: "",
        seat_number: 0,
        ticket_id: "",
        ticket_type: "",
        color: "",
        image: "",
      });
      removeData("user");
      navigate("/");
      setLoader(false);
    }, 3000);
  };

  return { signup, login, logout };
}

export { useAuthentication };
