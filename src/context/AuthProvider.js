import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const unSubscribed = auth.onAuthStateChanged((user) => {
            if(user) {
                const {displayName, email, uid, photoURL} = user;
                setUser({displayName, email, uid, photoURL});
                setIsLoading(false)
                navigate('/');
                return;
            }
            setUser({});
            setIsLoading(false);
            navigate('/login');
        })

        return () => {
            unSubscribed();
        }
    }, [navigate])
    // const [user, setUser] = useState({
    //     displayName: 'dao nguyen',
    //     email: 'badaovai1997@gmail.com',
    //     emailVerified: true,
    //     isAnonymous: false,
    //     phoneNumber: null,
    //     photoURL:
    //         'https://lh3.googleusercontent.com/a/AItbvmkHdd3eKae2M-jwdCViepjViOSfsX0EPCOZKYAe=s96-c',
    //     providerId: 'firebase',
    //     reloadListener: null,
    //     tenantId: null,
    //     uid: 'eZwS1wSVt3fh94TjfB4Lg0u20Uy1'
    // });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {isLoading ? <Spin/> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
