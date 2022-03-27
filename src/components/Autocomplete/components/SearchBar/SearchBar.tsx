import { FC } from "react";
import { useAutocompleteActionsContext } from "../../context";
import { InputComponent } from "./components/InputComponent";

export const SearchBar: FC = () => {
  const { changeAutocompleteValue, handleKeys } =
    useAutocompleteActionsContext();

  return (
    <>
      <InputComponent
        placeholder="Start search"
        onChange={changeAutocompleteValue}
        onKeyDown={handleKeys}
      />
    </>
  );
};
