import { FC } from "react";
import { useAutocompleteContext } from "../../context";

export const Results: FC = () => {
  const { isLoading } = useAutocompleteContext();

  return <>{isLoading ? "LOADING" : "RESULTS"}</>;
};
