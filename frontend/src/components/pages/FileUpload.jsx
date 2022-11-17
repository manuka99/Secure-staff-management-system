import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import { MsgUploadApi, FileUploadApi } from '../services/upload-files.service';
import { APP_USER_TOKEN } from '../../config';

function FileUpload () {
    const [text, setMsg] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const id = APP_USER_TOKEN
    const history = useHistory();

    const submitMsg = async (e) => {
        e.preventDefault();
        
        try{
            const Message = {id, text};
            await MsgUploadApi(Message);
           // history.push("/login");
        } catch(err) {
            console.log(err)
        }
        
    };

    const submitFile = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            await FileUploadApi(formData);
           // history.push("/login");
        } catch(err) {
            console.log(err)
        }
    };
   
    return (
        <div>
        <div class="login container w-50 register">
        <div class="card-columns d-flex justify-content-center">
                <h2>File Upload</h2>
        </div>
        <form onSubmit={submitFile}>  
                <div class="form-group">
                    <label for="exampleFormControlFile1">Upload Files : </label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={(e) => setSelectedFile(e.target.files[0])}/>
                </div>            
            <div class="card-columns d-flex justify-content-center mt-4">
                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </div>  
            
        </form>
        </div>
        <div class="login container w-50 register">
        <div class="card-columns d-flex justify-content-center">
                <h2>Message Upload</h2>
        </div>
        <form onSubmit={submitMsg}>
                 <div class="form-group">
                     <label for="exampleFormControlTextarea1">Upload Messages:  </label>
                     <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setMsg(e.target.value)}></textarea>
                </div>           
            <div class="card-columns d-flex justify-content-center mt-4">
                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </div>  
            
        </form>
        
        </div> 
    </div>
    );
}
 
export default FileUpload;