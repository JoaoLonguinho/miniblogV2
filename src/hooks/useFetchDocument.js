import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc,getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    //memory leak
    const [canceled, setCanceled] = useState(false);

    useEffect(() => {
        async function loadDocument() {
            if (canceled) return

            setLoading(true)

            try {
                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);
                
                setDocument(docSnap.data())

                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        }
        loadDocument();
    }, [docCollection, id, canceled])


    useEffect(() => {
        return () => setCanceled(true)
    }, [])

    return { document, loading, error };
}