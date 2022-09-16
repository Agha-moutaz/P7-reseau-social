import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {getAPI } from "../utils/api";


function UserList() {
 const [users,setUsers] = useState([])
 
  
    //  useEffect(function (){
    //     getAPI().get("/api/user/suggests")
    //     .then (res =>{
    //         setUsers(res.data)
    //     }) 
    //     .catch(axios =>{})
    //  },[] )

    return <>
      <ul>
        { users.map(user=><li>
            <NavLink to={`/profil/${user.id}`}>
                <img className="avatar" src={"/avatar/"+user.id+".jpg"}/>
                <span className="name"> {user.name}</span>
            </NavLink>
        </li>)} 
      </ul>
    </>
}


export default UserList