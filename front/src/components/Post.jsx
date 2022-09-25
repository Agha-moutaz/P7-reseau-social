import {useState, useEffect, useContext, useId } from "react";
import {
    faHeart,
    faHeartBroken,
    faComment,
    faClose,
    faFileEdit,
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAPI } from "../utils/api";
import { AppContext } from '../app/context'
import Modal from 'react-modal'
 
  



function PostContainer(props) {

  const [likeNumber, setLikeNumber] = useState()
  const [dislikeNumber, setDislikeNumber] = useState()
  const [isOpenModalDeletePost, setIsOpenModalDeletePost] = useState(false)

  useEffect(() => {
    setLikeNumber(props.post.likes)
    setDislikeNumber(props.post.dislikes)
  },[]);
  

  const {currentUser} = useContext(AppContext);

  const like = async(action) => {

    try{
      const res= await getAPI(). post(`/api/post/${props.post._id}/like`, {like:action})
      console.log( res)
      setLikeNumber(res.data.likes)
      setDislikeNumber(res.data.dislikes)
    }
    catch(error){
        console.log(error)
    }
  }

  const deletePost =function(event){
    getAPI().delete('/api/delet/${props.post._id}')
    
        .then(function (res) {
          console.log(res.data)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
    const toggelModalDeletePost = () => {
      setIsOpenModalDeletePost(!isOpenModalDeletePost)
    }

    const modifyPost =function(event){
      getAPI().put('/api/put/${props.post._id}')
      
          .then(function (res) {
            console.log(res.data)
          })
          .catch(function (err) {
            console.log(err)
          })
      }

      // const toggelModalModifyPost = () => {
      //   setIsOpenModalModifyPost(!isOpenModalModifyPost)
      // }
      const modalstyle= {
        content: {

          width: '600px',
          height: '200px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        }
      }
    return <>
        <article className="post">
          <Modal 
            isOpen={isOpenModalDeletePost}
            style={modalstyle}
          >
          
          <div className="post__supprission"> 
            <h2>Voulez vous supprimer ce commentaire?</h2>
            <div className="post__choix">
              <button onClick={deletePost}>Oui</button>
              <button onClick={toggelModalDeletePost}>Non</button>
            </div>
          </div>
          </Modal>
          {/* <Modal 
            isOpen={isOpenModalModifyPost}
            style={modalstyle}
          >
          <div className="post__supprission"> 
            <h2>Voulez vous modifier ce commentaire?</h2>
            <div className="post__choix">
              <button onClick={modifyPost}>Oui</button>
              <button onClick={toggelModalModifyPost}>Non</button>
            </div>
          </div>
          </Modal> */}
        <div className="post__edition"> 
          <div className="bottom__top">
              <FontAwesomeIcon icon={ faFileEdit} //onClick={ toggelModalModifyPost}// 
               />   
          </div>
          <div className="bottom__top">
              <FontAwesomeIcon icon={ faClose} onClick={toggelModalDeletePost}  />
          </div>
            </div>
            <div className="post__top">
                <div className="avatar">
                    <img src={currentUser.avatar} alt="" />
                </div>

                <div className="about">
                    {/* <h3 className="name">{props.post.user.name}</h3> */}
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
                        <div className="button button--comment">
                            <FontAwesomeIcon icon={faComment} />
                            <span> {props.post.comment?.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="comments">

            </div>
        </article>
    </>
}


export default PostContainer