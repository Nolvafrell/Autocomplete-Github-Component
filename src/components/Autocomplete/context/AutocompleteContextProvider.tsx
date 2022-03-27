import {
  createContext,
  useContext,
  FC,
  useMemo,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { githubService } from "../../../services";
import { useDebounce } from "../hooks";
import { ISuggestion } from "../models";
import { HandledKeyName } from "../models/front/keys.model";

interface IAutocompleteContext {
  isLoading: boolean;
  suggestions: ISuggestion[] | undefined;
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
  const [suggestions, setSuggestions] = useState<ISuggestion[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebounce(searchValue, 300);

  const changeAutocompleteValue: TChangeAutocompleteValue = (event) => {
    const search = event.currentTarget.value;

    !!search && search.length >= 3
      ? setSearchValue(event.currentTarget.value)
      : setSuggestions(undefined);
  };

  const handleKeys: THandleKeys = (event) => {
    switch (event.key) {
      case HandledKeyName.enter:
        console.log("pressed enter");
        break;
      case HandledKeyName.arrowUp:
        console.log("pressed arrow up");
        break;
      case HandledKeyName.arrowDown:
        console.log("pressed arrow down");
        break;
      default:
        break;
    }
  };

  const getSuggestions = useCallback(async (search: string) => {
    setIsLoading(true);

    const repos = await githubService.searchRepos(search);
    const users = await githubService.searchUsers(search);

    if (
      repos &&
      !(repos instanceof Error) &&
      users &&
      !(users instanceof Error)
    ) {
      console.log("xxx", repos, users);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (debouncedSearchValue) getSuggestions(debouncedSearchValue);
  }, [getSuggestions, debouncedSearchValue]);

  const values = useMemo(
    () => ({
      isLoading,
      suggestions,
    }),
    [isLoading, suggestions],
  );
  const actions = useMemo(
    () => ({
      changeAutocompleteValue,
      handleKeys,
    }),
    [],
  );

  return (
    <AutocompleteContext.Provider value={values}>
      <AutocompleteActionsContext.Provider value={actions}>
        {children}
      </AutocompleteActionsContext.Provider>
    </AutocompleteContext.Provider>
  );
};
