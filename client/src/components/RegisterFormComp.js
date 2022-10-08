import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { registerUser } from '../api/api';
import { request } from "https";


// Component to register user
const RegisterFormComp = () => {

  //Regular expressions, for form validation
  const regularExpressions = {
    firstNameLastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Letters, numbers. hyphen and underscore
    emali: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$/,
  };

  //Initial values ​​of the form
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  //Function to validate the form
  const formValidation = (values) => {
    const errors = {};

    //we verify that values.firstName complies with the regular expression
    if (!regularExpressions.firstNameLastName.test(values.firstName)) errors.firstName = 'This field must have only letters and spaces';

    //we verify that values.lastname complies with the regular expression
    if (!regularExpressions.firstNameLastName.test(values.lastName)) errors.lastName = 'The field must have only letters and spaces';

    //we verify that values.email complies with the regular expression
    if (regularExpressions.firstNameLastName.test(values.email)) errors.email = 'The email must contain letters, numbers, periods, hyphens and underscores';

    //we verify that values.password meets the condition
    if (values.password.length <= 5) errors.password = 'Password must be more than 5 digits';

    //we return the error
    return errors;
  };

  // function to send the form
  const handleSubmit = (values) => {

    //validating that the passwords are the same
    if (values.password !== values.confirmPassword) return alert('Passwords do not match');

    //creating the user model
    const user = {
      fullName: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password
    };

    //function to call the api
    const createUser = async (newUser) => {
      try {
        // Getting the response from the api
        const response = await registerUser(newUser);

        alert(response);
      } catch (error) {
        //error
        alert(error.message);
      }
    };

    //activando la funcion
    createUser(user);
  };


  return (
    <div className="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Register</h5>
              <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={formValidation} >
                <Form>
                  <Field name='firstName' type='text' id='firstName' className='form-control' placeholder='First name' required />
                  <ErrorMessage name='firstName' component='span' className='text-danger' />
                  <Field name='lastName' type='text' id='lastName' className='form-control mt-3' placeholder='lastName name' required />
                  <ErrorMessage name='lastName' component='span' className='text-danger' />
                  <Field name='email' type='email' id='email' className='form-control mt-3' placeholder='Email' required />
                  <ErrorMessage name='email' component='span' className='text-danger' />
                  <Field name='password' type='password' id='password' className='form-control mt-3' placeholder='Password' required />
                  <ErrorMessage name='password' component='span' className='text-danger' />
                  <Field name='confirmPassword' type='password' id='confirmPassword' className='form-control mt-3' placeholder='Confirm password' required />
                  <button type='submit' className='btn btn-lg btn-primary btn-block mt-3' >Register</button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormComp;

//THE FORMIK LIBRARY WAS USED FOR THE FORM, YOU CAN FIND THE DOCUMENTATION ON ITS PAGE https://formik.org/



//CONTRIBUTION: AndresH11 https://github.com/AndresH11/