import React, {useState,useEffect} from 'react';
import {Button,Form,FormGroup,Label,Input,Alert, FormFeedback} from 'reactstrap';
import {APIURL2} from './Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Redirect,useParams} from "react-router-dom";
import axios from 'axios';

const EditPost = () =>{
    const [Title, SetTitle] = useState('');
    const [PostContet, SetPostContet] = useState('');
    const [PostError, SetPostError] = useState('');
    const [PostMessage, SetPostMessage] = useState('');
    const [Created, SetCreated] = useState('');
    const [Token, SetToken] = useState('');
    const {postid} = useParams();
    
    useEffect( ()=>{
        axios.get(`${APIURL2}posts/${postid}`)
        .then(res =>{
            SetTitle(res.data.title.rendered)
            SetPostContet(res.data.content.rendered)
        })
        .catch(err =>{
            SetPostError(err);
        })
    },[])



    const handleSubmit = (e) => {
      e.preventDefault();
        const Token = localStorage.getItem('token');
        const FormData = {
          title : Title,
          content : PostContet,
          status : 'publish'
        }
        axios.post(`${APIURL2}posts/${postid}`, FormData, {
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${Token}`
          }
        })
        
        .then(res =>{
          SetPostMessage(' Post updated')
          SetCreated(!! res.data.id);
          SetTitle(res.data.title.rendered)
          SetPostContet(res.data.content.rendered)
        })
        .catch(err =>{
          SetPostMessage(err.response.data.message)
        })
          
      }

      if(PostMessage != ""){
        // setTimeout(() => {
        //   SetPostMessage('')
        //   window.location.href = '/posts';

        // }, 8000);
        
      }
    return(
        <Form onSubmit={handleSubmit}>          
            {
              PostMessage != '' ? 
              <Alert color="primary">
                {PostMessage}
                {toast.info(PostMessage)}
              </Alert>
              :
              ''
            }
        <FormGroup>
          <Label for="post_Title">Post Title</Label>
          <Input type="text" name="post_Title" id="post_Title" placeholder="Post Title" 
          onChange={e=>{SetTitle(e.target.value)}}
          value={Title} />
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
        <Button type="submit">Submit</Button>
        
      </Form>

      )

}
export default EditPost;