import React, { useState } from "react";
import './CSS/LoginSingUp.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginSingUp = () => {
    const [state, setState] = useState("Login");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const toggleTerms = () => {
        setAgreeTerms(!agreeTerms);
      };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        try {
            if (!agreeTerms) {
               toast.error("Please accept terms of use and privacy policy");
               return;
              }
            let response = await fetch('http://localhost:4000/login', {  
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            let responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                console.error('Error en el inicio de sesión:', responseData.message);
                alert('Error en el inicio de sesión: ' + responseData.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };

    const signUp = async () => {
        try {
            if (!agreeTerms) {
                toast.error("Please accept terms of use and privacy policy");
                return;
               }
            let response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            let responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                console.error('Error en el registro:', responseData.message);
                alert('Error en el registro: ' + responseData.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                </div>
                <button onClick={() => { state === "Login" ? login() : signUp() }} >Continue</button>
                {state === "Sign Up" ? <p className="loginsingup-login">Already have an Account? <span onClick={() => { setState("Login") }}>Login Here</span></p> : null}
                {state === "Login" ? <p className="loginsingup-login">Create an Account?<span onClick={() => { setState("Sign Up") }}> Click Here</span></p> : null}
                <div className="loginsingup-agree">
                    <input type="checkbox"             
            name="agreeTerms"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={toggleTerms} />
                    <p>By Continuing, I Agree to the <a href="/unknown">terms of use</a> & <a href="/unknown">privacy policy</a>.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSingUp;
