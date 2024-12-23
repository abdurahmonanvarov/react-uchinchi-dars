import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login } from "../app/featcher/userSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  const loginInWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((profile) => {
        dispatch(login(profile.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { loginInWithEmailAndPassword };
};
