import Loader from "../components/layout/Loader";
import { createContext, useContext, useState } from "react";
import { getData } from "../utils/userData";

const AppContext = createContext({});

function AppContextProvider({ children }) {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(getData("user") || "");
  const value = {
    loader,
    setLoader,
    user,
    setUser,
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
