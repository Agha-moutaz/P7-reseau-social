import { useState } from "react";
import '../scss/login.scss'
import { getAPI, setToken } from "../utils/api";
import { login as loginValidator } from "../validators/login";

function Settings(){
    const [fields, setFields] = useState({
        name: ""
    })

    useEffect(function (){
        getAPI().get("/api/user")
        .then (res =>{
            setFields(res.data)
        }) 
        .catch(axios =>{})
     },[] )

    const submit = function(event){
        event.preventDefault()
        event.stopPropagation()
        //validations
        const {error, value} = loginValidator.validate(fields, { abortEarly: false })
        if(error){
            return alert('error')
        }

        getAPI().post('/api/user/signup', value)
            .then(function(res){
                setToken(res.data.token)
            })
            .catch(function(res){
                alert('error')
            })
    }

    return <>
        <main id="settings">
            <section id="info" className="form">
                <div className="form__container">
                    <div className="top">
                        <h1>Modify your Account</h1>
                    </div>
                    <div className="fields">
                        <form action="" onSubmit={submit}>
                    
                            <div className="field">
                                <label htmlFor="">Your Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Ollie Barker"
                                    onChange={function(event){
                                        setFields( {
                                            ...fields,
                                            name: event.target.value,
                                        })
                                    }}/>
                            </div>
                            <div className="field">
                                <label htmlFor="">Email Address</label>
                                <span>{fields.email}</span> 
                            </div>
                            <div className="field">
                                <button>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    </>
}


export default Settings