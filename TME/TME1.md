Dev4DBO

<img src="https://cfa-insta.fr/wp-content/uploads/2020/08/Logo-CFAINSTA.png" alt="logo CFA" width="100"/>

# TME 1 Backend Serverless

L'objectif de ce TME est de créer un backend (serveur) pour notre application. Nous utiliserons la stack serverless pour créer ce backend et le déployer chez AWS.

- <a href="https://serverless-stack.com/chapters/fr/what-is-serverless.html"> La stack serverless </a>
- <a href="https://github.com/arthurescriou/crud-sls-dynamoDB"> Un exemple de code </a>
- <a href="https://github.com/dherault/serverless-offline"> serverless offline </a>

Les objectifs de ce TME sont :

- lancer serverless en local
- connecter l'application serverless à une base dynamoDB locale
- ajouter de l'authentification au serveur en utilisant des <a href="https://jwt.io/">JWT</a>

## Exercice 1 : installer les dépendances

Cloner le <a href="https://github.com/arthurescriou/crud-sls-dynamoDB"> repository </a> d'exemple.

Installer les prérequis :

- nodejs (<a href="https://github.com/nvm-sh/nvm"> nvm </a> )
- docker ( pour lancer dynamoDB en local )
- yarn

```
npm -g install yarn
```

Puis suivre les instructions du readme du repository git.

Objectif: créer une entité et utiliser le crud.

## Exercice 2 : Sécurité et JWT

On va chercher maintenant à ajouter de la sécurité sur notre API.

On va utiliser des JSON Web Token (JWT) pour ça.

Dans le projet un fichier `jwt.js` implémente déjà les premières étapes de l'authentification.

Objectifs :

- générer un JWT avec la route Login
- ajouter la vérification du JWT par le header Authorizations

## Exercice 3 : Ajouter une table user

La fonction `verifyLoginPassword` renvoie tout le temps vrai.
Il n'y a pas de vrai vérification de l'utilisateur.

On voudrait maintenant ajouter une vrai vérification sur les utilisateurs.

Pour ça on veut ajouter plusieurs routes :

- createUser (créer un nouvel utilisateur)
- userExist (reçoit un JWT et renvoie vrai ou faux après avoir vérifié que l'utilisateur existe dans la base)
- deleteUser (supprime un utilisateur)

Ces routes permettront de manipuler la table user.
Il faudra également modifier `verifyLoginPassword`.

## Exercice 4 : Ajouter un administrateur

Le JWT permet de stocker des informations, elles ne sont pas modifiable.

Or dans le protocole JWT, on peut créer un JWT seulement avec la clé privé.
Donc seulement notre serveur peut créer des JWT et valider qui sera administrateur ou pas.

On veut maintenant ajouter l'information d'administrateur dans la table user et ajouter également l'information dans la génération du JWT. (`generateToken`)

Il faudra également créer la route `grantAdmin` qui permettra de donner les droits administrateur à un utilisateur. (Attention seulement un administrateur a le droit de faire ça, il faudra donc créer un premier utilisateur par défaut)

## Exercice 5 : Information personnelle

On va chercher maintenant à restreindre les accès de certaines tables pour chaque utilisateur.

On veut que nos utilisateurs n'aient accès que aux entités qu'ils ont créé.
Pour ça il faut donc ajouter l'information de propriétés dans nos entités.

Il faudra également modifier les autres méthodes qui accèdent à des entités (get, list, update, delete).

Par exemple lorsqu'on liste des entités on veut lister seulement celles crées par l'utilisateurs.

Pour identifier notre utilisateur il suffit de récupérer l'information dans le token JWT. (et de stocker ce dont on a besoin quand on le génère)

Bonus : les administrateurs eux ont le droit d'accéder à toutes les informations de la base de données.
