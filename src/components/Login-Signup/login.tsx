import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { UserLogin } from '../Auth/auth';
import { toggleAuthPage, store } from '../../redux/AuthPageReducer';

interface InitialValues {
  email: string,
  password: string
}


const Login = () => {

  const [error, setError] = useState<null | string>(null);

  const initialValues: InitialValues = {
    email: "",
    password: ""
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('email field is Required!'),
    password: Yup.string()
      .min(10, 'Password requires at least 10 characters!')
      .required('Password Field is Required!'),
  });


  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const loggedinUser = UserLogin(values.email, values.password)
          loggedinUser.then((user) => {
            // console.log("My User " + loggedinUser);
            store.dispatch(toggleAuthPage(false))
          }).catch((err) => {
            setError(err.message);
            values.email = ""
            values.password = ""
            console.log(err);
          })
        }}
      >
        {formik => (
          <Form className='form' autoComplete="off" >
            {error && <h6 style={{ color: "red" }}>{error}</h6>}
            <Field error={formik.errors.email && formik.touched.email} className="formFields" name="email" type="email" as={TextField} label="email" variant="outlined" helperText={<ErrorMessage name="email" />} /><br />
            <Field error={formik.errors.password && formik.touched.password} className="formFields" name="password" type="password" as={TextField} label="Password" variant="outlined" helperText={<ErrorMessage name="password" />} />
            <button type="submit" className='loginSignupButton'>Login</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;