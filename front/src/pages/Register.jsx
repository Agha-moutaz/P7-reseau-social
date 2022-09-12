import { useState } from "react";
import '../scss/login.scss'
import { getAPI, setToken } from "../utils/api";
import { login as loginValidator } from "../validators/login";

function Register(){
    const [fields, setFields] = useState({
        email: "",
        password: "",
        name: ""
    })

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
        <main id="auth">
            <section id="register" className="form">
                <div className="form__container">
                    <div className="top">
                        <h1>Create your Account</h1>
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
                                <input 
                                    type="text" 
                                    placeholder="email@exemple.org" 
                                    onChange={function(event){
                                        setFields( {
                                            ...fields,
                                            email: event.target.value,
                                        })
                                    }}
                                    />
                            </div>
                    
                            <div className="field">
                                <label htmlFor="">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="*********" 
                                    onChange={function(event){
                                        setFields( {
                                            ...fields,
                                            password: event.target.value,
                                        })
                                    }}/>
                                    <p>To register with us please tick to ou <a href="#">Terms and Conditions</a> </p>
                            </div>
                    
                            <div className="field">
                                <button>Register</button>
                            </div>
                        </form>
                    </div>
                    
                    <div className="form__links">
                        <ul>
                            <li>Already have an account? <a href="#">Sign In</a></li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    </>
}


export default Register