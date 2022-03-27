import { FC, useMemo } from "react";
import { useAutocompleteContext } from "../../../context";
import { ISuggestion, SuggestionType } from "../../../models";
import { Repo } from "./Repo";
import { StyledListElement } from "./StyledListElement";
import { User } from "./User";

export const List: FC = () => {
  const { suggestions, activeSuggestion } = useAutocompleteContext();

  const list = useMemo(
    () =>
      suggestions?.map((suggestion: ISuggestion, index: number) => (
        <StyledListElement key={index} isActive={activeSuggestion === index}>
          {suggestion.type === SuggestionType.user ? (
            <User {...suggestion} />
          ) : (
            <Repo {...suggestion} />
          )}
        </StyledListElement>
      )),
    [activeSuggestion, suggestions],
  );

  return <>{list}</>;
};
