import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from './config'

export const addDocument = async (coll, data) => {
    try {
        const docRef = await addDoc(collection(db, coll), {
            ...data,
            createdAt: serverTimestamp(),
        });
        
    } catch (err) {
        console.log(err)
        console.log('bat error o day')
    }

}

// create keyWord for displayName, use for search ssssssssssss
export const generateKeywords = (displayName) => {
    //list hoan vi
    const name = displayName.split(' ').filter(word => word)
    const length = name.length;
    let flagArray = [];
    let result = [];
    let stringArray = [];

    for(let i = 0; i < length; i++) {
        flagArray[i] = false;
    }

    const createKeyWords = (name) => {
        const arrName = [];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        });
        return arrName;
        
    };

    function findPermutation(k) {
        for(let i = 0; i < length; i++) {
            if(!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];
                if(k === length - 1) {
                    stringArray.push(result.join(' '));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }

    findPermutation(0);

    const keyWords = stringArray.reduce((acc, cur) => {
        const words = createKeyWords(cur);
        return [...acc, ...words];
    }, [])

    return keyWords;
}