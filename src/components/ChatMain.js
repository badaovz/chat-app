import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Avatar, Tooltip, Form, Input, Alert } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../context/AppProvider';
import { AuthContext } from '../context/AuthProvider';
import { addDocument } from '../firebase/services';
import useFireStore from '../hooks/useFireStore';

const WrapperStyled = styled.div`
    height: 100vh;
`;
const HeaderStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #ddd;
    height: 56px;

    .header__title {
        font-weight: 600;
        margin-bottom: 0;
    }

    .header__desc {
        opacity: 0.5;
    }
`;

const ContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
    height: calc(100vh - 56px);
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;
const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ddd;
    padding: 4px 2px 4px 0;
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
    .ant-row .ant-form-item-row {
        width: 100%;
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    /* justify-content: center; */
    align-items: center;
`;

const ChatMain = () => {
    const { selectedRoom, members, setIsInviteMemberVisible } =
        useContext(AppContext);
    const {
        user: { uid, photoURL, displayName },
    } = useContext(AuthContext);

    const messageListRef = useRef(null);
    const inputRef = useRef(null);

    const [inputValue, setInputValue] = useState('');
    const [form] = Form.useForm();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName,
        });

        form.resetFields(['message']);

        if (inputRef?.current) {
            setTimeout(() => {
                inputRef.current.focus();
            });
        }
    };

    const condition = useMemo(
        () => ({
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoom.id,
        }),
        [selectedRoom.id],
    );

    let messages = useFireStore('messages', condition)?.sort(
        (a, b) => a?.createdAt?.seconds - b?.createdAt?.seconds,
    );

    useEffect(() => {
        if (messageListRef?.current) {
            messageListRef.current.scrollTop =
                messageListRef.current.scrollHeight + 50;
        }
    }, [messages]);

    console.log('messages', messages);

    return (
        <WrapperStyled>
            {selectedRoom.id ? (
                <>
                    <HeaderStyled>
                        <div className='header__info'>
                            <p className='header__title'>{selectedRoom.name}</p>
                            <span className='header__desc'>
                                {selectedRoom.description}
                            </span>
                        </div>
                        <ButtonGroupStyled>
                            <Button
                                type='text'
                                icon={<UserAddOutlined />}
                                onClick={() => setIsInviteMemberVisible(true)}
                            >
                                invite
                            </Button>
                            <Avatar.Group size='small' maxCount={2}>
                                {members.map((member) => (
                                    <Tooltip
                                        title={member.displayName}
                                        key={member.id}
                                    >
                                        <Avatar src={member.photoURL}>
                                            {member.photoURL
                                                ? ''
                                                : member.displayName
                                                      .charAt(0)
                                                      .toUpperCase()}
                                        </Avatar>
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                        </ButtonGroupStyled>
                    </HeaderStyled>

                    <ContentStyled>
                        <MessageListStyled ref={messageListRef}>
                            {messages?.map((message) => (
                                <Message
                                    key={message.id}
                                    text={message.text}
                                    photoURL={message.photoURL}
                                    displayName={message.displayName}
                                    createdAt={message.createdAt}
                                />
                            ))}
                        </MessageListStyled>
                        <FormStyled form={form}>
                            <Form.Item name='message'>
                                <Input
                                    ref={inputRef}
                                    placeholder='enter your message...'
                                    bordered={false}
                                    autoComplete='off'
                                    onChange={handleInputChange}
                                    onPressEnter={handleSubmit}
                                />
                            </Form.Item>
                            <Button type='primary' onClick={handleSubmit}>
                                Submit
                            </Button>
                        </FormStyled>
                    </ContentStyled>
                </>
            ) : (
                <Alert
                    message='select a room'
                    type='info'
                    showIcon
                    style={{ margin: 5 }}
                    closable
                />
            )}
        </WrapperStyled>
    );
};

export default ChatMain;
