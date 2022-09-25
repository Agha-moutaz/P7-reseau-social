import { useEffect, useRef, useState } from "react";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../scss/login.scss'
import { getAPI } from "../utils/api";
import { register as registerValidator } from "../validators/register";
import Modal from 'react-modal'



function Profile() {
  //const [user, setUser] = useState({})
  const [fields, setFields] = useState({
    email: "",
    password: "",
    name: "",
    id: ""
  })

  let fileRef = useRef(null);


  const  saveUser = async function(event) {
    event.preventDefault()
    event.stopPropagation()
    //validations
    //const {error, value} = postValidator.validate(fields, { abortEarly: false })
    // if(error){
    //     return alert('error')
    // }
    let formData = new FormData();
    
    formData.append("image", fileRef.current.files[0]);
    formData.append("name", fields.name);
    if(fields.password) {
      formData.append("password", fields.password);
    }
    try {
        const result = await getAPI('formData').post('/api/user/updateUser', formData);
    } catch (error) {
        alert('error')
    }
   }


  useEffect(() => {
    async function fetchUser()  {
      try{
        const userData = await getAPI().get('/api/user/getUserByToken')
        console.log(userData.data)
        //setUser(user.data)
        setFields({
          name: userData.data.name,
          email: userData.data.email,
          id: userData.data._id
        })  
      } catch(err){
        alert("errrorrrr")
      }
    } fetchUser();
  }, []);
  const [isOpenModalDeleteUser, setIsOpenModalDeleteUser] = useState(false)
  const openInputFile = function(event) {
    fileRef.current.click();
    event.preventDefault();
    event.stopPropagation();  
  }

  const deleteUser =function(event){
    getAPI().delete('/api/user/'+fields.id)
    
        .then(function (res) {
          console.log(res.data)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
    const toggelModalDeleteUser = () => {
      setIsOpenModalDeleteUser(!setIsOpenModalDeleteUser)
    }
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
    <main id="auth">
    <Modal 
            isOpen={isOpenModalDeleteUser}
            style={modalstyle}
          >
          
          <div className="post__supprission"> 
            <h2>Voulez vous supprimer votre compte?</h2>
            <div className="post__choix">
              <button onClick={deleteUser}>Oui</button>
              <button onClick={toggelModalDeleteUser}>Non</button>
            </div>
          </div>
          </Modal>
      <section id="register" className="form">
        <div className="form__container">
          <div className="top">
            <h1>Profile</h1>
          </div>
          <div className="fields">
            <form action="" onSubmit={saveUser}>

              <div className="field">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value={fields.name}
                  onChange={function (event) {
                    setFields({
                      ...fields,
                      name: event.target.value,
                    })
                  }} />
              </div>

              <div className="field">
                <label htmlFor="">Email Address</label>
                <input
                  type="text"
                  value={fields.email}
                  disabled
                />
              </div>

              <div className="field">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  onChange={function (event) {
                    setFields({
                      ...fields,
                      password: event.target.value,
                    })
                  }} />
              </div>

              <div className="field">
                <input 
                    className="hidden"
                    name="image"
                    ref={fileRef}  
                    type="file"
                    accept="image/png, image/jpeg" />
                <button onClick={openInputFile}>Update avatar</button>
              </div>

              <div className="field">
                <button >Update</button>
              </div>
              <div className="field" id= "suprimer">
                <button  onClick={deleteUser}>Supprimer mon compte</button>
              </div>
              
              
            </form>
          </div>
        </div>
      </section>
    </main>
  </>
}


export default Profile