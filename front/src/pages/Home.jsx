import { useState } from "react";
import PostContainer from "../components/PostContainer";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import Side from "../components/Side";
import '../scss/home.scss'


function Home(){
  
    return <>
        <main>
            <Side/>
            <PostContainer>
                <NewPost />
                <Post/>
            </PostContainer>
        </main>
    </>
}

export default Home