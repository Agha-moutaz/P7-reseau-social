import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAPI } from "../utils/api";



function UserList() {

    const [users, setUsers] = useState([]);


    useEffect(() => {
      getAPI().get('/api/user/')
        .then(function (res) {
          console.log(res.data)
          setUsers(res.data)
        })
        .catch(function (res) {

        })
    }, []);

    return <>
      <section id="users">
        <ul>
          { users.map(user=><li key={user._id}>
              <NavLink to={`/profil/${user.id}`}>
                  <img height={25} width={25} className="avatar" src={user.avatar}/>
                  <span className="name"> {user.name}</span>
              </NavLink>
          </li>)} 
        </ul>
      </section>
    </>

  }

  export default UserList;