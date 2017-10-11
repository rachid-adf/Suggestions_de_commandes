
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for RB_app_utilisateurs
-- ----------------------------
DROP TABLE IF EXISTS `RB_app_utilisateurs`;
CREATE TABLE `RB_app_utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `autorisations` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`username`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of RB_app_utilisateurs
-- ----------------------------
INSERT INTO `RB_app_utilisateurs` VALUES ('1', 'user1', '0000', 'user essai', 'creation_produits');
INSERT INTO `RB_app_utilisateurs` VALUES ('2', 'racben', '1982', 'user essai 1', 'creation_produits,traitement_demande');
INSERT INTO `RB_app_utilisateurs` VALUES ('3', 'racben', '1982', 'user essai 1 3', 'creation_produits');
