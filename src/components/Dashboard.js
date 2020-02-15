import React from 'react';
import {Button} from 'reactstrap';
import {Redirect, Link} from "react-router-dom";

const Dashboard = () =>{

    return(
        <div>
        <h1>Dashboard</h1>
        <h3>
            Welcome: {localStorage.getItem('Username')}
            <br></br>
            Your Email: {localStorage.getItem('Email')}
        </h3>
        <Link className="btn btn-secondary" to={`/addPost`}>Add New Post</Link>
        <Link className="btn btn-secondary ml-4" to={`/addpage`}>Add page Post</Link>
        <Link className="btn btn-secondary ml-4" to={`/posts`}>All Posts</Link>
        <Link className="btn btn-secondary ml-4" to={`/pages`}>All Page</Link>
        </div>
    )
}

export const Logout = () =>{
    localStorage.clear();
    window.location.href = '/';
}
export default Dashboard;