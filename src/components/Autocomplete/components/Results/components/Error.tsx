import { FC } from "react";
import { useAutocompleteContext } from "../../../context";
import { StyledError } from "./StyledError";

export const Error: FC = () => {
  const { error } = useAutocompleteContext();

  return <StyledError>☠️ ERROR: {error?.message}</StyledError>;
};
