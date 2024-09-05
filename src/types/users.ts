import { OptionType } from "./options";

export type ClerkUserType = {
  firstName: string;
  lastName?: string;
  email: string;
  imgUrl?: string;
  externalUserId: string;
  isOnboardingRequired?: boolean;
};

export type LucidUserType = ClerkUserType & {
  id: string;
  genderId?: number;
  birthday?: string;
  supportOptions?: OptionType[];
};
