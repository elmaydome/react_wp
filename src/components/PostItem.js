import React from 'react';
import {Col} from 'reactstrap';
import DefaultImage from '../placeholder.png';
import {Link} from 'react-router-dom';
import {Post_details_length_Home} from './Config';
import {useSpring, animated} from 'react-spring'

const PostItemCard = (props) =>{
    const trim_text = text => {
        const res = text.slice(0, Post_details_length_Home);
        return res;
    }
    const propAnimated = useSpring({delay: 500,config: { duration: 250 }, transform: 'scale(1)', from: {transform: 'scale(0.5)'}})

    return(
        
        <Col md="4" className="mb-5">
            <animated.div style={propAnimated}>
         <div className="thum-event">
                  <img className="img-responsive"  width="100%" src={ (props.PostImg != undefined )  ? props.PostImg  : DefaultImage } alt="post image" />
                  <div className="post-date">
                      <p className="date-post">{props.Date}</p>
                  </div>
              </div>
              
              <h4 className="h4-event-title">
				<i className="icon-title-event icon-shape_10"></i>
                <Link  to={`/post/${props.Id}`}>
                {props.Title}
                    </Link>
				</h4>
                <div className="event-desc" dangerouslySetInnerHTML={{__html:trim_text(props.Content)}}>
                </div>
                </animated.div>
      </Col>


    )
}

export default PostItemCard;