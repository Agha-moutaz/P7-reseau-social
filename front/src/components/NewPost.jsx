import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormData from 'form-data'
import { getAPI } from "../utils/api";
import { faPaperclip} from '@fortawesome/free-solid-svg-icons'
import { postValidator } from "../validators/post";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AppContext, HomeContext} from '../app/context'


function NewPost() {

    let fileRef = useRef(null);

    const { dispatchPostEvent } = useContext(HomeContext);
    const {currentUser} = useContext(AppContext);

    const navigate = useNavigate(); 
    const [fields, setFields] = useState({
        text: "",
    })

    const openInputFile = function(event) {
        fileRef.current.click()
    }

    const { dispatchLoginEvent } = useContext(AppContext);
    const handleApiError = (res) => {
        if(res.response.status == 401) {
            dispatchLoginEvent('LOGIN_EXPIRED', {})
            navigate('/login')       
        }
    }

    const  savePost = async function(event) {
        event.preventDefault()
        event.stopPropagation()
        //validations
        const {error, value} = postValidator.validate(fields, { abortEarly: false })
        if(error){
            //return alert('error')
        }
        
        let formData = new FormData();
        formData.append("image", fileRef.current.files[0]);
        formData.append("text", value.text);

        try {
            const result = await getAPI('formData').post('/api/post/', formData);
            dispatchPostEvent('POST_ADDED', result.data)
            setFields( {...fields, text: "" })
            fileRef.current.value = ""
        } catch (error) {
            handleApiError(error)
            alert('error')
        }
    }

    return <>
        <article className="post new__post">
            <div className="post__top">
                <div className="avatar">
                    <img src={currentUser.avatar} alt="" />
                </div>
                <div className="post__content">
                    <div className="text">
                        <textarea 
                            rows="2" cols="45"
                            placeholder="Quoi de neuf?"
                            value={fields.text}
                            onChange={function(event){
                                setFields( {
                                    ...fields,
                                    text: event.target.value,
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="post__bottom">
                <div className="buttons">
                    <input 
                        className="hidden"
                        name="image"
                        ref={fileRef}  
                        type="file"
                        accept="image/png, image/jpeg" />
                    <div className="upload" onClick={openInputFile}><FontAwesomeIcon icon={faPaperclip} /></div>
                    <button className="yes" onClick={savePost}>Publier</button>
                </div>
            </div>
            </div>

        </article>
    </>
}


export default NewPost