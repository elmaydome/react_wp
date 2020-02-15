import React, {useState} from 'react';
import { Button, Form, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import {Redirect} from "react-router-dom";

const Search = () => {
    const [searchText, setSearch] = useState('');
    const [Loaded, setLoaded] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoaded(true);
    }

    if(searchText && Loaded){
      return <Redirect to={`/searchResults/${searchText}`} />
    }
    
    
  return (
    <Form onSubmit={handleSubmit} className="mb-4">
       <InputGroup>
        <Input onChange={e => setSearch(e.target.value)} />
        <InputGroupAddon addonType="append">
          <Button color="secondary">Search</Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
    
  );
}

export default Search;