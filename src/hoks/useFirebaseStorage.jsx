import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

function useFirebaseStorage(collectionName) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const addDocument = async (data) => {
    setIsPending(true);
    try {
      await addDoc(collection(db, collectionName), data);
      toast.success("Malumot qoshildi");
    } catch (error) {
      toast.warn("Malumot qoshilishda muammo chiqildi");
      setError(error.code);
    } finally {
      setIsPending(false);
    }
  };
  return { addDocument, isPending, error };
}

export { useFirebaseStorage };
