import styled from 'styled-components';
import TableContents from 'TableContents';

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function App() {
  return (
    <MainContainer>
      <TableContents />
    </MainContainer>
  );
}

export default App;
