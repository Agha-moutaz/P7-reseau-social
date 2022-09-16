


function PostContainer(props){

    return (
        <>
        <section id="posts">
            <div className="posts__container">
                {props.children}
            </div>
        </section>
        </>
    )

}


export default PostContainer