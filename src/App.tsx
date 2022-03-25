import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { FC } from "react";
import { Autocomplete } from "./components";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #8e2de2;
  background: -webkit-linear-gradient(to right, #4a00e0, #8e2de2);
  background: linear-gradient(to right, #4a00e0, #8e2de2);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App: FC = () => {
  return (
    <PageWrapper>
      <Container>
        <Typography variant="h4" gutterBottom>
          GitHub Autocomplete Search
        </Typography>
        <Autocomplete />
      </Container>
    </PageWrapper>
  );
};

export default App;
