import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import InputForm from '../others/InputForm';
import Header from '../others/Header';
import Error from '../others/Error';

import apiDomain from './../../config';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    setErrors([]);

    if (!validateEmail(formData.email)) {

      setErrors(prevErrors => [...prevErrors, 'Ingresa un correo electrónico válido']);
      setIsSubmitting(false);
      return
    }

    if (formData.password === formData.confirm_password) {
      const requestData = {
        player: {
          name: formData.name,
          nickname: formData.nickname,
          email: formData.email,
          password: formData.password
        }
      };

      axios.post(`${apiDomain}players`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          const respuesta = JSON.parse(response.data.player);
          console.log(respuesta.id);
          console.log(respuesta.token);
          localStorage.setItem('id', respuesta.id);
          localStorage.setItem('token', respuesta.token);
          navigate('/home');
        }
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.messages) {
          const messageList = error.response.data.messages;
          const errorMessages = messageList.map(messageObj => {
            return Object.entries(messageObj).flatMap(([key, value]) => {
              // Maneja el error de rails
              return value.map(v => `${key}: ${v.error} - ${v.value}`);
            });
          }).flat();
          console.log(errorMessages);
          setErrors(prevErrors => [...prevErrors, ...errorMessages]);
        } else {
          console.log('Ha ocurrido un error en la petición');
        }
      });
    } else {
      setErrors(prevErrors => [...prevErrors, 'Las contraseñas no coinciden']);
    }
    setIsSubmitting(false);
  };



  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  function validateEmail(email) {
    // Expresión regular para validar correo.
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ar|es|org|net|edu|gov|mil|info)(?![0-9])$/i;

    return regex.test(String(email).toLowerCase());
  }

  // alert(localStorage.getItem('token'))
  return (!localStorage.getItem('token') ? (
    // return (true)?(
    <div>
      <Header />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="text-center mb-4">Crear una cuenta</h2>
                <form onSubmit={handleSubmit}>
                  <InputForm
                    id="name"
                    type="text"
                    placeholder="Ingrese su nombre"
                    description="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputForm
                    id="nickname"
                    type="text"
                    placeholder="Ingrese su usuario"
                    description="Nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                  />
                  <InputForm
                    id="email"
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    description="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <InputForm
                    id="password"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    description="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputForm
                    id="confirm_password"
                    type="password"
                    placeholder="Confirme su contraseña"
                    description="Confirmar contraseña"
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                  <button type="submit" className="btn btn-primary btn-block">
                    Registrarse
                  </button>
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
  ) : null
  );
}

export default Register;