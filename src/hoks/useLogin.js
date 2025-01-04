import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login, setIsPending } from "../app/featcher/userSlice";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { getFirebaseErrorMessage } from "../utiles";

export const useLogin = () => {
  const dispatch = useDispatch();
  const loginInWithEmailAndPassword = async (email, password) => {
    dispatch(setIsPending(true));
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("Failed to sigin in, pleace try again");
      }

      await setDoc(doc(db, "users", res.user.uid), {
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        id: res.user.uid,
        online: true,
      });
      dispatch(login(res.user));
      dispatch(setIsPending(true));
      toast.success(`Wall come back ${res.user.displayName}`);
    } catch (error) {
      dispatch(setIsPending(false));
      toast.error(getFirebaseErrorMessage(error.code));
      toast.error(error.message);
    }
  };
  return { loginInWithEmailAndPassword };
};
