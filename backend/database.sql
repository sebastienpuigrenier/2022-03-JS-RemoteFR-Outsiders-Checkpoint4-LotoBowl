-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 18 juil. 2022 à 14:18
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
-- Structure de la table `administrateur`
--

DROP TABLE IF EXISTS `administrateur`;
CREATE TABLE IF NOT EXISTS `administrateur` (
  `id` varchar(100) NOT NULL,
  `pseudo` varchar(30) NOT NULL,
  `email` varchar(350) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `administrateur_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `matchs_fk1` (`equipe1_id`),
  KEY `matchs_fk2` (`equipe2_id`),
  KEY `matchs_fk3` (`journee_id`),
  KEY `matchs_fk4` (`administrateur_id`)
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `matchs`
--
ALTER TABLE `matchs`
  ADD CONSTRAINT `matchs_fk1` FOREIGN KEY (`equipe1_id`) REFERENCES `equipes` (`id`),
  ADD CONSTRAINT `matchs_fk2` FOREIGN KEY (`equipe2_id`) REFERENCES `equipes` (`id`),
  ADD CONSTRAINT `matchs_fk3` FOREIGN KEY (`journee_id`) REFERENCES `journees` (`id`),
  ADD CONSTRAINT `matchs_fk4` FOREIGN KEY (`administrateur_id`) REFERENCES `administrateur` (`id`);

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
