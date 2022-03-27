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
import { ISuggestion } from "../models";
import { HandledKeyName } from "../models/front/keys.model";

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
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

  const [searchValue, setSearchValue] = useState<string>();

  const { isFetching, suggestions } = useSuggestions(searchValue);

  const changeAutocompleteValue: TChangeAutocompleteValue = (event) => {
    const search = event.currentTarget.value;

    !!search && search.length >= 3
      ? setSearchValue(event.currentTarget.value)
      : setSearchValue(undefined);
  };

  const handleKeys: THandleKeys = useCallback(
    (event) => {
      const suggestion = activeSuggestion;
      if (suggestions)
        switch (event.key) {
          case HandledKeyName.enter:
            console.log("pressed enter");

            console.log("xxx - go to", suggestions[suggestion].url);

            setSearchValue(suggestions[suggestion].name);

            break;
          case HandledKeyName.arrowUp:
            if (suggestion === 0) {
              return;
            }
            setActiveSuggestion(suggestion - 1);
            break;
          case HandledKeyName.arrowDown:
            if (suggestion === suggestions?.length) {
              return;
            }
            setActiveSuggestion(suggestion + 1);
            break;
          default:
            break;
        }
    },
    [activeSuggestion, suggestions],
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
