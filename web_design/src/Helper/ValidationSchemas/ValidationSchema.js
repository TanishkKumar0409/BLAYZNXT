import * as Yup from "yup";

const BannerValidationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string()
      .max(500, "Message cannot exceed 500 characters")
      .notRequired(),
  });
};

export default BannerValidationSchema;
