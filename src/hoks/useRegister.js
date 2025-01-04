import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login, setIsPending } from "../app/featcher/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getFirebaseErrorMessage } from "../utiles";

export function useRegister() {
  const dispatch = useDispatch();

  const registerWithEmailAndPassword = async (displayName, email, password) => {
    dispatch(setIsPending(true));
    try {
      // Create a new user with email and password
      let res = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user's profile with display name and photo URL
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: "https://picsum.photos/200/300",
      });

      if (!res) {
        throw new Error("Failed to sigin in, pleace try again");
      }

      // Add the user to the Firestore database
      await setDoc(doc(db, "users", res.user.uid), {
        displayName: displayName,
        id: res.user.uid,
        photoURL: "https://picsum.photos/200/300",
        online: true,
      });

      // Dispatch login action with the user profile
      dispatch(
        login({
          displayName: displayName,
          id: res.user.uid,
          photoURL: "https://picsum.photos/200/300",
        })
      );
      dispatch(setIsPending(false));
      toast.success(`Well come ${res.user.displayName}`);
    } catch (error) {
      dispatch(setIsPending(false));
      toast.error(getFirebaseErrorMessage(error.code));
      toast.error(error.message);
    }
  };

  return { registerWithEmailAndPassword };
}
