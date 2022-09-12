


function PostContainer() {

    return <>
        <article className="post">
            <div className="post__top">
                <div className="avatar">
                    <img src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>

                <div className="about">
                    <h3 className="name">Dominic Simmons</h3>
                    <span className="date">2 hrs</span>
                </div>

                <div className="button--options">
                    <i></i>
                </div>
            </div>
            <div className="post__content">
                <div className="text">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet excepturi voluptatem provident ea nam, cumque, consequatur quas vel eaque corporis eum hic quod labore, omnis recusandae aperiam blanditiis sit deleniti?</p>
                </div>

                <div className="media">
                    <img src="https://images.pexels.com/photos/1000057/pexels-photo-1000057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
            </div>
            <div className="post__bottom">
                <div className="buttons">
                    <div className="thumbs">
                        <div className="button button--thumb thumb--up">
                            <i className="fa-solid fa-thumbs-up"></i>
                            <span>Like</span>
                        </div>
                        <div className="button button--thumb thumb--down">
                            <i className="fa-solid fa-thumbs-down"></i>
                            <span>Dislike</span>
                        </div>
                    </div>

                    <div className="button button--comment">
                        <i className="fa-regular fa-comment"></i>
                        <span>Comments</span>
                    </div>
                    <div className="button button--comment">
                        <i className="fa-thin fa-share-nodes"></i>
                        <span>partager</span>
                    </div>
                </div>
            </div>

            <div className="comments">

            </div>
        </article>
    </>
}


export default PostContainer