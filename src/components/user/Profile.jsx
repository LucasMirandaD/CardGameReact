import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './Profile.css';
import Header from '../others/Header'
import InputForm from '../others/InputForm';

import apiDomain from '../../config';

import Warning from '../others/Warning';
import Error from '../others/Error';
import Success from '../others/Success';

import FormData from 'form-data';

function Profile() {
    const navigate = useNavigate();
    const [warningMessage, setWarningMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setsuccessMessage] = useState('');

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        image_url: '',
      });
   
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${apiDomain}player/${localStorage.getItem("id")}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.status === 200) {
          setUserInfo({
            nickname: response.data.player.nickname,
            email: response.data.player.email,
            image_url: response.data.image_url,
          });
        }
      } catch (error) {
        console.error("Error al obtener información del usuario");
      }
    };
  
    useEffect(() => {
      if (localStorage.getItem("token")) {
        fetchUserInfo();
      }
      else{
        navigate('/login');
      }
    }, []);
  
    const handleImage = async (event) => {
      setWarningMessage('');
      setErrorMessage('');
    
      const file = event.target.files[0];
    
      if (file) {
        if (
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/png' ||
          file.type === 'image/webp'
        ) {
          const formData = new FormData();
          formData.append('image', file);
    
          try {
            const response = await fetch(
              apiDomain+`players/${localStorage.getItem(
                'id'
              )}/update_image`,
              {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
              }
            );
    
            if (response.status === 200) {
              const responseData = await response.json();
              setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                image_url: responseData.image_url,
              }));
              setsuccessMessage('Cambio de imagen exitoso');
            } else {
              setErrorMessage('Error al actualizar la imagen');
            }
          } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            setErrorMessage('Error al actualizar la imagen');
          }
        } else {
          setWarningMessage('Por favor, selecciona una imagen en formato JPG, JPEG, PNG o Webp.');
          event.target.value = '';
        }
      }
    };

    // const handleSaveChanges = async (event) => {
    //   const playerData = {
    //     name: event.target.value, 
    //     // password: '',
    //   };
    //   console.log(event.target.value)
    //   // try {
    //   //   const response = await axios.put(`${apiDomain}players/${localStorage.getItem("id")}`, {
    //   //     body: { player: playerData },
    //   //     headers: {
    //   //       'Authorization': `${localStorage.getItem("token")}`,
    //   //     },
    //   //   });
  
    //   //   if (response.status === 200) {
    //   //     localStorage.clear();
    //   //     navigate('/login');
    //   //   }
    //   // } catch (error) {
    //   //   console.error("Error al obtener información del usuario");
    //   // }
    // }
    
    const deleteUser = async () => {
      try {
        const response = await axios.delete(`${apiDomain}players/${localStorage.getItem("id")}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.status === 204) {
          localStorage.clear();
          navigate('/login');
        }
      } catch (error) {
        console.error("Error al eliminar el usuario");
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
                        <h2 className="text-center mb-4">Mi cuenta</h2>
                        <form>
                        <div className="form-group d-flex justify-content-center align-items-center">
                            <label htmlFor="fileInput">
                                <img
                                className="profile-pic mx-auto d-block rounded-circle mb-4"
                                src={userInfo.image_url}
                                alt="Foto de perfil"
                                />
                            </label>
                            <input type="file" id="fileInput" accept="image/jpeg" onChange={handleImage}/>
                        </div>
                        <InputForm 
                            type="text" 
                            id="name" 
                            description="Nickname" 
                            value={userInfo.nickname}
                            readOnly={true}
                        />
                        <InputForm 
                            type="email" 
                            id="email" 
                            description="Correo electrónico" 
                            value={userInfo.email}
                            readOnly={true}
                        />
                        <button type="submit" className="btn btn-primary btn-block">
                          <Link to="/password" style={{ color: 'white', textDecoration: 'none' }}>
                            Cambiar Contraseña
                          </Link>
                        </button>
                        {/* <button type="submit" className="btn btn-primary btn-block" onClick={handleSaveChanges}>Guardar cambios</button> */}
                        <button type="button" className="btn btn-danger btn-block mt-2" onClick={deleteUser}>Borrar cuenta</button>
                        </form>
                        {warningMessage && <Warning description={warningMessage} />}
                        {errorMessage && <Error description={errorMessage} />}
                        {successMessage && <Success description={successMessage} />}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile