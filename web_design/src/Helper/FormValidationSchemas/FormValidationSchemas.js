import * as Yup from "yup";

export const LoginValidationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
};

export const RegisterValidationSchema = () => {
  return Yup.object({
    username: Yup.string().required("Username is required"),
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contact: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Contact number must be exactly 10 digits with no spaces or characters"
      )
      .required("Contact number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
};

export const UpdateProfileSchema = () => {
  return Yup.object({
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contact: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Contact number must be exactly 10 digits with no spaces or characters"
      )
      .required("Contact number is required"),
  });
};

export const ContactUsSchema = () => {
  return Yup.object({
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contact: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Contact number must be exactly 10 digits with no spaces or characters"
      )
      .required("Contact number is required"),
    subject: Yup.string()
      .min(3, "Subject must be at least 3 characters")
      .required("Subject is required"),
    message: Yup.string().min(5, "Message must be at least 10 characters"),
  });
};

// password: Yup.string()
//   .min(8, "Password must be at least 8 characters")
//   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//   .matches(/[0-9]/, "Password must contain at least one number")
//   .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
//   .required("Password is required"),
