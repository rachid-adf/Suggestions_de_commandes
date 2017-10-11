
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for create_requests
-- ----------------------------
DROP TABLE IF EXISTS `create_requests`;
CREATE TABLE `create_requests` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `action` varchar(50) DEFAULT NULL,
  `category` varchar(3) DEFAULT NULL,
  `product_id` varchar(17) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `supplier` char(12) DEFAULT NULL,
  `cost` decimal(11,2) DEFAULT NULL,
  `core` decimal(11,2) DEFAULT NULL,
  `currency` varchar(3) DEFAULT NULL,
  `interchange` text,
  `alternatives` text,
  `make` varchar(255) DEFAULT NULL,
  `has_env_fee` tinyint(1) DEFAULT NULL,
  `env_fee` decimal(11,2) DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
