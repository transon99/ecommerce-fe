interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  status: string;
  type: string;
  fullName: string;
  role: string;
  userId: string;
}

interface LoginResquest {
  email: string;
  password: string;
}

interface SocialLoginResquest {
  socialAccessToken: string;
}
