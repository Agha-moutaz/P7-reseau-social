import { useContext, useEffect, useRef, useState } from "react";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../scss/login.scss'
import { getAPI } from "../utils/api";
import Modal from 'react-modal'
import { AppContext } from "../app/context";



function Profile() {

  const { dispatchLoginEvent } = useContext(AppContext);

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
    // validations
    // const {error, value} = postValidator.validate(fields, { abortEarly: false })
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
        console.log(result);
        dispatchLoginEvent('LOGIN_SUCESS', result.data.user)
    } catch (error) {
        alert('error')
    }
   }


  useEffect(() => {
    async function fetchUser()  {
      try{
        const userData = await getAPI().get('/api/user/getUserByToken')
        console.log('========>', userData.data)
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
    console.log('-------->$$$$$')
    getAPI().delete('/api/user/'+fields.id)
    
        .then(function (res) {
          
        })
        .catch(function (err) {
          console.log(err)
        })
    }
    const toggelModalDeleteUser = () => {
      setIsOpenModalDeleteUser(!isOpenModalDeleteUser)
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
      <div className="post__edit"> 
        <h2>Voulez vous supprimer votre compte?</h2>
        <div className="post__choix">
          <button className="yes"  onClick={deleteUser}>Oui</button>
          <button className="no"  onClick={toggelModalDeleteUser}>Non</button>
        </div>
      </div>
    </Modal>

      <section id="register" className="form">
        <div className="form__container">
          <div className="top">
            <h1>Profil</h1>
          </div>
          <div className="fields">
            <form action="" onSubmit={saveUser}>

              <div className="field">
                <label htmlFor="">Name</label>
                <input 
                  type="text"
                  autoComplete="false"
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

              <div className="post__choix">
                <input 
                      className="hidden"
                      name="image"
                      ref={fileRef}  
                      type="file"
                      accept="image/png, image/jpeg" />
                  
                  <div className="image" onClick={openInputFile}>
                      <span>Ajouter une image</span>
                      <FontAwesomeIcon icon={faImagePortrait} />
                  </div>
              </div>




              <div className="field">
                <button className="no" >Update</button>
              </div> 
              <div className="field" >
                <button className="no" id= "suprimer" onClick={toggelModalDeleteUser}>Supprimer mon compte</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  </>
}


export default Profile