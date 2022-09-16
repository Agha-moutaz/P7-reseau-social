import { useState, useContext } from "react";
import { getAPI } from "../utils/api";
import {
    faPaperclip,
  } from '@fortawesome/free-solid-svg-icons'
  import { postValidator } from "../validators/post";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import {HomeContext} from '../app/context'


function NewPost() {

    const { dispatchPostEvent } = useContext(HomeContext);

    const [fields, setFields] = useState({
        text: "",
    })

    const savePost = function(event){
        event.preventDefault()
        event.stopPropagation()
        //validations
        const {error, value} = postValidator.validate(fields, { abortEarly: false })

        if(error){
            return alert('error')
        }

        getAPI().post('/api/post/', value)
            .then(function(res){
                dispatchPostEvent('POST_ADDED', res.data)
                setFields( {
                    ...fields,
                    text: ""
                })
                alert('success')
                
            })
            .catch(function(res){
                alert('error')
            })
    }

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
                    <textarea id="textbox" rows="3" cols="50"
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
                    <div className="upload"><FontAwesomeIcon icon={faPaperclip} /></div>
                    <button className="download" onClick={savePost}>envoyer</button>
                    
                </div>
            </div>
        </article>
    </>
}


export default NewPost