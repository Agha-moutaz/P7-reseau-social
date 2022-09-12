import { useNavigate, Link } from "react-router-dom";


function Header(){

    const navigate = useNavigate()
    const handleClick = (path) => navigate(path)

    return <header>
        <div className="global-wrapper h-container">
            <div className="logo"></div>
            <nav>
                <ul>
                    
                    <li className="menu-link"><Link to="/login" replace>s'identifier</Link></li>
                    <li className="menu-link"><Link to="/register" replace>s'inscrire</Link></li>
                </ul>
            </nav>
        </div>
    </header>
}


export default Header