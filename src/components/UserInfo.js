import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import { Avatar, Typography, Button } from 'antd';
import { collection, getDocs, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';

import {AuthContext} from '../context/AuthProvider';
import { auth, db } from '../firebase/config';

const WrapperStyled = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  padding: 16px 8px;
  border-bottom: 1px solid #ddd;

  .display-name {
    font-size: 16px;
    text-transform: capitalize;
    color: white;
    margin-left: 6px;
  }
`


const UserInfo = () => {


  const  {user:{displayName, photoURL}}= useContext(AuthContext);

  // useEffect(() => {
  //   onSnapshot(collection(db, 'users'), (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id
  //     }));

  //     console.log('OBJ: ', {data, snapshot, docs: snapshot.docs});
  //   })      
  // }, [])


  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='display-name'>{displayName}</Typography.Text>
      </div>
      <Button ghost onClick={() => auth.signOut()}>
        Sign Out
      </Button>

    </WrapperStyled>
  )
}

export default UserInfo