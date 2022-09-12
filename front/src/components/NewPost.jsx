

function NewPost() {

    return <>
        <article className="post">
            <div className="post__top">
                <div className="avatar">
                    <img src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>

                <div className="about">
                <h3 className="name">Dominic Simmons</h3>
                </div>

                <div className="button--options">
                    <i></i>
                </div>
            </div>
            <div className="post__content">
                <div className="text">
                    <input />
                </div>
            </div>
            <div className="post__bottom">
                <div className="buttons">
                    <button className="download">upload</button>
                </div>
            </div>
        </article>
    </>
}


export default NewPost