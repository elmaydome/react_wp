import React, {useEffect,useState,Fragment} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {APIURL} from './Config'

import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Alert} from 'reactstrap';

const SinglePost = () =>{
    const [Post, SetPost] = useState({})
    const [Loaded, SetLoaded] = useState(false)
    const [Error, SetError] = useState('')
    const PostId = useParams().id;
    useEffect( () => {
        axios.get(`${APIURL}posts/${PostId}`)
        .then(res =>{
            SetPost(res.data);
            SetLoaded(true);
            document.title = res.data.title;
        }).catch(err =>{
            SetLoaded(false)
            SetError(err)
        });
        
    }, [PostId]);

    const SinglePostTemplate = () => {
    return(
        Object.keys(Post).length > 0 ? 
        <div>
        <div className="thum-single-event">
            <img src={Post.future_image.full} alt="" />
            <div className="date-single-post">
                <p className="date-event-single">{Post.date}</p>
            </div>
            <div className="share-event">
                <i className="icon-shape_29 icon-share"></i>
                <div className="share-hover">
                <ul>
                    <li><a href="#" target="_blank"><i className="icon-fb"></i></a></li>
                    <li><a href="#" target="_blank"><i className="icon-tw"></i></a></li>
                    <li><a href="#" target="_blank"><i className="icon-go"></i></a></li>
                    <li><a href="#" target="_blank"><i className="icon-in"></i></a></li>
                </ul>
            </div>
            </div>
        </div>
        <h4 className="h4-event-title">
              <i className="icon-title-event icon-shape_10"></i>
              {Post.title}
        </h4>
        <div className="about-us-content"  dangerouslySetInnerHTML={{__html:Post.content}}>

        </div>
        </div>
        :
        <Alert color="danger">
            No post found 404
        </Alert>
        )}
        
    return(
        <div>
            {Loaded === true  &&  Error === '' ?
           <Fragment> <SinglePostTemplate /></Fragment>
            : 
            ''
            }
            {Loaded === false && Error === '' ?
            <h3>Loading ...</h3> : ''
            }

        {Loaded === false  &&  Error !== '' ?
        <Alert color="danger">
           {Error.message}
        </Alert>
        : 
        ''}


            
        </div>
    )
    
}

export default SinglePost;