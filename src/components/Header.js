import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 
import './Header.css'; 
 
const Header = () =
  const { currentUser, logout } = useAuth(); 
  const navigate = useNavigate(); 
 
  const handleLogout = () =
    logout(); 
    navigate('/'); 
  }; 
 
  return ( 
ECHO is on.
ECHO is on.
          {currentUser ? ( 
                Logout 
          ) : ( 
          )} 
  ); 
}; 
 
export default Header; 
