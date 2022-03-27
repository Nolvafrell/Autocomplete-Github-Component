import { IUserAPI, ISuggestion, SuggestionType } from "../models";

type TMapUserAPI = (api: IUserAPI[]) => ISuggestion[];

export const mapUserAPI: TMapUserAPI = (data) =>
  data.map((d: IUserAPI) => ({
    name: d.login,
    url: d.html_url,
    type: SuggestionType.user,
    gravatar: d.avatar_url,
  }));
