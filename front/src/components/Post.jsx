import {
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare,
    faHeart,
    faHeartBroken,
    faComment,
    faShareNodes,
  } from '@fortawesome/free-solid-svg-icons'
  import moment from 'moment';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function PostContainer(props) {

    return <>
        <article className="post">
            <div className="post__top">
                <div className="avatar">
                    <img src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>

                <div className="about">
                    <h3 className="name">Dominic Simmons</h3>
                    {props.post.createdAt}
                    <span className="date">{moment(props.post.createdAt).fromNow()}</span>
                </div>

                <div className="button--options">
                    <i></i>
                </div>
            </div>
            <div className="post__content">
                <div className="text">
                    <p>{props.post.text}</p>
                </div>

                {/* <div className="media">
                    <img src="https://images.pexels.com/photos/1000057/pexels-photo-1000057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div> */}
            </div>
            <div className="post__bottom">
                <div className="buttons">
                    <div className="thumbs">
                        <div className="button button--thumb thumb--up">
                            <FontAwesomeIcon icon={faHeart} />
                            <span>Like</span>
                        </div>
                        <div className="button button--thumb thumb--down">
                            <FontAwesomeIcon icon={faHeartBroken} />
                            <span>Dislike</span>
                        </div>
                    </div>

                    <div className="button button--comment">
                        <FontAwesomeIcon icon={faComment} />
                        <span>Comments</span>
                    </div>
                    <div className="button button--comment">
                        <FontAwesomeIcon icon={faShareNodes} />
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