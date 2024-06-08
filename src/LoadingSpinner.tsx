import React from 'react';
import { SyncLoader } from 'react-spinners';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.79);
  opacity: 0.33;
  z-index: 9999;
`;

const Message = styled.div`
  color: white;
  margin-bottom: 20px;
`;

const LoadingSpinner = () => {
  return (
    <Overlay>
      <LoadingContainer>
        <Message>잠시만 기다려주세요.</Message>
        <SyncLoader color="#ffffff" />
      </LoadingContainer>
    </Overlay>
  );
};

export default LoadingSpinner;
