import { useEffect, useState, createContext } from "react";
import moment from 'moment';
import PostContainer from "../components/PostContainer";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import Side from "../components/Side";
import UserList from "../components/UserList";
import { getAPI } from "../utils/api";
import {HomeContext} from "../app/context"
import '../scss/home.scss'

function Home() {

    const [posts, setPosts] = useState([])

    const dispatchPostEvent = (actionType, payload) => {
		switch (actionType) {
			case 'POST_ADDED':
				setPosts([ ...posts, payload ]);
				return;
			default:
				return;
		}
	};

    

    useEffect(() => {
        getAPI().get('/api/post/')
        .then(function(res) {
            setPosts(res.data)       
        })
        .catch(function(res){
            alert("can't retreive posts")
        })
      }, []);


    return <>
        <main id="index">
            <HomeContext.Provider value={{ posts, dispatchPostEvent }}>
                <Side/>
                <PostContainer>
                    <NewPost />
                    {   
                        posts.map(post =>  
                        <Post post={post} key={post._id}/>)
                        
                    }
                    <UserList/>
                </PostContainer>
            </HomeContext.Provider>
        </main>
    </>
}

export default Home