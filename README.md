# ANTI SPAMEO
Módulo para prevenir spamers en tu servidor de Discord.


## Instalación
Primero que nada debes ir donde está locado tu bot y debes poner
```js
npm install anti-spameo
```

## Uso
Usted debera irse a **index.js** o donde se encuentre locado el archivo principal de su bot, ya puede ser **bot.js**, **server.js** o **index.js**. Una vez que usted se encuentre allí pondra el siguiente código:
```js
const antispameo = require('anti-spameo');
antispameo(<Client>, { // donde dice <Client> vas a poner como has definido el cliente, si lo has definido con "CLIENT" o con "BOT".
bufferAdvertencias: 3, // Máxima cantidad de mensajes permitidos a enviar en el tiempo definido para que sea advertido.
bufferMaximo: 7, // Máxima cantidad de mensajes permitidos a enviar en el tiempo definido para que sea kickeado.
tiempo: 1000, // La cantidad de tiempo en ms que los usuarios pueden enviar un máximo de la variable bufferMaximo antes de ser kickeados.
mensajeAdvertencia: "No spamees porfavor", // Mensaje de advertencia al usuario, se vera asi: (@User, mensaje).
mensajeKick: `Fue kickeado, quien más? ...`, // Mensaje cuando el usuario sea expulsado del servidor.
maxDuplicadosWarn: 3, // Cantidad máxima de mensajes duplicados que un usuario puede enviar en un intervalo de tiempo antes de recibir una advertencia.
maxDuplicadosKick: 10, // Cantidad máxima de mensajes duplicados que un usuario puede enviar en un intervalo de tiempo antes de ser expulsado.
exceptoRol: ["Staff"], // Roles a los cuales no les afectara esto. (Si usted no quiere poner nada solo dejelo en [])
exceptoUsuario: ["Santiago#0001"], // Usuarios a los cuales no les afectara esto. (Si usted no quiere poner nada solo dejelo en [])
});
```

¡Bien hecho! Ahora tu servidor sera seguro y no podrás dejar que usuarios hagan spam, flood o lo raideen.
Si tienes problemas respecto a la configuración puedes abrir un **problema** en nuestro [Github](https://github.com/magikste/anti-spameo/)
