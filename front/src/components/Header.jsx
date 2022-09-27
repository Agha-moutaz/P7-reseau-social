import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../app/context";
import { getAPI, removeToken } from "../utils/api";


function Header(props){

    const navigate = useNavigate()
    const { dispatchLoginEvent } = useContext(AppContext);

    const logout = () => {
        removeToken();
        dispatchLoginEvent('LOGIN_EXPIRED', {})
        navigate('/login') 
    }

    useEffect(() => {
        getAPI().get('/api/user/getUserByToken')
        .then(function(res) {
            dispatchLoginEvent('LOGIN_SUCESS', res.data)            
        })
        .catch(function(res){
            if(res.response?.status == 401) {
                dispatchLoginEvent('LOGIN_EXPIRED', {})
                navigate('/login')       
            }        
        })
      }, []);
   
    return <header>
        <div className="global-wrapper h-container">
            <div className="logo"></div>
            <nav>
                <ul>
                    {   
                        props.currentUser?.logged
                        ? 
                        <>
                        <li className="menu-link"><Link to="/profile" replace>Profile</Link></li>
                        <li className="menu-link"><Link to="login" onClick={logout} replace>Se déconnecter</Link></li>
                        </>
                        :
                        <>
                        <li className="menu-link"><Link to="/login" replace>s'identifier</Link></li>
                        <li className="menu-link"><Link to="/register" replace>s'inscrire</Link></li>
                        </>
                    }
                    
                </ul>
            </nav>
        </div>
    </header>
}


export default Header