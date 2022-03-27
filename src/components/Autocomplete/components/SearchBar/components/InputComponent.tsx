import { InputUnstyled, InputUnstyledProps } from "@mui/base";
import { ForwardedRef, forwardRef } from "react";
import { StyledInput } from "./StyledInput";

export const InputComponent = forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <InputUnstyled components={{ Input: StyledInput }} {...props} ref={ref} />
  );
});
