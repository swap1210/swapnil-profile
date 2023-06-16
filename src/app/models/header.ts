import { Logo } from './logo';

export interface Header {
  appIconLink: string;
  appDesc: string[];
  appName: string;
  linkedin: Logo;
  github: Logo;
  phone: { link: string; value: string };
  email: { link: string; value: string };
}
