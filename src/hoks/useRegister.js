import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login } from "../app/featcher/userSlice";

export function useRegister() {
  const dispach = useDispatch();
  const registerWithEmailAndPassword = (displayName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (profile) => {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: " https://picsum.photos/200/300",
        });

        dispach(login(profile.user));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return { registerWithEmailAndPassword };
}
