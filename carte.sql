-- phpMyAdmin SQL Dump
-- version 5.2.1-1.fc36
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 27 mars 2023 à 08:15
-- Version du serveur : 10.5.18-MariaDB
-- Version de PHP : 8.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `carte`
--

-- --------------------------------------------------------

--
-- Structure de la table `Bandes`
--

CREATE TABLE `Bandes` (
  `id` int(11) NOT NULL,
  `nom` text NOT NULL,
  `couleur` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `Bandes`
--

INSERT INTO `Bandes` (`id`, `nom`, `couleur`) VALUES
(101, 'Piafs', '#e01b24'),
(102, 'Sud Ouest', '#f5c211'),
(104, 'Anjou', '#9141ac'),
(105, 'Sud Est', '#1c71d8'),
(106, 'Est', '#5c5577'),
(107, 'Milieu', '#15066f'),
(108, 'Milieu Sud', '#5668fb'),
(109, 'Dom Tom et monde', '#865e3c'),
(114, 'Brezhou', '#000000'),
(115, 'Nord', '#26a269');

-- --------------------------------------------------------

--
-- Structure de la table `Departements`
--

CREATE TABLE `Departements` (
  `id` int(11) NOT NULL,
  `id_bande` int(11) NOT NULL,
  `id_dep` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `Departements`
--

INSERT INTO `Departements` (`id`, `id_bande`, `id_dep`) VALUES
(323, 104, 55),
(325, 104, 39),
(326, 104, 7),
(327, 104, 13),
(333, 105, 87),
(344, 102, 28),
(348, 102, 68),
(349, 102, 45),
(350, 102, 60),
(351, 102, 27),
(352, 102, 61),
(353, 102, 10),
(354, 102, 84),
(362, 106, 35),
(365, 106, 21),
(369, 106, 71),
(370, 106, 53),
(371, 106, 37),
(385, 108, 29),
(386, 108, 78),
(388, 108, 46),
(389, 108, 81),
(390, 108, 11),
(392, 108, 82),
(393, 108, 26),
(407, 108, 74),
(412, 108, 5),
(413, 108, 69),
(414, 105, 17),
(418, 105, 50),
(419, 108, 49),
(420, 108, 44),
(424, 107, 51),
(425, 107, 47),
(426, 107, 64),
(427, 107, 3),
(428, 107, 83),
(431, 107, 75),
(432, 107, 56),
(433, 107, 90),
(452, 101, 14),
(453, 101, 0),
(454, 101, 1),
(456, 101, 15),
(464, 109, 102),
(465, 109, 101),
(466, 109, 100),
(470, 109, 98),
(479, 107, 34),
(481, 109, 93),
(484, 101, 95),
(486, 101, 97),
(487, 101, 96),
(488, 101, 94),
(491, 109, 99),
(502, 105, 23),
(503, 105, 92),
(506, 105, 54),
(507, 105, 22),
(508, 105, 66),
(510, 105, 8),
(512, 105, 9),
(513, 105, 89),
(515, 105, 88),
(516, 105, 18),
(517, 102, 52),
(518, 102, 59),
(519, 102, 76),
(520, 102, 77),
(525, 109, 72),
(526, 109, 73),
(528, 106, 2),
(532, 106, 38),
(534, 106, 4),
(536, 106, 67),
(537, 106, 24),
(538, 106, 25),
(542, 104, 43),
(543, 104, 19),
(544, 104, 6),
(546, 106, 20),
(547, 114, 63),
(548, 114, 70),
(549, 114, 36),
(553, 115, 12),
(554, 115, 42),
(555, 115, 79),
(556, 115, 65),
(557, 115, 31),
(558, 115, 16),
(559, 115, 32),
(560, 115, 91),
(561, 115, 41),
(562, 115, 85),
(563, 106, 40),
(566, 115, 33),
(570, 115, 30),
(579, 108, 58),
(581, 108, 62),
(582, 105, 86),
(583, 105, 80),
(585, 114, 57),
(587, 104, 48);

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `ip_u` varchar(160) NOT NULL,
  `id_dep` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`id`, `ip_u`, `id_dep`) VALUES
(71, '127.0.0.1Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0', 43),
(72, '10.33.170.94Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0', 43),
(106, '10.1.0.33Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0', 43),
(107, '10.1.0.33Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15', 43),
(108, '::1Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15', 97);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Bandes`
--
ALTER TABLE `Bandes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Departements`
--
ALTER TABLE `Departements`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Bandes`
--
ALTER TABLE `Bandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT pour la table `Departements`
--
ALTER TABLE `Departements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=588;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
