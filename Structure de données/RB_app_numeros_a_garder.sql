

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for RB_app_numeros_a_garder
-- ----------------------------
DROP TABLE IF EXISTS `RB_app_numeros_a_garder`;
CREATE TABLE `RB_app_numeros_a_garder` (
  `produit` varchar(25) NOT NULL,
  `id_demande` double DEFAULT NULL,
  `new_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of RB_app_numeros_a_garder
-- ----------------------------
INSERT INTO `RB_app_numeros_a_garder` VALUES ('174260', '1', null);
INSERT INTO `RB_app_numeros_a_garder` VALUES ('DOR904234', '2', null);
INSERT INTO `RB_app_numeros_a_garder` VALUES ('57739900002', '3', null);
INSERT INTO `RB_app_numeros_a_garder` VALUES ('57739900000', '4', null);
INSERT INTO `RB_app_numeros_a_garder` VALUES ('WP4123R', '5', null);
INSERT INTO `RB_app_numeros_a_garder` VALUES ('0986435503', '6', null);
INSERT INTO `RB_app_numeros_a_garder` VALUES ('R986435503', '6', null);
INSERT INTO `RB_app_numeros_a_garder` VALUES ('0986435503R', '6', null);
