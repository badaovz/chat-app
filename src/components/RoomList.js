import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppProvider';

const { Panel } = Collapse;

const TypographyLinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`;
const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header {
            color: white;
        }

        .ant-collapse-content-box {
            padding: 0 40px;
        }

        .add-room {
            color: white;
            padding: 0;
        }

        .ant-collapse > .ant-collapse-item > .ant-collapse-header {
            padding-bottom: 0;
        }
    }
`;

const RoomList = () => {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);
    console.log('Rooms: ', rooms)

    const handleAddRoomClick = () => {
      setIsAddRoomVisible(true);
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header='Room Lists' key='1'>
                {rooms.map((room) => (
                    <TypographyLinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id) }>
                        {room.name}
                    </TypographyLinkStyled>
                ))}
                <Button
                    className='add-room'
                    type='text'
                    icon={<PlusSquareOutlined />}
                    onClick={handleAddRoomClick}
                >
                    Add Room
                </Button>
            </PanelStyled>
        </Collapse>
    );
};

export default RoomList;
