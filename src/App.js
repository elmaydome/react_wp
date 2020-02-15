import React, {Suspense} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import Login from './components/Login';
import {Container,Row} from 'reactstrap';
import PostTemplate from './components/PostsTemplate';
import SinglePost from './components/SinglePost';
import Singlepage from './components/SinglePage';
import Dashboard from './components/Dashboard';
import AddPost from './components/AddPost';
import AddPages from './components/AddPages';
import Search from './components/Search';
import SearchRsults from './components/searchResults';
import AllPosts from './components/AllPosts';
import AllPages from './components/AllPages';
import EditPost from './components/EditPost';
import EditPages from './components/EditPage';
import Error404 from './components/Error404';
import PrivateRoute from './components/PrivateRoute';
import {AppProvider} from './AppContext/Context';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <AppProvider>
      <Suspense fallback="loading">
      <Header />
      </Suspense>
      <NavBar />
      </AppProvider>
      <Container>
        <Search />
        <Switch>
        <Route exact path="/">
          <Row>
          <PostTemplate />
          </Row>
        </Route>
        <Route path="/paged/:pagenumid">
          <Row>
          <PostTemplate />
          </Row>
        </Route>
        <Route path="/login">
          <Row>
          <Login />
          </Row>
        </Route>
        <Route  path="/post/:id" children={<SinglePost />}>

        </Route>
        
        <Route path="/page/:pageid" children={<Singlepage />}>
        </Route>
        <Route path="/searchResults/:searchText" children={<SearchRsults />}>
          
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/posts">
          <AllPosts />
        </PrivateRoute>
        <PrivateRoute path="/addPost">
          <AddPost />
        </PrivateRoute>
        <PrivateRoute path="/pages">
          <AllPages />
        </PrivateRoute>
        <PrivateRoute path="/editPage/:page_id">
          <EditPages />
        </PrivateRoute>
        <PrivateRoute path="/editPost/:postid">
          <EditPost />
        </PrivateRoute>
        <PrivateRoute path="/addpage">
          <AddPages />
        </PrivateRoute>
        <Route path="/*">
        <Suspense fallback="loading">
         <Error404 />
        </Suspense>
        </Route>
      </Switch>
      </Container>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
