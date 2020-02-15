import React, {useState} from 'react';
import {Button,Form,FormGroup,Label,Input,Alert,FormFeedback} from 'reactstrap';
import {APIURL2} from './Config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Redirect} from "react-router-dom";
import axios from 'axios';
const AddPages = () =>{
    const [Title, SetTitle] = useState('');
    const [PageContet, SetPageContet] = useState('');
    const [PostError, SetPageError] = useState('');
    const [PageMessage, SetPageMessage] = useState('');
    const [Created, SetCreated] = useState('');
    const [Token, SetToken] = useState('');
    const [UserID, SetUserID] = useState('');

    const formik = useFormik({
      initialValues: {
        page_Title: '',
      },
      validationSchema: Yup.object({
        page_Title: Yup.string()
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
      title : values.page_Title,
      content : PageContet,
      status : 'publish'
    }
    axios.post(`${APIURL2}pages`, FormData, {
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${Token}`
      }
    })
    .then(res =>{
      SetPageMessage(res.data.id ? 'New Page created' : '')
      SetCreated(!! res.data.id);
      // SetTitle('');
      // formik.setFieldValue('page_Title', '')
      // SetPageContet('');
    })
    .catch(err =>{
      SetPageMessage(err.response.data.message)
      if(err.response.status === 403){
        SetPageMessage(err.response.data.message);
        localStorage.clear();
        return <Redirect to={"/login"} />
      }
    })
      
  }

  if(PageMessage){
  setTimeout(() => {
    SetPageMessage('')
    window.location.href = '/pages';
  }, 5000);
  
}
    return(
      <Form onSubmit={formik.handleSubmit}>
          {
            PageMessage ? 
            <Alert color="primary">
              {PageMessage}
            </Alert>
            :
            ''
          }
      <FormGroup>
        <Label for="page_Title">Page Title</Label>
        <Input type="text" name="page_Title" id="page_Title" value={formik.values.page_Title} placeholder="Page Title" invalid={formik.errors.page_Title && formik.touched.page_Title} onBlur={formik.handleBlur} onChange={formik.handleChange} />

        {formik.touched.page_Title && formik.errors.page_Title ? (
        <FormFeedback>{formik.errors.page_Title}</FormFeedback>
      ) : null}

      </FormGroup>
      <FormGroup>
        <Label for="Post_content">Page content</Label>
        <CKEditor 
                    editor={ ClassicEditor }
                    data={PageContet}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        SetPageContet(data)
                    } }
             
                />
      </FormGroup>
      
      <Button type="submit" disabled= {formik.isSubmitting === true || formik.isValid === false ? true : null}>Submit</Button>
    </Form>

    )
}

export default AddPages;