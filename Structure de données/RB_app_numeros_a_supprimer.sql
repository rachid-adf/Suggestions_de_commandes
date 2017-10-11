

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for RB_app_numeros_a_supprimer
-- ----------------------------
DROP TABLE IF EXISTS `RB_app_numeros_a_supprimer`;
CREATE TABLE `RB_app_numeros_a_supprimer` (
  `produit` varchar(25) NOT NULL,
  `id_demande` double DEFAULT NULL,
  `redy` varchar(12) DEFAULT NULL,
  `infos` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of RB_app_numeros_a_supprimer
-- ----------------------------
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('4711209001R', '1', 'non', null);
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('7264760006', '2', 'non', null);
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('3C3Z9T514AG*', '2', 'non', null);
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('7432509014', '3', 'non', null);
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('7432509013', '3', 'non', null);
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('7432509013R', '3', 'non', null);
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('7253905003S', '4', 'non', null);
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('R23539601*', '5', 'non', null);
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('0445120018', '6', 'fait', null);
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('4940589R', '6', 'fait', null);
INSERT INTO `RB_app_numeros_a_supprimer` VALUES ('BOSDE811', '6', 'non', null);
