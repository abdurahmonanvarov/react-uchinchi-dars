import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login } from "../app/featcher/userSlice";
import { doc, setDoc } from "firebase/firestore";

export function useRegister() {
  const dispach = useDispatch();
  const registerWithEmailAndPassword = async (displayName, email, password) => {
    let res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: " https://picsum.photos/200/300",
    });

    await setDoc(doc(db, "users", res.user.uid), {
      displayName: res.user.displayName,
      id: res.user.uid,
      photoURL: res.user.photoURL,
      online: true,
    });

    dispach(login(profile.user));
  };

  return { registerWithEmailAndPassword };
}
