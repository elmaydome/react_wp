import React, {useState} from 'react';
import { Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import {SiteURL} from './Config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Redirect} from "react-router-dom";
const Login = () => {

    const [UserEmail, SetUserEmail] = useState(''),
         [NiceName, SetNiceName] = useState(''),
         [Logged, SetLogged] = useState(false),
         [Loading, SetLoading] = useState(false),
         [Token, SetToken] = useState(''),
         [Errord, SetError] = useState('');
         

         const formik = useFormik({
            initialValues: {
              username: '',
              password:'',
            },
            validationSchema: Yup.object({
                username: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .required('Required'),
                password: Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .required('Required'),

              }),
              
            onSubmit: (values) => {
                HandleSubmit(values)
 
            },
          });


    const HandleSubmit = (values) =>{
        const loginData = {
            username:values.username,
            password:values.password,
        }

        axios.post(`${SiteURL}wp-json/jwt-auth/v1/token`,loginData)
        .then( res =>{
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('Email', res.data.user_email);
            localStorage.setItem('Username', res.data.user_nicename);
            SetToken(res.data.token);
            SetUserEmail(res.data.user_email);
            SetNiceName(res.data.user_nicename);
            SetLogged(true);
        })
        .catch(err =>{
            SetError(err.response.data.message);
            formik.setSubmitting(false);
        })
    }

    if (Logged === true || localStorage.getItem('token')){
        return <Redirect to={"/dashboard"} />
        
    }else{
        return(
            <Form onSubmit={formik.handleSubmit}>
        <div>
            {Errord ?
            <p className="alert alert-danger" dangerouslySetInnerHTML={{__html:Errord}}>
            </p>
            : ''}
        </div>
              <FormGroup>
                <Input invalid={formik.errors.username && formik.touched.username} onBlur={formik.handleBlur} onChange={formik.handleChange}
                value={formik.values.username} type="text"  name="username" id="username" placeholder="UserName" />
                {formik.touched.username && formik.errors.username ? (
        <FormFeedback>{formik.errors.username}</FormFeedback>
      ) : null}
              </FormGroup>
              <FormGroup> 
                <Input invalid={formik.errors.password && formik.touched.password} onBlur={formik.handleBlur} onBlur={formik.handleBlur} type="password" onChange={formik.handleChange} value={formik.values.password}  name="password" id="Password" placeholder="Password" />
                {formik.touched.password && formik.errors.password ? (
        <FormFeedback>{formik.errors.password}</FormFeedback>
      ) : null}
              </FormGroup>  
              
              <Button type="submit" disabled= {formik.isSubmitting === true ||  formik.isValid === false ? true : null}>Submit</Button>
            </Form>
            
            )
    }

}


export default Login;