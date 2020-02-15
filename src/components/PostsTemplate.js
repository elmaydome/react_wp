import React, {useState,useEffect, Fragment} from 'react';
import PostItemCard from './PostItem';
import {APIURL3} from './Config'
import {Alert} from 'reactstrap';
import axios from 'axios';
import Pagination from 'react-router-pagination';
import {useParams} from 'react-router-dom';

const PostTemplate = () =>{
    const [Posts,SetPosts] = useState([]);
    const [Loaded, SetLoaded] = useState(false)
    const [Error, SetError] = useState('');
    const [totalPosts, SettotalPosts] = useState('');
    const {pagenumid} = useParams();
    useEffect( () => {
        axios.get(`${APIURL3}posts?page_no=${pagenumid ? pagenumid : 1}`)
        .then(res =>{
            SetPosts(res.data.posts_data)
            SettotalPosts(res.data.page_count)
            SetLoaded(true)
            document.title = 'Scam Australia';
        }).catch(err =>{
            SetLoaded(false)
            SetError(err)
        });

    }, [pagenumid]);
    
    const PostsItems = Posts.map( PostItem => {
        return(
            Posts.length > 0  ?
            <PostItemCard key={PostItem.id}  Id={PostItem.id} PostImg={PostItem.attachment_image.img_src[0]} Content={PostItem.excerpt} Title={PostItem.title}  Comments={PostItem.meta.author_name} Date={PostItem.date} />
            
            :<Alert color="danger">
            No posts found
            </Alert>
        )
        
    })

    return(
        <Fragment>
             {Loaded === true  &&  Error === '' ?
           <Fragment> {PostsItems}
           <br />
           <div className="col-md-12">
           <Pagination
                totalPages={totalPosts}
                pageNumber={2}
                match={
                    {
                        path: '/paged/:pageNumber',
                        params: {
                            id: 1
                        }
                      }
                }
                />
            </div>    
           </Fragment>
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
        ''
        }
        </Fragment>    
    )
}
export default PostTemplate;