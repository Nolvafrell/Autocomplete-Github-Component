import {
  createContext,
  useContext,
  FC,
  useMemo,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { useSuggestions } from "../hooks";
import { ISuggestion } from "../models";
import { HandledKeyName } from "../models/front/keys.model";

interface IAutocompleteContext {
  isFetching: boolean;
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
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

  const [searchValue, setSearchValue] = useState<string>();

  const { isFetching, suggestions } = useSuggestions(searchValue);

  const changeAutocompleteValue: TChangeAutocompleteValue = (event) => {
    const search = event.currentTarget.value;

    !!search && search.length >= 3
      ? setSearchValue(event.currentTarget.value)
      : setSearchValue(undefined);
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

  const values = useMemo(
    () => ({
      isFetching,
      suggestions,
    }),
    [isFetching, suggestions],
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
