

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for RB_Produits_a_detruire
-- ----------------------------
DROP TABLE IF EXISTS `RB_Produits_a_detruire`;
CREATE TABLE `RB_Produits_a_detruire` (
  `Demendeur` varchar(25) DEFAULT NULL,
  `Produit_a_gar` varchar(255) DEFAULT NULL,
  `Produit_a_det` varchar(25) NOT NULL,
  `Redy` varchar(12) DEFAULT NULL,
  `Date_ajout` date DEFAULT NULL,
  `Date_modif` date DEFAULT NULL,
  `Origine` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Produit_a_det`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


