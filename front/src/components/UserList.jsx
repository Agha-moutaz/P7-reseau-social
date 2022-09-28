import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAPI } from "../utils/api";
import '../scss/userlist.scss'


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
      <section className="user__list" id="users">
        <ul>
          { users.map(user=><li key={user._id}>
            <div className="avatar" ><img src={user.avatar}/></div>
            <span className="name"> {user.name}</span>   
          </li>)} 
        </ul>
      </section>
    </>

  }

  export default UserList;