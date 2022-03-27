import {
  createContext,
  useContext,
  FC,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { githubService } from "../../../services";
import { ISuggestion } from "../models";

interface IAutocompleteContext {
  suggestions: ISuggestion[] | undefined;
}
interface IAutocompleteActionsContext {
  updateAutocompleteValue: TUpdateAutocompleteValue;
}
type TUpdateAutocompleteValue = () => void;

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
  const [suggestions, setSuggestions] = useState();

  const updateAutocompleteValue: TUpdateAutocompleteValue = () => {
    console.log("OK");
  };

  const getRepos = useCallback(async () => {
    const repos = await githubService.searchRepos("auto");

    if (repos && !(repos instanceof Error)) {
      setSuggestions(repos);
    }
  }, []);

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  const values = useMemo(
    () => ({
      suggestions,
    }),
    [suggestions],
  );
  const actions = useMemo(
    () => ({
      updateAutocompleteValue,
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
