

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for RB_Parametres_creation
-- ----------------------------
DROP TABLE IF EXISTS `RB_Parametres_creation`;
CREATE TABLE `RB_Parametres_creation` (
  `Ligne` double NOT NULL,
  `Taux_de_change` double DEFAULT NULL,
  `Date_modif` date DEFAULT NULL,
  `Nb_jours_a_charger` double DEFAULT NULL,
  `User_modif` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Ligne`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of RB_Parametres_creation
-- ----------------------------
INSERT INTO `RB_Parametres_creation` VALUES ('1', '1.35', '2017-08-04', '100', 'Rachid Benseba');
