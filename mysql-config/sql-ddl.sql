CREATE SCHEMA `goreservas`;
USE `goreservas`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `salt` varchar(256) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `role` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

CREATE TABLE `business` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `businessType` varchar(45) DEFAULT NULL,
  `CNPJ` int(11) DEFAULT NULL,
  `sizeLimit` int(11) DEFAULT NULL,
  `minPerReserve` int(11) DEFAULT NULL,
  `maxPerReserve` int(11) DEFAULT NULL,
  `autoAccept` tinyint(4) DEFAULT NULL,
  `pricePerReserve` double DEFAULT NULL,
  `pricePerPerson` double DEFAULT NULL,
  `avaliations` int(11) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `latitude` varchar(100) DEFAULT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  `imageURL` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `owner_idx` (`owner`),
  CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


CREATE TABLE `reserve` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client` int(11) NOT NULL,
  `business` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `observation` varchar(45) DEFAULT NULL,
  `showedUp` tinyint(4) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `confirmed` tinyint(4) DEFAULT NULL,
  `totalValue` double DEFAULT NULL,
  `rated` tinyint(4) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `client_idx` (`client`),
  KEY `business_idx` (`business`),
  CONSTRAINT `business` FOREIGN KEY (`business`) REFERENCES `business` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `client` FOREIGN KEY (`client`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;