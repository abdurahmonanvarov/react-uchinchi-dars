import { toast } from "react-toastify";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

export function useLogeOut() {
  const { user } = useSelector((store) => store.user);
  const logeout = async () => {
    let ref = doc(db, "users", user.uid);
    await updateDoc(ref, {
      online: false,
    });

    signOut(auth)
      .then(() => {
        toast.success("Loge out success");
      })
      .catch((error) => {
        toast.warn(error.message);
      });
  };

  return { logeout };
}
