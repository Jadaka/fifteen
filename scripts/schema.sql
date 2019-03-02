DROP DATABASE IF EXISTS `fifteen`;
CREATE DATABASE `fifteen` DEFAULT CHARACTER SET utf8mb4;

USE `fifteen`;

CREATE TABLE `tiers` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` TEXT,
  `auth_uid` VARCHAR(100) UNIQUE,
  `experience` BIGINT NOT NULL DEFAULT 0,
  `pinks` BIGINT NOT NULL DEFAULT 0,
  `tier_id` BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`tier_id`) REFERENCES tiers(`id`)
) ENGINE=InnoDB;

CREATE TABLE `friendships` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id1` BIGINT NOT NULL,
  `user_id2` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id1`) REFERENCES users(`id`),
  FOREIGN KEY (`user_id2`) REFERENCES users(`id`)
) ENGINE=InnoDB;

CREATE TABLE `games` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `duration` BIGINT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `user_id` BIGINT NOT NULL,
  `ex_transcript_id` BIGINT,
  FOREIGN KEY (`user_id`) REFERENCES users(`id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `gears` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `cost` BIGINT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `badges` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `trigger` TEXT NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
) ENGINE=InnoDB;

CREATE TABLE `users_gears` (
  `user_id` BIGINT NOT NULL,
  `gear_id` BIGINT NOT NULL,
  PRIMARY KEY (`user_id`, `gear_id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`),
  FOREIGN KEY (`gear_id`) REFERENCES gears(`id`)
) ENGINE=InnoDB;
