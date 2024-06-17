# ÉTUDE DE FAISABILITE

## Introduction à GraphQL et à NestJs
GraphQL est un langage de requête pour les APIs, développé par Facebook, qui permet aux clients de demander exactement les données dont ils ont besoin. Cela contraste avec les APIs REST, où les clients doivent souvent recevoir plus de données que nécessaire ou effectuer plusieurs requêtes pour obtenir toutes les informations requises.

NestJs est un framework Node.js progressif qui aide à construire des applications côté serveur efficaces et modulaires. Il utilise TypeScript par défaut et s'inspire des concepts d'Angular pour structurer les applications.

## Intégration de GraphQL avec NestJs
- NestJs offre une intégration facile de GraphQL grâce au module @nestjs/graphql, qui simplifie la configuration et l'utilisation de GraphQL dans une application NestJs. 

## Avantages de l'utilisation de GraphQL avec NestJs 
- Flexibilité des Requêtes : Les clients peuvent demander exactement les données dont ils ont besoin, réduisant ainsi la surcharge de données.
-Un Seul Endpoint : Contrairement aux APIs REST nécessitant plusieurs endpoints, GraphQL utilise un seul endpoint pour toutes les requêtes, simplifiant ainsi la gestion des routes.
- Typed Schema et Documentation Automatique : Le schéma type de GraphQL permet une validation stricte et une auto-documentation efficace, rendant le développement et la maintenance plus faciles.
- Optimisation des Requêtes : Les clients peuvent combiner plusieurs requêtes en une seule, ce qui peut réduire les allers-retours réseau et améliorer les performances.
- Support Natif dans NestJs : NestJs offre un support natif pour GraphQL, avec des outils et des conventions pour faciliter l'intégration et l'utilisation.

## Inconvénients et Défis Potentiels
- Complexité de la Configuration : La mise en place initiale de GraphQL peut être plus complexe par rapport à une API REST traditionnelle.
- Performance : Les requêtes GraphQL peuvent être coûteuses en termes de performance si elles ne sont pas optimisées correctement, notamment pour des requêtes complexes ou profondes.
- Apprentissage : Les développeurs doivent apprendre GraphQL, ce qui peut nécessiter du temps et des ressources supplémentaires.
- Gestion des Autorisations : La gestion fine des autorisations et des contrôles d'accès peut être plus complexe avec GraphQL.
- Étude de Cas Pratique : Messagerie Instantanée

Pour un projet de messagerie instantanée comme WhatsApp, voici comment GraphQL peut apporter une valeur ajoutée :
- Flexibilité des Données : Les clients peuvent demander uniquement les messages non lus ou les conversations spécifiques, réduisant ainsi la quantité de données transférées.
- Abonnements en Temps Réel : GraphQL supporte les abonnements, ce qui permet de mettre en place des fonctionnalités de messagerie en temps réel.
- Optimisation des Requêtes : Les clients peuvent combiner des requêtes pour obtenir à la fois des informations sur les utilisateurs et les messages dans une seule requête.

## Utiliser NestJs GraphQL et REDIS
Comme indiqué plus tôt, GraphQL est un module de NestJs permettant une utilisation combiné très simple. Les messages publiés sont classés dans des canaux, sans savoir quels abonnés (s'il y en a) recevront finalement le message. Les messages échangés par l'intermédiaire des canaux sont fire-and-forget, ce qui signifie que si un message est publié et qu'il n'y a pas d'abonnés intéressés, le message est supprimé et ne peut pas être récupéré.

REDIS permet de stocker dans le cache des requêtes récurrentes ou des requêtes volumineuses.
Egalement REDIS dispose de son systeme pub/sus qui lui permet de s'interfacer facilement avec NestJs.
Enfin REDIS peut mettre en place une système de queue pour permettre de consommer un message plus tard.

## Conclusion
L'intégration de GraphQL avec NestJs apporte une flexibilité et une efficacité accrues pour le développement d'APIs. Pour une application de messagerie instantanée, GraphQL permet des requêtes personnalisées, une gestion optimisée des données et un support pour les fonctionnalités en temps réel, rendant ainsi l'application plus réactive et performante. Cependant, il faut également prendre en compte la complexité supplémentaire et les défis de performance lors de la mise en œuvre.
