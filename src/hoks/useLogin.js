import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const useLogin = () => {
  const loginInWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((profile) => {
        console.log(profile.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { loginInWithEmailAndPassword };
};
