import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { UserSignup } from '../Auth/auth';
import { toggleAuthPage, store } from '../../redux/AuthPageReducer';
import {getAuth, updateProfile } from "firebase/auth";
import app from 'gatsby-plugin-firebase-v9.0';


interface InitialValues {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
}


const Signup = () => {

  const [AuthError, setAuthError] = useState<null | string>(null);
  const auth = getAuth();

  const initialValues: InitialValues = {
    firstName: "",
    lastName: "",
    email :"",
    password: "",
    confirmPassword: ""
  }

  const validationSchema = Yup.object().shape({
      firstName: Yup.string()
          .max(20, 'First Name can only have 20 characters.')
          .required('Required'),
      lastName: Yup.string()
          .max(20, 'Last Name can on ly have 20 characters.')
                .required('Required'),
      email: Yup.string()
          .email('Invalid email address')
          .required('email field is Required!'),
      password: Yup.string()
          .min(10, 'Password requires at least 10 characters!')
          .required('Password Field is Required!'),
      confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Password must match as given above!')
          .required('Confirm Password Field is Required!')          
  });


  return(
    <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const signedupUser = UserSignup(values.email, values.password)
                    signedupUser.then((res) => {
                      updateProfile(res.user, {
                        displayName: values.firstName +" "+ values.lastName
                      }).then(() => {
                        console.log(auth.currentUser?.displayName);
                        store.dispatch(toggleAuthPage(false));
                      }).catch((error) => {
                        setAuthError(error.message);
                        console.log(error.message);
                      })
                    }).catch((error) => {
                      setAuthError(error.message);
                      console.log(error.message)
                    })
                    
                    // signedupUser.then((user) => {
                    //   if(user !== null){
                    //     updateUserProfile(values.firstName + " " + values.lastName)
                    //   }
                    //   // console.log("My User " + user);
                    //   store.dispatch(toggleAuthPage(false))
                    // }).catch((err)=>{
                    //   setAuthError(err.message);
                    //   values.firstName = "";
                    //   values.lastName = "";
                    //   values.email = "";
                    //   values.password = "";
                    //   values.confirmPassword = "";
                    //   console.log(err)
                    // })  
                }}
            >
                {formik => (
                    <Form className='form' autoComplete="off">
                        {AuthError && <p style={{ color: "red" }}>{AuthError}</p>}
                        <Field error={formik.errors.firstName && formik.touched.firstName} className="formFields" name="firstName" type="text" as={TextField} label="First Name" variant="outlined" helperText={<ErrorMessage name="firstName"/>} />
                        <Field error={formik.errors.lastName && formik.touched.lastName} className="formFields" name="lastName" type="text" as={TextField} label="Last Name" variant="outlined" helperText={<ErrorMessage name="lastName"/>} />
                        <Field error={formik.errors.email && formik.touched.email} className="formFields" name="email" type="email" as={TextField} label="email" variant="outlined" helperText={<ErrorMessage name="email"/>} />
                        <Field error={formik.errors.password && formik.touched.password} className="formFields" name="password" type="password" as={TextField} label="Password" variant="outlined" helperText={<ErrorMessage name="password"/>} />
                        <Field error={formik.errors.confirmPassword && formik.touched.confirmPassword} className="formFields" name="confirmPassword" type="password" as={TextField} label="Confirm Password" variant="outlined" helperText={<ErrorMessage name="confirmPassword"/>} />
                        <div className='formButtons'>
                            <button type="submit" className='loginSignupButton'>Sign Up</button>
                        </div>    
                    </Form>
                )}
            </Formik>
        </>
  );
}

export default Signup;