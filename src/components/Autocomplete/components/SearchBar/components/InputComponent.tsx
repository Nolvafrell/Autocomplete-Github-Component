import { InputUnstyled, InputUnstyledProps } from "@mui/base";
import { ForwardedRef, forwardRef } from "react";
import { StyledInputElement } from "./StyledInput";

export const InputComponent = forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});
