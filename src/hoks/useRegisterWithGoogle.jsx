import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { signIn, login } from "../app/featcher/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

export function useRegisterWithGoogle() {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();

  const siginInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          photoURL: user.photoURL,
          id: user.uid,
          online: true,
        });
        dispatch(login(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  return { siginInWithGoogle };
}
