import React from 'react';
import styled from 'styled-components';
import { Avatar, Typography } from 'antd';
import { formatRelative } from 'date-fns';

const WrapperStyled = styled.div`
    margin-bottom: 10px;

    .author {
        margin-left: 5px;
        font-weight: bold;
    }

    .date {
        margin-left: 10px;
        font-size: 11px;
        color: #a7a7a7;
    }

    .content {
        margin-left: 30px;
    }

`;
function formatDate(s) {
    let formatDate = '';
    if (s) {
        formatDate = formatRelative(new Date(s * 1000), new Date());
        formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
    }

    return formatDate;
}
const Message = ({ text, photoURL, displayName, createdAt }) => {

    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL} size='small'>
                    {photoURL ? '' : displayName?.chartAt(0).toUpperCase()}
                </Avatar>
                <Typography.Text className='author'>
                    {displayName}
                </Typography.Text>
                <Typography.Text className='date'>
                    {formatDate(createdAt?.seconds)}
                </Typography.Text>
            </div>
            <div>
                <Typography.Text className='content'>{text}</Typography.Text>
            </div>
        </WrapperStyled>
    );
};

export default Message;
