import { styled } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export const StyledInput = styled("input")(
  () => `
    font-family: inherit;
    min-width: 320px;
    max-width: 50vw;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.5;
    color: ${grey[800]};
    background: ${grey[200]};
    border: none;
    border-radius: 10px;
    padding: 15px 15px;
    transition: all 0.2s ease;
  
    &:hover {
      background: ${grey[100]};
      border-color: ${grey[400]};
    }
  
    &:focus {
      outline: 3px solid ${blue[600]};
    }
  `,
);
