import { createContext, useContext, useMemo, useState } from 'react';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [cities, setCities] = useState({});

    const {
        user: { uid },
    } = useContext(AuthContext);

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        };
    }, [uid]);

    const rooms = useFireStore('rooms', roomsCondition);

    console.log("rooms: ", rooms)

    const selectedRoom = useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId],
    );

    const usersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
        }
    }, [selectedRoom.members]);

    const members = useFireStore('users', usersCondition);


    const clearState = () => {
        setSelectedRoomId('');
        setIsAddRoomVisible(false);
        setIsInviteMemberVisible(false);
    }


    return (
        <AppContext.Provider value={{ 
            rooms,
            members,
            selectedRoom,
            isAddRoomVisible,
            setIsAddRoomVisible,
            selectedRoomId,
            setSelectedRoomId,
            isInviteMemberVisible,
            setIsInviteMemberVisible,
            clearState,
            cities,
            setCities
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
