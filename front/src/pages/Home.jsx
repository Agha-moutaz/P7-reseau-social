import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostContainer from "../components/PostContainer";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import UserList from "../components/UserList";
import { getAPI } from "../utils/api";
import {HomeContext, AppContext} from "../app/context";
import '../scss/home.scss'


function Home() {

    const [posts, setPosts] = useState([])
    const navigate = useNavigate(); 
    const dispatchPostEvent = (actionType, payload) => {
		switch (actionType) {
			case 'POST_ADDED':
				//setPosts([ ...posts, payload ]);
                getAllPosts();
				return;
			default:
				return;
		}
	};

    const getAllPosts = function() {
        getAPI().get('/api/post/')
        .then(function(res) {
            setPosts(res.data)       
        })
        .catch(function(res){
            handleApiError(res);
        })
    }

    const { dispatchLoginEvent } = useContext(AppContext);
    const handleApiError = (res) => {
        if(res.response.status == 401) {
            dispatchLoginEvent('LOGIN_EXPIRED', {})
            navigate('/login')       
        }
    }

    useEffect(() => {
        getAllPosts();
    }, []);

      


    return <>
        <main id="index">
            <HomeContext.Provider value={{ posts, dispatchPostEvent }}>
                <UserList/>
                <PostContainer>
                    <NewPost />
                    {   
                        posts.map(post =>  
                        <Post post={post} key={post._id}/>)
                        
                    }
                </PostContainer>
            </HomeContext.Provider>
        </main>
    </>
}

export default Home