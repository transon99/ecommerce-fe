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

interface RegisterResquest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SocialLoginResquest {
  socialAccessToken: string;
}
