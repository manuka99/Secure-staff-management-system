import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
import { LoginApi } from '../../services/auth.service';
import { APP_USER_TOKEN } from '../../config';

function Login () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            let loginResponse = await LoginApi(loginUser)
            setUserData({
                token: loginResponse?.data.token,
                user: loginResponse?.data.user
            });
            localStorage.setItem(APP_USER_TOKEN, loginResponse.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
    
    return (
        <div class="login container w-50">
            <div class="card-columns d-flex justify-content-center">
                <h2>Login</h2>
            </div>    
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div class="card-columns d-flex justify-content-center mt-4">
                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </div>  
            </form>
        </div>
    );
}
 
export default Login;