import { Canceler } from "axios";
import { handleGetFromAPI } from "../helpers";
import { IRepoAPI, ISearchAPI, IUserAPI } from "../models";

export let cancelGithubFetching: Canceler;

const createAbortController = (c: Canceler) => (cancelGithubFetching = c);

class GithubService {
  async searchUsers(search: string) {
    const apiUrl: string = `/search/users?q=${search}&per_page=50`;
    return handleGetFromAPI<ISearchAPI<IUserAPI>>(
      apiUrl,
      createAbortController,
    );
  }

  async searchRepos(search: string) {
    const apiUrl: string = `/search/repositories?q=${search}&per_page=50`;
    return handleGetFromAPI<ISearchAPI<IRepoAPI>>(
      apiUrl,
      createAbortController,
    );
  }
}

export const githubService = new GithubService();
