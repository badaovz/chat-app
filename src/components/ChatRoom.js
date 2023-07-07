import { Row, Col } from 'antd';
import React from 'react';
import ChatMain from './ChatMain';
import Sidebar from './Sidebar';

const ChatRoom = () => {
    return (
        <div>
            <Row>
                <Col span={6} style={{ backgroundColor: '#45f' }}>
                    <Sidebar />
                </Col>
                <Col span={18}>
                    <ChatMain />
                </Col>
            </Row>
        </div>
    );
};

export default ChatRoom;
