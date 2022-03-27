import { FC } from "react";
import { ToastContainer } from "react-toastify";
import { Results, SearchBar, Wrapper } from "./components";
import { AutocompleteContextProvider } from "./context";

import "react-toastify/dist/ReactToastify.css";

const AutocompleteComponent: FC = () => {
  return (
    <Wrapper>
      <SearchBar />
      <Results />
    </Wrapper>
  );
};

export const Autocomplete: FC = () => (
  <AutocompleteContextProvider>
    <ToastContainer />
    <AutocompleteComponent />
  </AutocompleteContextProvider>
);
