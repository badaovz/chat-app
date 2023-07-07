import { Button, Col, Row, Typography } from 'antd';
import {
    FacebookAuthProvider,
    getAdditionalUserInfo,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthProvider';
import { auth } from '../firebase/config';
import { addDocument, generateKeywords } from '../firebase/services';

const { Title } = Typography;

const fbProvider = new FacebookAuthProvider();
const gProvider = new GoogleAuthProvider();

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-title {
        text-align: center;
        color: #00b4d8;
    }
`;
const Login = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (provider) => {
        const data = await signInWithPopup(auth, provider);
        const { user } = data;
        const { isNewUser } = getAdditionalUserInfo(data); //GoogleAdditionalUserInfo
        setUser(user);
        navigate('/');
        if (isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: user.providerId,
                keyWords: generateKeywords(user.displayName?.toLowerCase()),
            });
        }
    };

    return (
        <Wrapper>
            <Row
                justify='center'
                style={{
                    boxShadow: '0 0 10px rgba(0, 0, 0, .3)',
                    padding: '40px 20px',
                    borderRadius: '10px',
                }}
            >
                <Col span={16}>
                    <Title level={3} className='login-title'>
                        Chat App
                    </Title>
                    <Button
                        style={{ width: '100%', marginBottom: '20px' }}
                        onClick={() => handleLogin(gProvider)}
                    >
                        Đăng nhập bằng Google
                    </Button>
                    <Button
                        style={{ width: '100%' }}
                        onClick={() => handleLogin(fbProvider)}
                    >
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default Login;
