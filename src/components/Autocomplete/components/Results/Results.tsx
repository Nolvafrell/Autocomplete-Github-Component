import { Grow } from "@mui/material";
import { FC } from "react";
import { useAutocompleteContext } from "../../context";
import { Loader, StyledWrapper } from "./components";

export const Results: FC = () => {
  const { isFetching, suggestions } = useAutocompleteContext();

  const letGrow = isFetching || !!suggestions;

  return (
    <Grow in={letGrow}>
      <StyledWrapper>{isFetching ? <Loader /> : "RESULTS"}</StyledWrapper>
    </Grow>
  );
};
