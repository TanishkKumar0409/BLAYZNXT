import * as Yup from "yup";

const username = Yup.string()
  .matches(/^\S+$/, "No spaces allowed")
  .required("Username is required");

const name = Yup.string()
  .trim()
  .matches(
    /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    "Name must contain only letters and single spaces between words"
  )
  .required("Name is required");

const email = Yup.string()
  .trim()
  .strict(true)
  .email("Invalid email format")
  .required("Email is required");
const contact = Yup.number().required("Contact number is required");

const address = Yup.string()
  .trim("No leading or trailing spaces allowed")
  .required("Address is required")
  .min(3, "Address must be at least 3 characters long")
  .max(100, "Address must be less than 100 characters")
  .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/, "Address contains invalid characters");

const pincode = Yup.number().required("Pincode is required");

const city = Yup.string()
  .trim("No leading or trailing spaces allowed")
  .required("City is required");

const state = Yup.string()
  .trim("No leading or trailing spaces allowed")
  .required("State is required");

const country = Yup.string()
  .trim("No leading or trailing spaces allowed")
  .required("Country is required");

const password = Yup.string()
  .trim("No leading or trailing spaces allowed")
  .matches(/^\S*$/, "Password cannot contain spaces")
  .min(6, "Password must be at least 6 characters long")
  .required("Password is required");

const confirm_password = Yup.string()
  .trim("No leading or trailing spaces allowed")
  .matches(/^\S*$/, "Confirm password cannot contain spaces")
  .min(6, "Confirm password must be at least 6 characters long")
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Confirm password is required");

const otp = Yup.array()
  .of(
    Yup.string()
      .length(1, "OTP must be exactly 6 digits")
      .matches(/[0-9]/, "OTP must be a number")
  )
  .length(6, "OTP must be exactly 6 digits");

export const LoginValidation = Yup.object({
  email,
  password,
});

export const RegistreValidation = Yup.object({
  username,
  name,
  email,
  contact,
  password,
  confirm_password,
});

export const UpdateUserValidation = Yup.object({
  username,
  name,
  email,
  contact,
  address,
  pincode,
  city,
  state,
  country,
});

export const VerifyOptValidation = Yup.object({
  otp,
});

export const UploadValidation = Yup.object({
  email,
});

export const PasswordValidation = Yup.object({ password, confirm_password });

export const contactValidation = Yup.object({
  name,
  email,
  phone: contact,
});

export const LegalValidation = Yup.object({
  legal_description: Yup.string().required("Legal Content is required"),
});
