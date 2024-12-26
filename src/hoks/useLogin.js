import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login } from "../app/featcher/userSlice";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

export const useLogin = () => {
  const dispatch = useDispatch();
  const loginInWithEmailAndPassword = async (email, password) => {
    let res = await signInWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
      id: res.user.uid,
      online: true,
    });
    console.log(res.user.uid);
    dispatch(login(profile.user));
    toast.success(`Wall back ${profile.user.displayName}`);
  };
  return { loginInWithEmailAndPassword };
};
