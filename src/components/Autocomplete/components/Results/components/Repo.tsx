import { FC } from "react";
import { useAutocompleteActionsContext } from "../../../context";
import { ISuggestion } from "../../../models";

interface RepoProps extends Pick<ISuggestion, "name" | "owner" | "url"> {}

export const Repo: FC<RepoProps> = ({ url, name, owner }) => {
  const { handleOpenResult } = useAutocompleteActionsContext();

  return (
    <div onClick={(event) => handleOpenResult(event)(url, name)}>
      📦 REPO: <b>{name}</b> (<i>by: {owner}</i>)
    </div>
  );
};
