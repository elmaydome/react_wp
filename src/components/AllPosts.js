import React, {useState,useEffect} from 'react';
import {APIURL2} from './Config';
import {Redirect, Link} from "react-router-dom";
import { ListGroup, ListGroupItem, Button, Alert, Col, Row } from 'reactstrap';
import axios from 'axios';


const AllPosts = () =>{
    const [Posts, setPosts] = useState([]);
    const [Erorr, setErorr] = useState('');
    const [Loaded, setLoaded] = useState(false);
    useEffect( ()=>{
        axios.get(`${APIURL2}posts`)
        .then(res =>{
            setPosts(res.data);
            setLoaded(true)
        })
        .catch(err =>{
            setErorr(err);
        })
    },[Posts])
    const Token = localStorage.getItem('token');
    const DeleteIteme = id =>{
        if(window.confirm('Are you sure?')){
            axios.delete(`${APIURL2}posts/${id}`,{
                headers:{
                  'Content-Type' : 'application/json',
                  'Authorization' : `Bearer ${Token}`
                }
              })
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
        // console.log(id)
        // Posts.splice(id,1);
    }
    const PostItems = Posts.map(item =>{
        return(
            
            <ListGroupItem className="text-left" key={item.id}>
                <Row>
                <Col sm="9">
                {item.title.rendered}
                </Col>
                <Col sm="3">
                <Link className="btn btn-secondary mr-4" to={`/editPost/${item.id}`}>Edit</Link>
                <Button className="btn-danger" onClick={() =>{DeleteIteme(item.id)}}>
                    Delete
                </Button>
                </Col>
                </Row>
            </ListGroupItem>
          
        )
    })

    return(
    Loaded  && Erorr === ''  ?   
    <ListGroup>
        {PostItems}
    </ListGroup>
    :
    <Alert color="danger">
       <React.Fragment>{Erorr.message}</React.Fragment> 
    </Alert>

    )
}

export default AllPosts;
