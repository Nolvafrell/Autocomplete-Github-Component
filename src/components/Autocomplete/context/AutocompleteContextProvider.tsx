import {
  createContext,
  useContext,
  FC,
  useMemo,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  SyntheticEvent,
} from "react";
import { openInNewTab } from "../helpers";
import { useSuggestions } from "../hooks";
import { ISuggestion, HandledKeyName } from "../models";

interface IAutocompleteContext {
  isFetching: boolean;
  activeSuggestion: number;
  suggestions?: ISuggestion[];
  searchValue?: string;
  error?: Error;
}
interface IAutocompleteActionsContext {
  changeAutocompleteValue: TChangeAutocompleteValue;
  handleKeys: THandleKeys;
  handleOpenResult: THandleOpenResult;
}
type TChangeAutocompleteValue = (event: ChangeEvent<HTMLInputElement>) => void;
type THandleKeys = (event: KeyboardEvent<HTMLInputElement>) => void;
type THandleOpenResult = (
  event: SyntheticEvent<HTMLDivElement>,
) => (url: string, name: string) => void;

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

  const {
    isFetching,
    suggestions,
    activeSuggestion,
    setActiveSuggestion,
    error,
  } = useSuggestions(searchValue);

  const changeAutocompleteValue: TChangeAutocompleteValue = (event) => {
    const search = event.currentTarget.value;

    !!search && search.length >= 3
      ? setSearchValue(event.currentTarget.value)
      : setSearchValue(undefined);
  };

  const handleOpenResult: THandleOpenResult = useCallback(
    (event) => (url, name) => {
      openInNewTab(url);
      setSearchValue(name);
    },
    [],
  );

  const handleKeys: THandleKeys = useCallback(
    (event) => {
      if (suggestions)
        switch (event.key) {
          case HandledKeyName.enter:
            handleOpenResult(event)(
              suggestions[activeSuggestion].url,
              suggestions[activeSuggestion].name,
            );
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
    [activeSuggestion, handleOpenResult, setActiveSuggestion, suggestions],
  );

  const values = useMemo(
    () => ({
      isFetching,
      suggestions,
      activeSuggestion,
      searchValue,
      error,
    }),
    [activeSuggestion, error, isFetching, searchValue, suggestions],
  );
  const actions = useMemo(
    () => ({
      changeAutocompleteValue,
      handleKeys,
      handleOpenResult,
    }),
    [handleKeys, handleOpenResult],
  );

  return (
    <AutocompleteContext.Provider value={values}>
      <AutocompleteActionsContext.Provider value={actions}>
        {children}
      </AutocompleteActionsContext.Provider>
    </AutocompleteContext.Provider>
  );
};
