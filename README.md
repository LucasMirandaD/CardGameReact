# Juego de cartas UNO (Frontend en React)

Se recreo el juego de cartas UNO para 2 jugadores. Sus características son:
- Creación e inicio de sesión para usuarios.
- Creacion de partidas (generación de token de partida).
- Buscar partidas dado su token.
- Gestionar información del usuario (foto de perfil y cambiar su contraseña) y borrar cuenta.
- En cada partida se pueden tomar cartas del mazo, tirar cartas propias, ver cartas propias y su cantidad. Además, se puede ver el nombre , la foto de perfil y la cantidad de cartas de los otros jugadores de la partida (por ahora solo 2 jugadores).
- Llevar registro de las rondas ganadas en la partida de los jugadores.
- Tablero principal que resume los componentes de Join Create y Games, en el cual se puede ingresar a una partida, crear una partida o tambien ver mis partidas.

## ¿Cómo ejecutar?

1) Descargar y descomprimir.
2) Ejecutar "npm install" sobre el directorio descomprimido.
3) Ejecutar servidor con "npm start".
   
Importante: En el puerto 3000 escucha a la API del backend (se puede cambiar en el /src/config.js)

## Extra
- Este proyecto usa es-lint
