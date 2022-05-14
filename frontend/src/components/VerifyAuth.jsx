import { getUser, resetUser, logout } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const VerifyAuth = () => {
  const { isAuthError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("tokens")) {
      dispatch(getUser());
    }

    if (isAuthError) {
      navigate("/");
      window.location.reload(false);
      dispatch(logout());
    }

    return () => {
      dispatch(resetUser());
    };
  }, [dispatch, isAuthError, navigate]);
  return <></>;
};

export default VerifyAuth;
