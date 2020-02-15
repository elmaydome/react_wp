import React, {useState,useEffect} from 'react';
import {Button,Form,FormGroup,Label,Input,Alert,FormFeedback} from 'reactstrap';
import {APIURL2} from './Config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Redirect} from "react-router-dom";
import axios from 'axios';
const AddPost = () =>{
    const [Title, SetTitle] = useState('');
    const [PostContet, SetPostContet] = useState('');
    const [PostError, SetPostError] = useState('');
    const [PostMessage, SetPostMessage] = useState('');
    const [Created, SetCreated] = useState('');
    const [Token, SetToken] = useState('');
    const [UserID, SetUserID] = useState('');

    const formik = useFormik({
      initialValues: {
        post_Title: '',
      },
      validationSchema: Yup.object({
        post_Title: Yup.string()
            .min(15, 'Must be 15 characters and more ')
            .required('Required'),

        }),
        
      onSubmit: (values) => {
        handleSubmit(values)

      },
    });

  const handleSubmit = values => {
    // e.preventDefault();
    const Token = localStorage.getItem('token');
    const FormData = {
      title : values.post_Title,
      content : PostContet,
      status : 'publish'
    }
    axios.post(`${APIURL2}posts`, FormData, {
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${Token}`
      }
    })
    .then(res =>{
      SetPostMessage(res.data.id ? 'New Post created' : '')
      SetCreated(!! res.data.id);
      SetTitle('');
      SetPostContet('');
    })
    .catch(err =>{
      SetPostMessage(err.response.data.message)
      if(err.response.status === 403){
        SetPostMessage(err.response.data.message);
        localStorage.clear();
        return <Redirect to={"/login"} />
      }
    })
      
  }

  if(PostMessage){
  setTimeout(() => {
    SetPostMessage('');
    window.location.href = '/posts';
  }, 5000);
  
}
    return(
      <Form onSubmit={formik.handleSubmit}>
          {
            PostMessage ? 
            <Alert color="primary">
              {PostMessage}
            </Alert>
            :
            ''
          }
      <FormGroup>
        <Label for="post_Title">Post Title</Label>
        <Input type="text" name="post_Title" id="post_Title" placeholder="Post Title" value={formik.values.post_Title} placeholder="Page Title" invalid={formik.errors.post_Title && formik.touched.post_Title} onBlur={formik.handleBlur} onChange={formik.handleChange} />

        {formik.touched.post_Title && formik.errors.post_Title ? (
        <FormFeedback>{formik.errors.post_Title}</FormFeedback>
      ) : null}
      </FormGroup>
      <FormGroup>
        <Label for="Post_content">Post content</Label>
        <CKEditor 
                    editor={ ClassicEditor }
                    data={PostContet}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        SetPostContet(data)
                    } }
             
                />
      </FormGroup>
      <Button type="submit" disabled= {formik.isSubmitting === true || formik.isValid === false ? true : null}>Submit</Button>
    </Form>
    )
}

export default AddPost;