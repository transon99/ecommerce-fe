import { RegisterOptions } from "react-hook-form";

type Rules = {
  [key in "email" | "password" | "confirm_password"]?: RegisterOptions;
};

export const rules: Rules = {
  email: {
    required: {
      value: true,
      message: "Email address is required",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Email is not true ",
    },
    maxLength: {
      value: 160,
      message: "Length 5 - 160 characters",
    },
    minLength: {
      value: 5,
      message: "Length 5 - 160 characters",
    },
  },
  password: {
    required: {
      value: true,
      message: "password is required",
    },
    maxLength: {
      value: 160,
      message: "Length 6 - 160 characters",
    },
    minLength: {
      value: 5,
      message: "Length 6 - 160 characters",
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: "confirm password is required",
    },
    maxLength: {
      value: 160,
      message: "Length 6 - 160 characters",
    },
    minLength: {
      value: 5,
      message: "Length 6 - 160 characters",
    },
  },
};
