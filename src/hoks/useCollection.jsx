import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export function useCollection(collectionName) {
  const [datam, setData] = useState(null);
  useEffect(() => {
    const q = collection(db, collectionName);

    onSnapshot(q, (quarySnabshout) => {
      const dataw = [];
      quarySnabshout.forEach((snapshot) => {
        dataw.push({ id: snapshot.id, ...snapshot.data() });
      });
      setData(dataw);
    });
  }, [collectionName]);
  console.log({ datam });

  return { datam };
}
