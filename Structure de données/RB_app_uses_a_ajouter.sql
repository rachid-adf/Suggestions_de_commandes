

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for RB_app_uses_a_ajouter
-- ----------------------------
DROP TABLE IF EXISTS `RB_app_uses_a_ajouter`;
CREATE TABLE `RB_app_uses_a_ajouter` (
  `Produit` varchar(25) NOT NULL,
  `id_demande` double DEFAULT NULL,
  `Description` varchar(40) DEFAULT NULL,
  `Memo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of RB_app_uses_a_ajouter
-- ----------------------------
