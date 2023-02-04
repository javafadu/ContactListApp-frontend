import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { getAuthUser } from "./api/user-service";
import Loading from "./components/common/loading/loading";
import LinkRoutes from "./router/link-routes";
import { loginFailed, loginSuccess } from "./store/slices/auth-slice";
import { settings } from "./utils/settings";

const App = () => {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      let token = secureLocalStorage.getItem("token");
      if (token) {
        const resp = await getAuthUser();
        dispatch(loginSuccess(resp.data));
      }
    } catch (err) {
      dispatch(loginFailed());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    document.title = `${settings.siteName} | Feel free to contact`;
  }, []);


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="App">
          <LinkRoutes />
        </div>
      )}
    </>

  )
};

export default App;
