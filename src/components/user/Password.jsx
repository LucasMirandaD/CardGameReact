import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from '../others/Header';
import InputForm from '../others/InputForm';

import apiDomain from '../../config';

import Warning from '../others/Warning';
import Error from '../others/Error';
import Success from '../others/Success';

function Password() {
    const navigate = useNavigate();
    const [warningMessage, setWarningMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessage, setsuccessMessage] = useState('');

    const [passwords, setPasswords] = useState({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });

    useEffect(() => {
        if (localStorage.getItem("token")) {
          
        }
        else{
          navigate('/login');
        }
      }, []);

    const handleInputChange = (event) => {
        setWarningMessage("");
        setErrorMessages([]);
        setsuccessMessage("");
        const { id, value } = event.target;
        setPasswords((prevPasswords) => ({
          ...prevPasswords,
          [id]: value,
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setWarningMessage("");
        setErrorMessages([]);
        setsuccessMessage("");
        if (passwords.current_password == "" || passwords.new_password == "" || passwords.confirm_password==""){
            if (passwords.current_password == ""){
                setErrorMessages((prevErrors) => [...prevErrors, 'La contraseña actual no puede estar vacia']);
            }
            if (passwords.new_password == ""){
                setErrorMessages((prevErrors) => [...prevErrors, 'La nueva contraseña no puede estar vacia']);
            }
            if (passwords.confirm_password == ""){
                setErrorMessages((prevErrors) => [...prevErrors, 'La confirmación de la nueva contraseña no puede estar vacia']);
            }
            return;
        }
        if (passwords.new_password != passwords.confirm_password){
            setErrorMessages((prevErrors) => [...prevErrors, 'La nueva contraseña y su confirmación no coinciden']);
            return
        }

        const requestData = {
            player: {
                new_password: passwords.new_password,
                current_password: passwords.current_password
              }
          };
        const requestBody = JSON.stringify(requestData);
        
        try {
            const response = await axios.put(`${apiDomain}players/${localStorage.getItem("id")}`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 200) {
                setsuccessMessage("Se actualizó correctamente la contraseña");
                setPasswords({
                    current_password: '',
                    new_password: '',
                    confirm_password: '',
                });
            }

        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.messages) {
                const messageList = error.response.data.messages;
                setErrorMessages(prevErrors => [...prevErrors, ...messageList.flat()]);
            }
        }
        
        
    };

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Cambiar contraseña</h2>
                            <form onSubmit={handleSubmit}>
                            <InputForm 
                                type="password" 
                                id="current_password" 
                                description="Contraseña actual" 
                                placeholder="Ingrese su contraseña actual"
                                value={passwords.current_password}
                                onChange={handleInputChange}
                            />
                            <InputForm 
                                type="password" 
                                id="new_password" 
                                description="Nueva contraseña" 
                                placeholder="Ingrese su nueva contraseña"
                                value={passwords.new_password}
                                onChange={handleInputChange}
                            />
                            <InputForm 
                                type="password" 
                                id="confirm_password" 
                                description="Confirmar contraseña" 
                                placeholder="Confirme su nueva contraseña"
                                value={passwords.confirm_password}
                                onChange={handleInputChange}
                            />
                            <button type="submit" className="btn btn-primary btn-block">Guardar cambios</button>
                            </form>
                            {warningMessage && <Warning description={warningMessage} />}
                            {errorMessages.length > 0 &&
                                <div className="alert alert-danger mt-4">
                                <ul>
                                    {errorMessages.map((error, index) => (
                                    <li key={index}>{error}</li>
                                    ))}
                                </ul>
                                </div>
                            }
                            {successMessage && <Success description={successMessage} />}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Password