import React, {useContext, useState} from 'react'
import logo from '../logo.png';
import {Link} from 'react-router-dom';
import {Logout} from './Dashboard';
import {context} from '../AppContext/Context';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function Header() {
    const [Token, SetToken] = useContext(context);
    const { t, i18n } = useTranslation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    SetToken(localStorage.getItem('token'));
   
    
    const handleClick = (lang)=> {
        i18next.changeLanguage(lang);
        document.body.dir=i18next.dir(lang)
        
      }
    return (
        <div>
        <div className="container-fluid top-bar">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                    <ul className="top-bar-ul list-inline">
                    <li className="list-inline-item">
                    <Link className="nav-link" to="/">{t('Home.1')}</Link>
                    </li>
                    { Token ? 
                    <React.Fragment>
                    <li className="list-inline-item">
                    <Link className="nav-link" to="/dashboard">{t('Dashboard.1')}</Link>
                    </li>
                    <li className="list-inline-item">
                         <Link onClick={Logout} className="nav-link" to="/">{t('Logout.1')}</Link>
                    </li>
                        </React.Fragment>
                        : 
                        <li className="list-inline-item">
                         <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        } 
                    </ul>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="date hidden-xs">
                           <i className="icon-shape_10-1 icon-date"></i>
                           Australia, Canberra
                            <p>20/10/2020</p>
                        </div>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret>
                                Languages
                                </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={()=>handleClick('en')}>English</DropdownItem>
                                <DropdownItem onClick={()=>handleClick('ar')}>اللغه العربيه</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
            
<div className="container-fliud header">
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <Link to="/">
                    <img className="img-fluid" src={logo} alt="logo" />
                </Link>
            </div>
            <div className="col-md-6">
                <ul className="social list-inline">
                    <li className="list-inline-item"><a href="#" target="_blank"><i className="icon-fb"></i></a></li>
                    <li className="list-inline-item"><a href="#" target="_blank"><i className="icon-tw"></i></a></li>
                    <li className="list-inline-item"><a href="#" target="_blank"><i className="icon-ytb"></i></a></li>
                    <li className="list-inline-item"><a href="#" target="_blank"><i className="icon-go"></i></a></li>
                    <li className="list-inline-item"><a href="#" target="_blank"><i className="icon-in"></i></a></li>
                    <li className="list-inline-item"><a href="#" target="_blank"><i className="icon-inst"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</div>
    )
}
