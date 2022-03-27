import { Grow } from "@mui/material";
import { FC, useMemo } from "react";
import { useAutocompleteContext } from "../../context";
import { List, Loader, StyledWrapper } from "./components";

export const Results: FC = () => {
  const { isFetching, suggestions } = useAutocompleteContext();

  const letGrow = isFetching || !!suggestions;

  const list = useMemo(
    () => (isFetching ? <Loader /> : <List />),
    [isFetching],
  );

  return (
    <Grow in={letGrow}>
      <StyledWrapper>{list}</StyledWrapper>
    </Grow>
  );
};
