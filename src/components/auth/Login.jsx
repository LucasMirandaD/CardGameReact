import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import InputForm from '../others/InputForm';
import Header from '../others/Header';
import Error from '../others/Error';

import apiDomain from './../../config'

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setErrors([]);
    if (formData.email=="" || formData.password==""){
      if (formData.email==""){
        setErrors(prevErrors => [...prevErrors, 'No ha ingresado el correo electrónico']);
      }
      if (formData.password==""){
        setErrors(prevErrors => [...prevErrors, 'No ha ingresado la contraseña']);
      }
      return
    }
    setIsSubmitting(true);
    const requestData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const requestBody = JSON.stringify(requestData);
      const response = await axios.post(apiDomain + '/player/login', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {

        localStorage.setItem('id', response.data.id);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.messages) {
        const messageList = error.response.data.messages;
        const errorMessages = messageList.map(messageObj => messageObj.message);
        console.log(errorMessages);
        setErrors(prevErrors => [...prevErrors, ...errorMessages.flat()]);
      } else {
        console.log('Ha ocurrido un error en la petición');
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <Header/>
      <div className="container">
          <div className="row justify-content-center mt-5">
          <div className="col-md-6">
              <div className="card shadow">
              <div className="card-body">
                  <h2 className="text-center mb-4">Inicio de sesión</h2>
                  <form onSubmit={handleSubmit}>
                      <InputForm 
                        id="email" 
                        type="email" 
                        placeholder="Ingrese su correo" 
                        description="Correo" 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <InputForm 
                        id="password" 
                        type="password" 
                        placeholder="Ingrese su contraseña" 
                        description="Contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                  </form>
                  {
                    errors && errors.map((desc, index) => (
                      <Error key={index} description={desc} />
                    ))
                  }
              </div>
              </div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Login