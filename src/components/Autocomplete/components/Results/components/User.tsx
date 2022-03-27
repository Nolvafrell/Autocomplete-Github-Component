import { Avatar, Box } from "@mui/material";
import { FC } from "react";
import { useAutocompleteActionsContext } from "../../../context";
import { ISuggestion } from "../../../models";

interface UserProps extends Pick<ISuggestion, "name" | "gravatar" | "url"> {}

export const User: FC<UserProps> = ({ name, gravatar, url }) => {
  const { handleOpenResult } = useAutocompleteActionsContext();

  return (
    <Box display="flex" onClick={(event) => handleOpenResult(event)(url, name)}>
      <Box mr="10px">
        <Avatar alt={name} src={gravatar} sx={{ width: 24, height: 24 }} />
      </Box>
      USER: <b>{name}</b>
    </Box>
  );
};
