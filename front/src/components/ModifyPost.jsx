import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormData from 'form-data'
import { getAPI } from "../utils/api";
import { faPaperclip, faImage, faClose} from '@fortawesome/free-solid-svg-icons'
import { postValidator } from "../validators/post";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext, HomeContext } from '../app/context'




function ModifyPost(props) {

    const { dispatchPostEvent } = useContext(HomeContext);
    const { dispatchLoginEvent } = useContext(AppContext);
    const [text, setText] = useState(false)
    let fileRef = useRef(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        setText(props.post.text)
    },[]);
  
      
    const openInputFile = function(event) {
        fileRef.current.click()
    }

    const  savePost = async function(event) {
        event.preventDefault()
        event.stopPropagation()

        const handleApiError = (res) => {
            if(res.response.status == 401) {
                dispatchLoginEvent('LOGIN_EXPIRED', {})
                navigate('/login')       
            }
        }

        const {error, value} = postValidator.validate({text:text}, { abortEarly: false })
        if(error){
            return alert('error')
        }
        
        let formData = new FormData();
        formData.append("image", fileRef.current.files[0]);
        formData.append("text", value.text);

        try {
            const result = await getAPI('formData').put(`/api/post/${props.post._id}`, formData);
            dispatchPostEvent('POST_ADDED', result.data)
            setText("");
            fileRef.current.value = ""
            props.toggelModalModifyPost();
        } catch (error) {
            handleApiError(error)
            alert('error')
        }
    }

    return <>
        <div className="post__edit">
        <div className="close">
            <FontAwesomeIcon icon={ faClose} onClick={props.toggelModalModifyPost}  />
          </div>
          <textarea 
            rows="5" cols="50"
            value={text}
            onChange={function(event){
                setText(event.target.value)
            }}
          />
            <div className="post__choix">
                <input 
                    className="hidden"
                    name="image"
                    ref={fileRef}  
                    type="file"
                    accept="image/png, image/jpeg" />
                
                <div className="image" onClick={openInputFile}>
                    <span>Ajouter une image</span>
                    <FontAwesomeIcon icon={faImage} />
                </div>
            </div>
            <div className="post__publish">
                <button className="publish" onClick={savePost}>Publier</button>
            </div>
        </div>
    </>
}


export default ModifyPost;