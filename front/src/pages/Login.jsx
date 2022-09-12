import { useState } from "react";
import '../scss/login.scss'
import { getAPI, setToken } from "../utils/api";
import { login as loginValidator } from "../validators/login";

function Login(){
    const [fields, setFields] = useState({
        email: "",
        password: ""
    })

    const submit = function(event){
        event.preventDefault()
        event.stopPropagation()

        //validations
        const {error, value} = loginValidator.validate(fields, { abortEarly: false })
        if(error){
            return alert('error')
        }

        getAPI().post('/login', value)
            .then(function(res){
                setToken(res.data.token)
            })
            .catch(function(res){
                alert('error')
            })
    }

    return <>
        <main id="auth">
            <section id="login" className="form">
                <div className="form__container">
                    <div className="top">
                    <h1>Login to your Account</h1>
                </div>
                
                <div className="fields">
                    <form action="" onSubmit={submit}>
                        <div className="field">
                            <label for="">Email Address</label>
                            <input 
                                type="text" 
                                placeholder="email@exemple.org" 
                                onChange={function(event){
                                    setFields({
                                        email: event.target.value,
                                        ...fields
                                    })
                                }}
                                />
                        </div>
            
                        <div className="field">
                            <label for="">Password</label>
                            <input 
                                type="password" 
                                placeholder="*********" 
                                onChange={function(event){
                                    setFields({
                                        password: event.target.value,
                                        ...fields
                                    })
                                }}/>
                        </div>
            
                        <div className="field">
                            <button>Login</button>
                        </div>
                    </form>
                </div>
                </div>
                <div className="form__links">
                    <ul>
                        <li>Don't have an account? <a href="#">Register</a></li>
                        <li>Forgotten your password? <a href="#">Recover Password</a></li>
                    </ul>
                </div>
            </section>
        </main>
    </>
}

export default Login