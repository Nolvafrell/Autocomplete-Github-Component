import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";

export const StyledWrapper = styled.div`
  position: absolute;
  top: 60px;
  min-width: 320px;
  max-width: 50vw;
  max-height: 40vh;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  color: ${grey[800]};
  background: ${grey[200]};
  border: none;
  border-radius: 10px;
  padding: 15px 10px;
  margin-top: 15px;
  transition: all 0.2s ease;
  overflow: auto;
`;
