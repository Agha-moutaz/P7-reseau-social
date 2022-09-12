


function PostContainer(props){

    return (
    <main id="index">
        <section id="users">
        </section>
        <section id="posts">
            <div className="posts__container">
                {props.children}
            </div>
        </section>
     </main>
    )

}


export default PostContainer