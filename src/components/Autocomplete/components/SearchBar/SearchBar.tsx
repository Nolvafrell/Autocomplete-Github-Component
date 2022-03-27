import { FC } from "react";
import {
  useAutocompleteActionsContext,
  useAutocompleteContext,
} from "../../context";
import { InputComponent } from "./components/InputComponent";

export const SearchBar: FC = () => {
  const { searchValue } = useAutocompleteContext();
  const { changeAutocompleteValue, handleKeys } =
    useAutocompleteActionsContext();

  return (
    <>
      <InputComponent
        placeholder="Start search"
        value={searchValue}
        onChange={changeAutocompleteValue}
        onKeyDown={handleKeys}
      />
    </>
  );
};
