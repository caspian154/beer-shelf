USE `beer_shelf`;

CREATE TABLE `shelf` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `beer_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_shelf_user_idx` (`user_id` ASC),
  INDEX `fk_shelf_beer_idx` (`beer_id` ASC),
  CONSTRAINT `fk_shelf_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shelf_beer`
    FOREIGN KEY (`beer_id`)
    REFERENCES `beers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
