import { IRepoAPI, ISuggestion, SuggestionType } from "../models";

type TMapRepoAPI = (api: IRepoAPI[]) => ISuggestion[];

export const mapRepoAPI: TMapRepoAPI = (data) =>
  data.map((d: IRepoAPI) => ({
    name: d.name,
    url: d.html_url,
    type: SuggestionType.repo,
    owner: d.owner.login,
  }));
