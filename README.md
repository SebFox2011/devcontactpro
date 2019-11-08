#DEV CONTACT

## 1 install du projet
Pour installer le projet :
npx express-generator --view=pug --git --css=sass devcontactpro


puis npm install

ensuite importer le projet dans WebStorm

## 2 installer dot env pour le support du .env
https://www.npmjs.com/package/dotenv

npm install dotenv
creer un fichier .env

et indiquer le numéro du port utilisé dans le fihier

## 3 installer nodemon
Afin de recharger le server après chaque modif
npm install nodemon --save-dev


Pour repasser en scss : renommer le fichier en .scss (modifier le code sass) et modifier app.npmjs:
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

## 4 Installation de Mangoose

https://www.npmjs.com/package/mongoose
npm install mongoose

Créer le schéma de la base

## 5 Authentification
http://www.passportjs.org/packages/
https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8
https://github.com/saintedlama/passport-local-mongoose

npm install --save passport passport-local passport-local-mongoose

npm install express-session
renseigner : app.use(cookieParser('azerty')); et app.use (session({}));

## 6 JWT
npm install passport passport-local passport-jwt

## 7 Socket.Io

install server
npm install socket.io


## 8 securisation de la router
https://stackoverflow.com/questions/21884619/passport-js-local-strategy-how-to-secure-route
dans app.js créer la fonction pour sécuriser /messages


install front
nouveau fichier script Message.js
récupérer le fichier https://raw.githubusercontent.com/socketio/socket.io-client/master/dist/socket.io.js
et le coller dans public, javascipt socketio.io.js
il sert a la connexion au server via le systeme socket
