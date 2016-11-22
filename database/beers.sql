USE `beer_shelf`;

CREATE TABLE `beers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `brewery_id` INT NOT NULL,
  `beer_advocate_id` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_beers_brewery_idx` (`brewery_id` ASC),
  CONSTRAINT `fk_beers_brewery`
    FOREIGN KEY (`brewery_id`)
    REFERENCES `breweries` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
