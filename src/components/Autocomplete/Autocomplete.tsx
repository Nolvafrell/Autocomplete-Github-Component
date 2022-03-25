import { FC } from "react";
import { Results, SearchBar } from "./components";
import { AutocompleteContextProvider } from "./context";

const AutocompleteComponent: FC = () => {
  return (
    <>
      <SearchBar />
      <Results />
    </>
  );
};

export const Autocomplete: FC = () => (
  <AutocompleteContextProvider>
    <AutocompleteComponent />
  </AutocompleteContextProvider>
);
