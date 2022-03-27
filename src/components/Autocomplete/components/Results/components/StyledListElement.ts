import styled from "@emotion/styled";
import { blue, grey } from "@mui/material/colors";

interface StyledListElementProps {
  isActive: boolean;
}

export const StyledListElement = styled.div<StyledListElementProps>`
  padding: 10px 5px;
  border-radius: 5px;
  border-bottom: 1px solid ${grey[300]};
  transition: all 0.2s ease;

  ${(props) => props.isActive && `outline: 3px solid ${blue[600]};`};

  &:hover {
    background: ${grey[100]};
    border-color: ${grey[400]};
    cursor: pointer;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;
