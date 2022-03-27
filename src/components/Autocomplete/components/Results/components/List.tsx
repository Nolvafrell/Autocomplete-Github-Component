import { FC, useMemo } from "react";
import { useAutocompleteContext } from "../../../context";
import { ISuggestion } from "../../../models";
import { StyledListElement } from "./StyledListElement";

export const List: FC = () => {
  const { suggestions, activeSuggestion } = useAutocompleteContext();

  const list = useMemo(
    () =>
      suggestions?.map((suggestion: ISuggestion, index: number) => (
        <StyledListElement key={index}>
          {activeSuggestion === index ? "+++" : ""}
          {suggestion.name}
        </StyledListElement>
      )),
    [activeSuggestion, suggestions],
  );

  return <>{list}</>;
};
