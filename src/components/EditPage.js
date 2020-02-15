import React, {useState,useEffect} from 'react';
import {Button,Form,FormGroup,Label,Input,Alert,FormFeedback} from 'reactstrap';
import {APIURL2} from './Config';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Redirect,useParams} from "react-router-dom";
import axios from 'axios';

const EditPages = () =>{
    const [Title, SetTitle] = useState('');
    const [PageContet, SetPageContet] = useState('');
    const [PageError, SetPageError] = useState('');
    const [PageMessage, SetPageMessage] = useState('');
    const [Created, SetCreated] = useState('');
    const {page_id} = useParams();
    useEffect( ()=>{
      let isSubscribed = true;
        axios.get(`${APIURL2}pages/${page_id}`)
        .then(res =>{
          //if (isSubscribed) {
            SetTitle(res.data.title.rendered)
            SetPageContet(res.data.content.rendered)
            //}
        })
        .catch(err =>{
         // if (isSubscribed) {
            SetPageError(err);
         // }
        })
        return () => isSubscribed = false
    },[])
    const handleSubmit = e => {
        e.preventDefault();
        const Token = localStorage.getItem('token');
        const FormData = {
          title : Title,
          content : PageContet,
          status : 'publish'
        }
        axios.post(`${APIURL2}pages/${page_id}`, FormData, {
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${Token}`
          }
        })
        .then(res =>{
          SetPageMessage(res.data.id ? ' Page updated' : '')
          SetCreated(!! res.data.id);
          SetTitle(res.data.title.rendered)
          SetPageContet(res.data.content.rendered)
        })
        .catch(err =>{
          
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

        }, 3000);
        
      }
    return(
        <Form onSubmit={handleSubmit}>
            {
              PageMessage ? 
              <Alert color="primary">
                {PageMessage}
              </Alert>
              :
              ''
            }
        <FormGroup>
          <Label for="Page_Title">Page Title</Label>
          <Input type="text" name="Page_Title" id="Page_Title" value={Title} placeholder="page Title"  onChange={e => {SetTitle(e.target.value)}} value={Title} />
        </FormGroup>
        <FormGroup>
          <Label for="Page_content">Page content</Label>
          <CKEditor 
                    editor={ ClassicEditor }
                    data={PageContet}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        SetPageContet(data)
                    } }
                />
        </FormGroup>
        <Button>Submit</Button>
      </Form>

      )

}
export default EditPages;