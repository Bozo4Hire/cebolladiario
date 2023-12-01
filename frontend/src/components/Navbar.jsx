import {Link} from "react-router-dom"
import {useContext} from 'react'
import {UserContext} from '../../context/userContext'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Navbar() {
  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  const logout = () => {
    console.log(user);
    localStorage.removeItem("user");
    //navigate("/");
    //window.location.reload();
  };

  return (
 
      // navbar-dark bg-dark
    <nav className="navbar navbar-expand-lg" position="top">
    <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav navbar-nav navbar-left">
                <li className="nav-item">
                    <Link className="nav-link" to="/"> Home </Link>
                </li>
                
                  <li className="nav-item">
                  <Link className="nav-link" to="/register"> Register </Link>
                  {/* {!user && (<Link className="nav-link" to="/register"> Register </Link>)} */}
                  </li>
                  <li className="nav-item">
                  {!!user && (<Link className="nav-link" to="/dashboard"> My Diary </Link>)}
                  {!user && (<Link className="nav-link" to="/login"> My Diary </Link>)}
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login"> Log In </Link>
                  {/* {!user && (<Link className="nav-link" to="/login"> Log In </Link>)} */}
                  </li>
                
            </ul>
            <ul class="nav navbar-nav navbar-right">
            {/* {!!user && (<button class="btn" onClick={logout}>Logout</button>)} */}
              <li className="nav-item" position="right">
                {!!user && (<h2 className="nav-link disabled">Hello {user.name}!</h2>)}
              </li>
              
             
            </ul>
        </div>
    </div>
    </nav>
    
    
  )
}
