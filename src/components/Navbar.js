import React, {useEffect,useState,useContext} from 'react';
import {Navbar,Container,Nav,NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {APIURL2} from './Config';
import {Logout} from './Dashboard';
import {context} from '../AppContext/Context';
import axios from 'axios';

const NavBar = () =>{
    const [Menu,SetMenu] = useState([]);
    const [Loaded, SetLoaded] = useState(false);
    const [Error, SetError] = useState('');
    
    useEffect( () => {
        axios.get(`${APIURL2}menu`)
        .then(res =>{
            SetMenu(res.data)
            SetLoaded(true)
        }).catch(err =>{
            SetLoaded(false)
            SetError(err)
        });

    }, [Loaded]);
    const MenuLinks = Menu.map(link => {
        return(
        <NavItem key={link.object_id}>
             <Link className="nav-link" to={`/page/${link.object_id}`}>{link.title}</Link>
        </NavItem>
        )
    })

    return(
<Navbar expand="md" className="mb-5 nav-menu">
<Container>
    <Nav className="nav-head" navbar>
        {MenuLinks}
    </Nav>
    </Container>
</Navbar>
)
}
export default NavBar;