import { useState } from "react";
import PostContainer from "../components/PostContainer";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import Side from "../components/Side";
import UserList from "../components/UserList";
import { getAPI } from "../utils/api";
import '../scss/home.scss'


function Home(){

    const [datax, setData] = useState({
        data: [],
    })


    function getdata() {
        getAPI().get('/api/post/')
        .then(function(res) {
    
            setData( {
                datax: res.data,
            })   
            console.log(datax);     
        })
        .catch(function(res){
            alert('error')
        })
    }

    return <>
        <main id="index" onClick={getdata}>
            <Side/>
            <PostContainer>
                <NewPost />
                {   
                datax.data.map(post => { 
                   <Post text={post.text}/>
                })}
                
                <UserList/>
            </PostContainer>
        </main>
    </>
}

export default Home