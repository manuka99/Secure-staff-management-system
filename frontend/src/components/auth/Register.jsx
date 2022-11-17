import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
import { RegisterApi } from '../../services/auth.service';
import { APP_USER_TOKEN } from '../../config';

function Register () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [re_password, setPasswordCheck] = useState();
    const [name, setDisplayName] = useState();
    const [user_type, setUserType] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const newUser = {email, password, re_password, user_type, name};
            await RegisterApi(newUser);
           // const loginResponse = await axios.post("http://localhost:5000/user/login", {
           //     email, password
           // });
          //  setUserData({
               // token: loginResponse?.data.token,
            //    user: loginResponse?.data.user
           // });
            //localStorage.setItem(APP_USER_TOKEN, loginResponse.data.token);
          //  history.push("/login");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
   
    return ( 
        <div class="login container w-50 register">
        <div class="card-columns d-flex justify-content-center">
            <h2>Register</h2>
        </div>    
        {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
        <form onSubmit={submit}>
            <div class="form-group">
                <label for="exampleInputEmail1 text-start">Email address</label>
                <input type="email" class="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input type="password" class="form-control" placeholder="Confirm Password" onChange={e => setPasswordCheck(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">User Type</label>
                <input type="text" class="form-control" id="uType" placeholder="User Type" onChange={e => setUserType(e.target.value)}/>
                </div>   
                <div class="form-group">
                <label for="exampleInputPassword1">Name</label>
                <input type="text" class="form-control" id="display-name" placeholder="Display Name" onChange={e => setDisplayName(e.target.value)}/>
            </div>       
            <div class="card-columns d-flex justify-content-center mt-4">
            <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </div>  
            
        </form>
    </div>
    );
}
 
export default Register;