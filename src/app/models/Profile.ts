import { User } from './User';
import { Address } from './Address';

export interface UserProfile {
  user: User;
  address: Address;
  phone?: string;
  employer?: string;
  designation?: string;
  next_of_kin?: string;
  next_of_kin_contact?: string;
  bio?: string;
  level: string;
  image: string;
}

export interface UserProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  City: string;
  State: string;
  Street: string;
  image: string;
  phone?: string;
  employer?: string;
  designation?: string;
  nextOfKin?: string;
  nextOfKinContact?: string;
  bio?: string;
}
export interface UserProfileResponse {
  data: {
    profile: UserProfile;
    message: string;
  };
}

export interface UserProfileUpdatedResponse {
  data: {
    profile: UserProfile;
    message: string;
  };
}

export interface UserProfileUpdateErrorResponse {
  errors: {
    address?: any;
    phone?: any;
    employer?: any;
    designation?: any;
    next_of_kin?: any;
    next_of_kin_contact?: any;
  };
}
