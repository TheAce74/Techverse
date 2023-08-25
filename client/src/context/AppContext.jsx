import Loader from "../components/layout/Loader";
import { createContext, useContext, useState } from "react";
import { getData, setData } from "../utils/userData";

const AppContext = createContext({});

function AppContextProvider({ children }) {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(
    getData("user") || {
      username: "",
      email: "",
      seat_number: 0,
      ticket_id: "",
      ticket_type: "",
      color: "",
    }
  );

  const addUser = (user) => {
    setData("user", user);
    setUser(user);
  };

  const value = {
    loader,
    setLoader,
    user,
    addUser,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {loader && <Loader />}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const appContext = useContext(AppContext);
  return appContext;
}

export default AppContextProvider;
