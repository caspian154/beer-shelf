USE `beer_shelf`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `name` varchar(150) NOT NULL,
  `password` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
