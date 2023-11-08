import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    name: Yup.string().required("Full name is required")
    .matches(/^[a-zA-Z_ ]*$/, "No special characters allowed")
    .min(2, "Name must be between 2 and 20 characters")
    .max(20, "name must be between 2 and 20 characters"),
    email: Yup.string().required("Email address is required").email("Invalid email address"), 
    status: Yup.string().max(100, "Status can not be more than 100 characters"),
    password: Yup.string().required("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,"Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special character(@$!%*?&)" )
})