import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .required("Name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const otpSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .matches(/^\d+$/, "OTP must contain only numbers")
    .required("OTP is required"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Enter a valid password"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const profileSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .matches(
      /^(?!\s*$)[a-zA-Z\s]+$/,
      "Name can only contain letters and spaces"
    )
    .required("Name is required"),
  headline: Yup.string()
    .trim()
    .min(5, "Headline must be at least 5 characters")
    .max(60, "Headline must be at most 60 characters")
    .matches(
      /^(?!\s*$)(?=.*[a-zA-Z])[\w\s.,'@*(){}[\]\\/|&-]+$/,
      "Headline must contain at least one letter and can include spaces, commas, dots, hyphens, apostrophes, @, *, (), {}, [], &, \\ or /"
    ),
  bio: Yup.string()
    .trim()
    .min(5, "Bio must be at least 5 characters")
    .max(200, "Bio must be at most 200 characters")
    .matches(
      /^(?!\s*$)(?=.*[a-zA-Z])[\w\s.,'@*(){}[\]\\/|&#-]+$/,
      "Bio must contain at least one letter and can include spaces, commas, dots, hyphens, apostrophes, @, *, (), {}, [], \\ or /"
    ),
  links: Yup.array()
    .of(
      Yup.string()
        .trim()
        .url("Each link must be a valid URL")
        .required("Link is required")
    )
    .max(3, "You can add up to 3 links"),
  techInterests: Yup.array().max(20, "You can add up to 20 tech interests"),
  avatar: Yup.string()
});
