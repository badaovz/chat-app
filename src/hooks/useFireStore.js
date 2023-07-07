import {
    collection, onSnapshot, orderBy, query, where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useFireStore = (col, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let collectionRef = collection(db, col);
        let queryRef;
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                setDocuments([]);
                return;
            }
            
            queryRef  = query(
                collectionRef,
                where(
                    condition.fieldName,
                    condition.operator,
                    condition.compareValue,
                    ),
                // orderBy("createdAt"),
            );
        }
        const unsubscribe = onSnapshot(queryRef ? queryRef : collectionRef, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(documents);
        });

        return () => unsubscribe();
    }, [col, condition]);


    return documents;
};

export default useFireStore;
