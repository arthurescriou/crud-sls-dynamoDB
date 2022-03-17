Dev4DBO

<img src="https://cfa-insta.fr/wp-content/uploads/2020/08/Logo-CFAINSTA.png" alt="logo CFA" width="100"/>

# TME 2 Déploiement et file storage

L'objectif de ce TME est de déployer notre application serverless sur AWS.
Ainsi qu'utiliser le service S3 pour stocker des fichiers.

## Exercice 1 : déployer serverless

Récupérer les crédentials AWS fourni (ou en créer sur son propre compte AWS dans IAM).

Configurer aws cli :

```
aws configure
```

ou remplir le fichier .aws/credentials

Puis déployer le projet :

(pensez à modifier le nom du projet dans le serverless.yml (service) pour identifier le votre)

```
serverless deploy
```

## Exercice 2 : Utiliser l'application déployé

On veut vérifier que notre application fonctionne toujours de la même façon qu'en local.

Créer une entité et tester les différentes routes d'API créés.

(Si le déploiement est vert cela ne veut pas dire que tout marche)

## Exercice 3 : Utiliser S3

Maintenant que l'application marche sur le cloud on veut encore ajouter des fonctionnalités.

On voudrait ajouter de la gestion de fichiers.

Objectifs :

- créer une route `createFile` qui sauvegarde un fichier donné en argument dans S3
- créer une route `listFile` qui renvoie la liste de tous les fichiers du bucket S3
- créer une route `getFile` qui permet de télécharger un fichier
- créer une route `deleteFile` pour supprimer un fichier

## Exercice 4 : Déploiement d'un front end sur un CDN

Pour compléter le déploiement d'une application complète on veut maintenant déployer la partie client de notre application.

Pour déployer des fichiers statiques html, css et js le plus adapté et d'utiliser un CDN (content delivery network).

Ce sont des serveurs spécialisés dans la diffusion et le cache de fichiers statiques.

Pour déployer notre app nous allons utiliser le service Amplify.

(Venez demander les droits sur l'utilisateur AWS quand vous aurez atteint cet exercice)
