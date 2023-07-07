import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider';
import { AuthContext } from '../context/AuthProvider';
import {Form, Modal, Input} from 'antd';
import { addDocument } from '../firebase/services';

const AddRoomModal = () => {
    const { isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext);
    const {user: {uid}} = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        addDocument('rooms', {
            ...form.getFieldValue(),
            members: [uid]
        })
        form.resetFields(); //delete values in form field
        setIsAddRoomVisible(false)
    }
    const handleCancel = () => {
        form.resetFields(); 
        setIsAddRoomVisible(false)
    }
  return (
    <div>
        <Modal
            title='create room'
            visible={isAddRoomVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form} layout='vertical'>
                <Form.Item label='Room Name' name='name'>
                    <Input placeholder='enter room name'/>
                </Form.Item>
                <Form.Item label='description' name='description'>
                    <Input.TextArea placeholder='enter description'/> 
                </Form.Item>
            </Form>
        </Modal>
    </div>
  )
}

export default AddRoomModal