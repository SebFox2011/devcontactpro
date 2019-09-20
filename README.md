#DEV CONTACT

##1 install du projet
Pour installer le projet :
npx express-generator --view=pug --git --css=sass devcontactpro


puis npm install

ensuite importer le projet dans WebStorm

##2 installer dot env pour le support du .env
https://www.npmjs.com/package/dotenv

npm install dotenv
creer un fichier .env

et indiquer le numéro du port utilisé dans le fihier

##3 installer nodemon
Afin de recharger le server après chaque modif
npm install nodemon --save-dev


Pour repasser en scss : renommer le fichier en .scss (modifier le code sass) et modifier app.npmjs:
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

##4 Installation de Mangoose

https://www.npmjs.com/package/mongoose
npm install mongoose

Créer le schéma de la base
