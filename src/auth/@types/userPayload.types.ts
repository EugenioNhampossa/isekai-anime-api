export type userPayload = {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  refreshToken?: string;
  accessToken?: string;
};
