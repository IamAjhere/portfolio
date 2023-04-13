export interface IRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  homepage: string;
}
export interface IProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  portfolioData: PortfolioData;
}

export interface PortfolioData {
  about: {
    job_title: string;
    description: string;
  };
  skills: {
    [category: string]: string[];
  };
}

export interface ILeetSkills {
  advanced: ISkill[];
  intermediate: ISkill[];
  fundamental: ISkill[];
}

export interface ISkill {
  tagName: string;
  problemsSolved: number;
}
