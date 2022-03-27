import {
  createContext,
  useContext,
  FC,
  useMemo,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useCallback,
} from "react";
import { useSuggestions } from "../hooks";
import { ISuggestion, HandledKeyName } from "../models";

interface IAutocompleteContext {
  isFetching: boolean;
  activeSuggestion: number;
  suggestions?: ISuggestion[];
  searchValue?: string;
}
interface IAutocompleteActionsContext {
  changeAutocompleteValue: TChangeAutocompleteValue;
  handleKeys: THandleKeys;
}
type TChangeAutocompleteValue = (event: ChangeEvent<HTMLInputElement>) => void;
type THandleKeys = (event: KeyboardEvent<HTMLInputElement>) => void;

const AutocompleteContext = createContext<IAutocompleteContext>(
  {} as IAutocompleteContext,
);
const AutocompleteActionsContext = createContext<IAutocompleteActionsContext>(
  {} as IAutocompleteActionsContext,
);

export const useAutocompleteContext = () => useContext(AutocompleteContext);
export const useAutocompleteActionsContext = () =>
  useContext(AutocompleteActionsContext);

export const AutocompleteContextProvider: FC = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>();

  const { isFetching, suggestions, activeSuggestion, setActiveSuggestion } =
    useSuggestions(searchValue);

  const changeAutocompleteValue: TChangeAutocompleteValue = (event) => {
    const search = event.currentTarget.value;

    !!search && search.length >= 3
      ? setSearchValue(event.currentTarget.value)
      : setSearchValue(undefined);
  };

  const handleKeys: THandleKeys = useCallback(
    (event) => {
      if (suggestions)
        switch (event.key) {
          case HandledKeyName.enter:
            window.open(suggestions[activeSuggestion].url, "_blank");
            setSearchValue(suggestions[activeSuggestion].name);
            break;
          case HandledKeyName.arrowUp:
            if (activeSuggestion === 0) {
              return;
            }
            setActiveSuggestion(activeSuggestion - 1);
            break;
          case HandledKeyName.arrowDown:
            if (activeSuggestion === suggestions?.length) {
              return;
            }
            setActiveSuggestion(activeSuggestion + 1);
            break;
          default:
            break;
        }
    },
    [activeSuggestion, setActiveSuggestion, suggestions],
  );

  const values = useMemo(
    () => ({
      isFetching,
      suggestions,
      activeSuggestion,
      searchValue,
    }),
    [activeSuggestion, isFetching, searchValue, suggestions],
  );
  const actions = useMemo(
    () => ({
      changeAutocompleteValue,
      handleKeys,
    }),
    [handleKeys],
  );

  return (
    <AutocompleteContext.Provider value={values}>
      <AutocompleteActionsContext.Provider value={actions}>
        {children}
      </AutocompleteActionsContext.Provider>
    </AutocompleteContext.Provider>
  );
};
