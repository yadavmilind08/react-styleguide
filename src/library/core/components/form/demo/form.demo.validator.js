import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  // isRead: Yup.string().required(),
  // dob: Yup.string().required(),
  // name: Yup.string().required('Name is required'),
  firstName: Yup.string()
    .nullable()
    .label("First Name")
    .required("First Name is required"),
  lastName: Yup.string().nullable().required("Last Name is required"),
  gender: Yup.object().nullable().required("Gender is required"),
  cities: Yup.object().nullable().required("Cities is required"),
  clientName: Yup.string().nullable().required("Client Name is required"),
  dob: Yup.string().nullable().required("DOB is required"),
  // cities: Yup.object().shape({
  //     name: Yup.string(),
  //     a: Yup.number().min(2),
  // }).required(),
  // email: Yup.string()
  //     .email('Email is invalid')
  //     .required('Email is required'),
  // password: Yup.string()
  //     .min(6, 'Password must be at least 6 characters')
  //     .required('Password is required'),
  // confirmPassword: Yup.string()
  //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //     .required('Confirm Password is required'),
  // claims: yup.array().of(
  //     yup.object().shape({
  //         name:yup.string().required().label("Claim Name").ensure(),
  //     })
  // ).min(1).ensure(),
});
