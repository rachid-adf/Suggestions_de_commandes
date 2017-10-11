

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for RB_app_statuts
-- ----------------------------
DROP TABLE IF EXISTS `RB_app_statuts`;
CREATE TABLE `RB_app_statuts` (
  `id` int(11) NOT NULL,
  `statut` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of RB_app_statuts
-- ----------------------------
INSERT INTO `RB_app_statuts` VALUES ('0', 'Déposée');
INSERT INTO `RB_app_statuts` VALUES ('1', 'En cours');
INSERT INTO `RB_app_statuts` VALUES ('2', 'Traitée');
