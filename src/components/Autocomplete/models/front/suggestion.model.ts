export enum SuggestionType {
  user = "user",
  repo = "repo",
}

export type TSuggestionTypes = keyof typeof SuggestionType;

export interface ISuggestion
  extends Partial<IUserSuggestion>,
    Partial<IRepoSuggestion> {
  name: string;
  url: string;
  type: TSuggestionTypes;
}

interface IUserSuggestion {
  gravatar: string;
}

interface IRepoSuggestion {
  owner: string;
}
