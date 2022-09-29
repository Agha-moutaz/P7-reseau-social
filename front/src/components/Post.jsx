import {useState, useEffect, useContext, useRef } from "react";
import {
  faHeart,
  faHeartBroken,
  faClose,
  faFileEdit,
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAPI } from "../utils/api";
import Modal from 'react-modal'
import ModifyPost from "./ModifyPost";
import { AppContext } from "../app/context";

 
function PostContainer(props) {

  const { currentUser } = useContext(AppContext);

  const [likeNumber, setLikeNumber] = useState()
  const [dislikeNumber, setDislikeNumber] = useState()
  const [isOpenModalDeletePost, setIsOpenModalDeletePost] = useState(false)
  const [isOpenModalModifyPost, setIsOpenModalModifyPost] = useState(false)
  // const [comment, setComment] = useState({
  //   content: '',
  //   imageUrl: '',
  // });

  let refPost = useRef(null);

  useEffect(() => {
    setLikeNumber(props.post.likes)
    setDislikeNumber(props.post.dislikes)
  },[]);

  const like = async(action) => {

    try{
      const res= await getAPI(). post(`/api/post/${props.post._id}/like`, {like:action})
      setLikeNumber(res.data.likes)
      setDislikeNumber(res.data.dislikes)
    }
    catch(error){
        console.log(error)
    }
  }

  const deletePost = async function(event){

    try {
      await getAPI().delete(`/api/post/${props.post._id}`);
      refPost.current.remove();
      toggelModalDeletePost();
    } catch (error) {
      toggelModalDeletePost();
    }
  }

    const toggelModalDeletePost = () => {
      setIsOpenModalDeletePost(!isOpenModalDeletePost)
    }
    const toggelModalModifyPost = () => {
      setIsOpenModalModifyPost(!isOpenModalModifyPost)
    }
    const modalstyle= {
      content: {

        width: '600px',
        padding: '4em 2em',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      }
    }

    return <>

      <article ref={refPost} className="post">

        <Modal 
          isOpen={isOpenModalDeletePost}
          style={modalstyle}
        >
        <div className="post__edit"> 
          <h2>Voulez vous supprimer ce post?</h2>
          <div className="post__choix">
            <button className="yes" onClick={deletePost}>Oui</button>
            <button className="no" onClick={toggelModalDeletePost}>Non</button>
          </div>
        </div>
        </Modal>


        <Modal 
          isOpen={isOpenModalModifyPost}
          style={modalstyle}
        >
          <ModifyPost
            post={props.post}
            toggelModalModifyPost={toggelModalModifyPost}
           />
        </Modal>


      <div className="post__edition"> 
      {currentUser._id == props.post.user._id || currentUser.isAdmin ?
        <>
          <div className="bottom__top">
            <FontAwesomeIcon icon={ faFileEdit} onClick={ toggelModalModifyPost}/>   
          </div>
          <div className="bottom__top">
            <FontAwesomeIcon icon={ faClose} onClick={toggelModalDeletePost}  />
          </div>
        </>
        : null
        }
          </div>
          <div className="post__top">
            <div className="avatar">
              <img src={props.post.user.avatar} alt="" />
            </div>

            <div className="about">
              <h3 className="name">{props.post.user.name}</h3>
              <span className="date">{moment(props.post.createdAt).fromNow()}</span>
            </div>
          </div>  
          <div className="post__content">
            <div className="text">
              <p>{props.post.text}</p>
            </div>
              { 
                props.post.imageUrl ? 
                <div className="media">
                  <img src={props.post.imageUrl} alt="" />
                </div>
                : null 
              }
          </div>
          <div className="post__bottom">
            <div className="buttons">
              <div className="thumbs">
                <div className="button button--thumb thumb--up">
                  <FontAwesomeIcon icon={faHeart}  onClick={()=>{like(1)}} />
                  <span>{likeNumber}</span>
                </div>
                <div className="button button--thumb thumb--down">
                  <FontAwesomeIcon icon={faHeartBroken} onClick={()=>{like(-1)}} />
                  <span>{dislikeNumber}</span>
                </div>
              </div>
          </div>
        </div>
      </article>
  </>
}


export default PostContainer