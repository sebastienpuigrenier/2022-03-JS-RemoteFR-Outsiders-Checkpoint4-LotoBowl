-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 20 juil. 2022 à 08:41
-- Version du serveur : 8.0.28
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lotobowl`
--

-- --------------------------------------------------------

--
-- Structure de la table `equipes`
--

DROP TABLE IF EXISTS `equipes`;
CREATE TABLE IF NOT EXISTS `equipes` (
  `id` varchar(100) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `coach` varchar(100) NOT NULL,
  `cote_depart` decimal(5,2) DEFAULT NULL,
  `cote_actuelle` decimal(5,2) DEFAULT NULL,
  `race` varchar(100) NOT NULL,
  `logo` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `equipes`
--

INSERT INTO `equipes` (`id`, `nom`, `coach`, `cote_depart`, `cote_actuelle`, `race`, `logo`) VALUES
('089a1ee3-1559-4cea-92e2-40391cd3d043', 'BAD BAD BAD Girls', 'MimiLeRochelais', '1.45', '1.45', 'Amazones', NULL),
('2721ee5a-0a0d-44cf-b18e-4104fc200a54', 'Underworld Vermin', 'Sipjin', '1.10', '1.10', 'Bas fond', 'https://back.bloodbowlclub.com/static/medias/uploads/cropped/UV%20bis.png'),
('404a269d-39da-4498-89ff-bc266d7fbd14', 'Bra\'cass\'', 'Sirjam', '2.60', '2.60', 'Gardien des tombes', NULL),
('5bf7d04e-fcba-44a8-9789-4a4fc8e60834', 'Les Vicelards Rôtis', 'LaChouviasse', '4.50', '4.50', 'Gobelins', NULL),
('9f0bddb3-f83e-4d6e-a30b-313f4564f037', 'Illuminati', 'PetitePoire', '2.70', '2.70', 'Union elfique', NULL),
('acbb7f04-f4e2-48f6-af82-ccdd09661c4f', 'Skellige Seals', 'Nithog', '1.25', '1.25', 'Nordiques', NULL),
('ad97169d-a6dd-47e9-ae6b-0fae5f6194b8', 'Slaanesh\'s Flayers', 'Mordikar', '2.40', '2.40', 'Elus du Chaos', 'https://back.bloodbowlclub.com/static/medias/uploads/cropped/logo%20chaos%20bb_Pqi8JCw.png'),
('c9d61256-4e86-4b29-bc07-64e09d87eddf', 'Grassrazers', 'Kirdom', '1.35', '1.35', 'Elfes sylvains', 'https://back.bloodbowlclub.com/static/medias/uploads/cropped/arbre-monde-2-264x300.jpg'),
('d8c2d789-dcf9-4bf0-b62e-f5f4ca1eb7cc', 'Stitution', 'Blaez', '1.55', '1.55', 'Nains', 'https://back.bloodbowlclub.com/static/medias/uploads/cropped/morse-famille-aquarium-de-quebec_4rsgnrI.jpg'),
('e71325ab-a6de-424f-b5cb-4351fb24b165', 'Abyssal Bastards', 'Marauth', '2.20', '2.20', 'Renégats du Chaos', 'https://back.bloodbowlclub.com/static/medias/uploads/cropped/Abyssal%20Bastards_sdIvq2l.png');

-- --------------------------------------------------------

--
-- Structure de la table `journees`
--

DROP TABLE IF EXISTS `journees`;
CREATE TABLE IF NOT EXISTS `journees` (
  `id` varchar(100) NOT NULL,
  `numero` int NOT NULL,
  `is_closed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `matchs`
--

DROP TABLE IF EXISTS `matchs`;
CREATE TABLE IF NOT EXISTS `matchs` (
  `id` varchar(100) NOT NULL,
  `cote_v_equipe_1` decimal(5,2) NOT NULL,
  `cote_v_equipe_2` decimal(5,2) NOT NULL,
  `cote_egalite` decimal(5,2) NOT NULL,
  `td_equipe_1` int DEFAULT NULL,
  `td_equipe_2` int DEFAULT NULL,
  `sorties_equipe_1` int DEFAULT NULL,
  `sorties_equipe_2` int DEFAULT NULL,
  `equipe1_id` varchar(100) DEFAULT NULL,
  `equipe2_id` varchar(100) DEFAULT NULL,
  `journee_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `matchs_fk1` (`equipe1_id`),
  KEY `matchs_fk2` (`equipe2_id`),
  KEY `matchs_fk3` (`journee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `paris`
--

DROP TABLE IF EXISTS `paris`;
CREATE TABLE IF NOT EXISTS `paris` (
  `user_id` varchar(100) NOT NULL,
  `match_id` varchar(100) NOT NULL,
  `somme` int NOT NULL,
  `pari_victoire_e1` tinyint(1) NOT NULL,
  `pari_victoire_e2` tinyint(1) NOT NULL,
  `pari_egalite` tinyint(1) NOT NULL,
  KEY `paris_fk1` (`user_id`),
  KEY `paris_fk2` (`match_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(100) NOT NULL,
  `pseudo` varchar(30) NOT NULL,
  `email` varchar(350) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `isadmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `email`, `avatar`, `password`, `isadmin`) VALUES
('367974e2-4fc7-400e-aa2b-b56e35263d67', 'Nithog', 'nithog@gmail.com', NULL, '$2b$10$ZKj7uLyj67y0P3KgVuonU.7J1dNcIS8//oBt3hLSCAfJhdg6.2MTK', 0),
('763b3115-5308-430d-98d7-706504c64792', 'Marauth', 'sebastien.puigrenier@gmail.com', NULL, '$2b$10$xzOYawmjOvpxbkpqZnLexeGRlHB.WOvDVfQkI5HhP9ICG0QYf0rE.', 1),
('c48ffa6d-610e-4474-ae8d-2d8a300cc34f', 'Mordikar', 'mordikar@gmail.com', NULL, '$2b$10$qJAcNEUC4eENRUP1ISaBRuv8gZmGmDZiJArS1MTlooHp6DPHNGYc6', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `matchs`
--
ALTER TABLE `matchs`
  ADD CONSTRAINT `matchs_fk1` FOREIGN KEY (`equipe1_id`) REFERENCES `equipes` (`id`),
  ADD CONSTRAINT `matchs_fk2` FOREIGN KEY (`equipe2_id`) REFERENCES `equipes` (`id`),
  ADD CONSTRAINT `matchs_fk3` FOREIGN KEY (`journee_id`) REFERENCES `journees` (`id`);

--
-- Contraintes pour la table `paris`
--
ALTER TABLE `paris`
  ADD CONSTRAINT `paris_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `paris_fk2` FOREIGN KEY (`match_id`) REFERENCES `matchs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
