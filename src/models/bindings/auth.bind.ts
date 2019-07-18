import { UserProfile, } from '@loopback/authentication';

export type Credentials = {
  email: string;
  password: string;
};

export interface UserProfileExtended extends UserProfile {
  id: string;
  name?: string;
  email?: string;
  tipo_user?: number;
}
