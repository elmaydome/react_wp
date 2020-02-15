import React, {useEffect,useState,Fragment} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {APIURL2} from './Config'
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Alert} from 'reactstrap';

const SinglePage = () =>{
    const [Page, SetPage] = useState({})
    const [Loaded, SetLoaded] = useState(false)
    const [Error, SetError] = useState('')
    const {pageid} = useParams();
    useEffect( () => {
        axios.get(`${APIURL2}pages/${pageid}`)
        .then(res =>{
            SetPage(res.data);
            SetLoaded(true);
            document.title = res.data.title.rendered;
        }).catch(err =>{
            SetLoaded(false)
            SetError(err)
        });
    }, [pageid]);


     
    const SinglePageTemplate = () => {
    return(
        Object.keys(Page).length > 0 ? 
                <div>
                
                <h4 className="h4-event-title">
                    <i className="icon-title-event icon-shape_10"></i>
                    {Page.title.rendered}
                </h4>
                <div className="about-us-content"  dangerouslySetInnerHTML = {{__html: Page.content.rendered}}>

                </div>
                </div>
        :<Alert color="danger">
            No Page found 404
        </Alert>
        )}
        
    return(
        <div>
            {Loaded === true  &&  Error === '' ?
           <Fragment> <SinglePageTemplate /></Fragment>
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

export default SinglePage;