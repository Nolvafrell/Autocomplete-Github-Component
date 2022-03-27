import { useCallback, useEffect, useState } from "react";
import { githubService } from "../../../services";
import { mapRepoAPI } from "../helpers";
import { mapUserAPI } from "../helpers/mapUserAPI.helper";
import { IRepoAPI, ISearchAPI, ISuggestion, IUserAPI } from "../models";
import { useDebounce } from "./useDebouce";

type TUseSuggestions = (search: string | undefined) => IReturn;
type TModelApiData = (
  repos: ISearchAPI<IRepoAPI>,
  users: ISearchAPI<IUserAPI>,
) => ISuggestion[];
interface IReturn {
  isFetching: boolean;
  suggestions: ISuggestion[] | undefined;
}

export const useSuggestions: TUseSuggestions = (search) => {
  const [suggestions, setSuggestions] = useState<ISuggestion[]>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const debouncedSearchValue = useDebounce(search, 300);

  const getSuggestions = useCallback(async (search: string) => {
    setIsFetching(true);

    const repos = await githubService.searchRepos(search);
    const users = await githubService.searchUsers(search);

    if (
      repos &&
      !(repos instanceof Error) &&
      users &&
      !(users instanceof Error)
    ) {
      setSuggestions(modelApiData(repos, users));
    }

    setIsFetching(false);
  }, []);

  const modelApiData: TModelApiData = (repos, users) => {
    let suggestions: ISuggestion[] = [];

    if (repos) {
      suggestions = [...suggestions, ...mapRepoAPI(repos.items)];
    }

    if (users) {
      suggestions = [...suggestions, ...mapUserAPI(users.items)];
    }

    suggestions.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
    );

    return suggestions;
  };

  useEffect(() => {
    console.log("xxx", debouncedSearchValue);
    debouncedSearchValue && debouncedSearchValue !== ""
      ? getSuggestions(debouncedSearchValue)
      : setSuggestions(undefined);
  }, [getSuggestions, debouncedSearchValue]);

  return { isFetching, suggestions };
};
