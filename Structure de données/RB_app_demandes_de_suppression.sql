

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for RB_app_demandes_de_suppression
-- ----------------------------
DROP TABLE IF EXISTS `RB_app_demandes_de_suppression`;
CREATE TABLE `RB_app_demandes_de_suppression` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `demandeur` double DEFAULT NULL,
  `date_ajout` date DEFAULT NULL,
  `date_modif` date DEFAULT NULL,
  `statut` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of RB_app_demandes_de_suppression
-- ----------------------------
INSERT INTO `RB_app_demandes_de_suppression` VALUES ('1', '4', '2017-02-08', '2017-02-08', '2');
INSERT INTO `RB_app_demandes_de_suppression` VALUES ('2', '4', '2017-02-08', '2017-02-08', '2');
INSERT INTO `RB_app_demandes_de_suppression` VALUES ('3', '4', '2017-02-08', '2017-02-08', '2');
INSERT INTO `RB_app_demandes_de_suppression` VALUES ('4', '4', '2017-02-08', '2017-02-08', '2');
INSERT INTO `RB_app_demandes_de_suppression` VALUES ('5', '4', '2017-02-08', '2017-02-08', '2');
INSERT INTO `RB_app_demandes_de_suppression` VALUES ('6', '5', '2017-02-20', '2017-02-20', '2');
