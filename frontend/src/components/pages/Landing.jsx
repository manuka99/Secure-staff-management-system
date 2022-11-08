import React, { useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';

function Landing() {
    const history = useHistory();
    const register = () => history.push("/register");
    const login = () => history.push("/login");

    return (
        <div class="container">
            <h3 class="justify-content-center absolute"> Login as </h3>
            <div class="card-columns d-flex justify-content-center">
                <div class="card w-25 bg-light text-center">
                <div class="card-body align-content-center">
                    <FontAwesomeIcon icon="user-lock" size="4x"  />
                    <h6><a href="#" class="btn btn-primary mt-5" onClick={login}>Administrator</a></h6>
                </div>
                </div>
        
            
                <div class="card w-25  bg-light text-center">
                <div class="card-body align-content-center">
                    <FontAwesomeIcon icon="users" size="4x"  />
                    <h6><a href="#" class="btn btn-primary mt-5" onClick={login}>Users</a></h6>
                </div>
                </div> 
            </div>
            <div class="card-columns d-flex justify-content-center">
                <button type="button" class="btn btn-primary mt-5" onClick={register} > Sign Up as Administrator </button>
            </div>
            </div>
    );
}

export default Landing;