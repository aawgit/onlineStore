import React, { Component } from "react";
import Facebook from "./Facebook";
import { Formik, Form, Field } from 'formik'
import { loginUser } from "../api/api";


//Initial values ​​of the form
const initialValues = {
  email: '',
  password: '',
};

// function to log
const handleSubmit = (values) => {

  //Creating the user model
  const user = {
    email: values.email,
    password: values.password
  };

  //function to call the api
  const login = async (newUser) => {
    try {
      // Getting the response from the api
      const response = await loginUser(newUser);

      alert(response.message);
    } catch (error) {
      //error
      alert(error.message);
    }
  };

  //activating the function
  login(user);
};

const LoginFormComp = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <Formik onSubmit={handleSubmit} initialValues={initialValues} >
                <Form>
                  <Field name='email' type='email' id='email' className='form-control mt-3' placeholder='Email' required />
                  <Field name='password' type='password' id='password' className='form-control mt-3' placeholder='Password' required />
                  <div className='checkbox mt-3'>
                    <label>
                      <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                  </div>
                  <button type='submit' className='btn btn-lg btn-primary btn-block mt-3' >Sign in</button>
                  <div style={{ textAlign: "center" }}>
                    <p className='mt-3'>Or</p>
                    <Facebook />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//PLEASE CHECK THE FACEBOOK LOGIN, IF IT HAS FAULTS PLEASE FIX IT

export default LoginFormComp;

//THE FORMIK LIBRARY WAS USED FOR THE FORM, YOU CAN FIND THE DOCUMENTATION ON ITS PAGE https://formik.org/

//CONTRIBUTION: AndresH11 https://github.com/AndresH11/