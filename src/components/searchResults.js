import React, {useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import { Card, CardTitle, Row, Col, Alert} from 'reactstrap';
import axios from 'axios';
import {APIURL2} from './Config'
const SearchRsults = () => {
    const [SearchData, setSearchData] = useState([]);
    const [Erorr, setErorr] = useState([]);
    const [searchText, setSearchText] = useState(useParams().searchText)
    useEffect(() =>{
        axios.get(`${APIURL2}search?search=${searchText}`)
        .then(res =>{
            setSearchData(res.data)
        })
        .catch(err=>{
            setErorr(err)
        })
    })

    const SearchItem = SearchData.map(item =>{
        return(
        <Col sm="12" key={item.id} className="mb-4">
        <Card body className="text-left">
        <CardTitle>
        <Link className="nav-link" to={item.subtype === "post" ? `/post/${item.id}` :`/page/${item.id}`}>{item.title}</Link>
        </CardTitle>
        </Card>
      </Col>
        )
    })

    return ( 
        
        <div>
            <h3>Resultes for : {searchText}</h3>

    <Row>
        {SearchData.length > 0 ? 
        SearchItem
        : <Col sm="12">
            <Alert color="danger">
            No Resultes found
            </Alert>
          </Col>
        }
      
    </Row>


        </div>
     );
}
 
export default SearchRsults;