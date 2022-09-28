


function PostContainer(props){

    return (
        <>
        <section className ="post__stream" id="posts">
            <div className="posts__container">
                {props.children}
            </div>
        </section>
        </>
    )

}


export default PostContainer