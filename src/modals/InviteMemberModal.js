import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { debounce } from 'lodash';
import { AppContext } from '../context/AppProvider';
import { db } from '../firebase/config';
import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
    getDoc,
    doc,
    getDocs,
    updateDoc
} from 'firebase/firestore';

function DebounceSelect({
    fetchOptions,
    debounceTimeout = 300,
    curMembers,
    ...props
}) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then((newOption) => {
                setOptions(newOption);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout, curMembers]);

    useEffect(() => {
        return () => setOptions([]);
    }, []);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option
                    key={opt.value}
                    value={opt.value}
                    title={opt.label}
                >
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL
                            ? ''
                            : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {`${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}

const fetchUserList = async (search, curMembers) => {
    const q = query(
      collection(db, 'users'),
      where('keyWords', 'array-contains', search?.toLowerCase()),
      orderBy('displayName', 'desc'),
      limit(20)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      return {
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL
      }
    }).filter(opt => !curMembers.includes(opt.value));
  }

const InviteMemberModal = () => {
    const {
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        selectedRoomId,
        selectedRoom,
    } = useContext(AppContext);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = () => {
        // const roomRef = collection(db, 'rooms').doc(selectedRoomId);
        const roomRef = doc(db, 'rooms', selectedRoomId);

        updateDoc(roomRef, {
            members: [
                ...selectedRoom.members,
                ...value.map((val) => val.value),
            ],
        });

        setValue([]);
        form.resetFields();
        setIsInviteMemberVisible(false);
    };
    const handleCancel = () => {
        setValue([]);
        form.resetFields();
        setIsInviteMemberVisible(false);
    };

    return (
        <div>
            <Modal
                title='Invite Members'
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnclose={true}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        name='search-users'
                        label='name members'
                        value={value}
                        placeholder='enter member name'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    );
};

export default InviteMemberModal;
