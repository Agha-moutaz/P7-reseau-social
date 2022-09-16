


function Side() {

    return <>
     
            <section id="users">
                <div className="perso">
                    <img src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <h3 className="name">Dominic Simmons</h3>
                </div>

                <div className="control">
                    <ul>
                        <li className="menu-control"><i className="fa-light fa-browser"></i> Explore<a href="../html/login.html"></a></li>
                        <li className="menu-control"><i className="fa-thin fa-mailbox"></i>Inbox<a href="../html/register.html"></a></li>
                        <li className="menu-control"><i className="fa-solid fa-computer-classic"></i>Resource<a href="../html/login.html"></a></li>
                        <li className="menu-control"><i className="a-solid fa-gear"></i>Paramètres<a href="../html/Paramètres.html"></a></li>
                    </ul>
                    <div className="new-post">
                        <button id="poster">New post</button>
                    </div>
                </div>
                <div className="amis message">
                    <ul>
                        <li className="menu-amis"><i className="fa-solid fa-envelope"></i> Messages<a href="../html/login.html"></a>
                            <div className="text">
                                <input />

                            </div>
                        </li>
                        <li className="menu-amis"><i className="fa-solid fa-user-group"></i> Amis<a href="../html/register.html"></a></li>
                    </ul>
                </div>
            </section>
        
    </>

}


export default Side