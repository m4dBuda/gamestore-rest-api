# Host: localhost  (Version 8.0.11)
# Date: 2023-02-01 21:48:23
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "tipo_usuario"
#

DROP TABLE IF EXISTS `tipo_usuario`;
CREATE TABLE `tipo_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_conta` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "tipo_usuario"
#

INSERT INTO `tipo_usuario` VALUES (1,'FREE'),(2,'VIP'),(3,'ADMIN');

#
# Structure for table "usuarios"
#

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `cpf` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `data_nascimento` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `endereco2` varchar(255) DEFAULT NULL,
  `id_tipo_usuario` int(2) DEFAULT '1',
  `ativo` tinyint(1) DEFAULT '1',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `alterado_em` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "usuarios"
#

INSERT INTO `usuarios` VALUES (1,'Julio','111.222.333-44','$2b$12$YS7scSb1Vyn5KPJfNcLaTO4tegbWGrRQ.i/aDEc8DrSwzSBZB9k06','juliocesar@gmail.com','05/12/1990','(62)9-9580-7060','Avenida T-63, nº 1, Qd. 1, Lt. 1','Edífico Agulhas Negras',1,1,'2023-01-19 21:40:44','2023-01-26 19:33:42'),(2,'Leo','444.555.666-77','$2b$12$fvVpZva715Tqc7KvV0wfc.JlfC1asLQRJiG37suDRQlBfBQieBOcO','leonidio@gmail.com','05/12/1990','(62)9-9580-7060','Avenida T-63, nº 1, Qd. 1, Lt. 1','Edífico Agulhas Negras',3,1,'2023-01-23 20:45:19',NULL),(3,'João Otávio','666.777.888-99','$2b$12$4LYPDT3mBmKYuP2A7pHKsuS8bYYl3E8CoumKRip6zInnSs1ruuGg2','otaviodev@gmail.com','05/12/1990','(62)9-9580-7060','Avenida T-63, nº 1, Qd. 1, Lt. 1','Edífico Agulhas Negras',3,1,'2023-01-23 20:45:40',NULL),(4,'Jean','999.888.333-44','$2b$12$kZwCKz3eyYxUXYKBiptMjuEiChVkeXVRL.BDsNWVudY2H4pL/aDQ2','jean@gmail.com','05/12/1990','(62)9-9580-7060','Avenida T-63, nº 1, Qd. 1, Lt. 1','Edífico Agulhas Negras',2,1,'2023-01-25 20:12:46',NULL),(8,'Jean','999.444.333-44','$2b$12$vgESXogCdeGFKblAzZ9YdeC8vGaoLGMZ0mHAtKizruqu0jOdqjAUa','123456@gmail.com','05/12/1990','(62)9-9580-7060','Avenida T-63, nº 1, Qd. 1, Lt. 1','Edífico Agulhas Negras',2,1,'2023-01-26 21:55:22',NULL),(11,'Jean','999.888.999-44','$2b$12$r3nlv.MV37evEJxjAaTGguoE152VjweNWUkG8k0K3tGKBBafkSFLi','12345@gmail.com','05/12/1990','(62)9-9580-7060','Avenida T-63, nº 1, Qd. 1, Lt. 1','Edífico Agulhas Negras',2,1,'2023-01-26 21:59:19',NULL);

#
# Structure for table "tipo_produtos"
#

DROP TABLE IF EXISTS `tipo_produtos`;
CREATE TABLE `tipo_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `criado_por_id_usuario` int(11) DEFAULT NULL,
  `alterado_em` timestamp NULL DEFAULT NULL,
  `alterado_por_id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `criado_por_id_usuario` (`criado_por_id_usuario`),
  KEY `alterado_por_id_usuario` (`alterado_por_id_usuario`),
  CONSTRAINT `tipo_produto_ibfk_1` FOREIGN KEY (`criado_por_id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `tipo_produto_ibfk_2` FOREIGN KEY (`alterado_por_id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "tipo_produtos"
#

INSERT INTO `tipo_produtos` VALUES (1,'MMORPG',1,'2023-01-19 21:37:17',3,'2023-01-19 21:42:28',1),(2,'Aventura',1,'2023-01-19 21:37:31',2,'2023-01-19 21:45:01',NULL),(3,'Esportes',1,'2023-01-19 21:37:37',2,NULL,NULL),(4,'Campanha',1,'2023-01-19 21:37:49',1,NULL,NULL),(5,'Teste Editado',1,'2023-01-27 21:31:51',NULL,'2023-01-27 21:31:51',NULL),(6,'Teste Editado',1,'2023-01-27 21:32:08',NULL,'2023-01-27 21:32:08',NULL),(7,'Teste Editado',1,'2023-01-27 21:32:48',NULL,'2023-01-27 21:32:48',NULL),(8,'Teste Editado',1,'2023-01-27 21:32:56',NULL,'2023-01-27 21:32:56',NULL),(9,'Teste Editado',1,'2023-01-27 21:33:23',NULL,'2023-01-27 21:33:23',NULL),(10,'Teste Editado',1,'2023-01-31 21:17:32',NULL,'2023-01-31 21:17:32',NULL),(11,'Teste Editado',1,'2023-01-31 21:46:22',NULL,'2023-01-31 21:46:22',NULL),(12,'Teste Editado',1,'2023-01-31 21:46:40',NULL,'2023-01-31 21:46:40',NULL),(13,'Teste Editado',0,'2023-01-31 21:57:46',NULL,'2023-01-31 21:57:46',NULL),(14,'Teste Editado',0,'2023-01-31 21:58:51',NULL,'2023-01-31 21:58:51',NULL),(15,'Teste Editado',1,'2023-01-31 21:59:14',NULL,'2023-01-31 21:59:14',NULL),(16,'Teste Editado',1,'2023-01-31 22:01:18',NULL,'2023-01-31 22:01:18',NULL),(17,'Teste Editado',1,'2023-01-31 22:04:28',NULL,'2023-01-31 22:04:28',NULL),(18,'Teste Editado',1,'2023-01-31 22:06:57',NULL,'2023-01-31 22:06:58',NULL),(19,'Teste Editado',1,'2023-01-31 22:08:52',NULL,'2023-01-31 22:08:52',NULL),(20,'Teste Editado',1,'2023-01-31 22:12:20',NULL,'2023-01-31 22:12:20',NULL),(21,'Teste Editado',1,'2023-02-01 20:50:02',NULL,'2023-02-01 20:50:02',NULL),(22,'Teste Editado',1,'2023-02-01 21:43:28',NULL,'2023-02-01 21:43:28',NULL);

#
# Structure for table "produtos"
#

DROP TABLE IF EXISTS `produtos`;
CREATE TABLE `produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_produto` varchar(255) DEFAULT NULL,
  `descricao_produto` varchar(255) DEFAULT NULL,
  `preco` varchar(255) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `caminho_imagem` varchar(255) DEFAULT NULL,
  `id_tipo_produto` int(11) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `alterado_em` timestamp NULL DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_tipo_produto` (`id_tipo_produto`),
  CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `produtos_ibfk_2` FOREIGN KEY (`id_tipo_produto`) REFERENCES `tipo_produtos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "produtos"
#

INSERT INTO `produtos` VALUES (1,'God of War 5','Novo lançamento!','R$199,90',10,10,1,NULL,4,'2023-01-19 21:48:43',NULL,1),(2,'GTA 7 - Rio de Janeiro','ROCKSTAR GAMES BRASIL!','R$299,90',3,8,1,NULL,2,'2023-01-19 21:48:43',NULL,2),(3,'GTA 7 - Rio de Janeiro','ROCKSTAR GAMES BRASIL!','R$699,90',10,6,1,NULL,2,'2023-01-19 21:48:43','2023-01-28 18:15:17',1),(5,'Elden Ring','Lançado em 2022, ganhador do premio XBOX','R$399,90',5,10,1,NULL,3,'2023-01-25 21:37:38',NULL,NULL),(6,'God of War - Ragnarok','Lançado em 2022, ganhador do premio XBOX','R$279,90',15,10,1,NULL,3,'2023-01-25 21:38:18',NULL,NULL),(13,'GTA 7 - Rio de Janeiro','ROCKSTAR GAMES BRASIL!','R$699,90',10,6,1,NULL,2,'2023-01-27 21:33:23','2023-01-31 21:48:00',2),(14,'God of War - Ragnarok','Lançado em 2022, ganhador do premio XBOX','R$279,90',15,10,1,'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg',3,'2023-01-28 18:18:11',NULL,3),(15,'God of War - Ragnarok','Lançado em 2022, ganhador do premio XBOX','R$279,90',15,10,1,'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg',3,'2023-01-28 18:18:21',NULL,3),(16,'God of War - Ragnarok','Lançado em 2022, ganhador do premio XBOX','R$279,90',1,10,1,'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg',3,'2023-01-28 18:19:46','2023-01-28 18:44:43',2),(17,'God of War - Ragnarok','Lançado em 2022, ganhador do premio XBOX','R$279,90',1,10,1,'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg',3,'2023-01-28 19:27:25',NULL,3);

#
# Structure for table "carrinhos"
#

DROP TABLE IF EXISTS `carrinhos`;
CREATE TABLE `carrinhos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produtos` varchar(255) DEFAULT NULL,
  `finalizado` tinyint(1) DEFAULT '0',
  `id_usuario` int(11) NOT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `alterado_em` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `carrinhos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "carrinhos"
#

INSERT INTO `carrinhos` VALUES (1,'2, 3, 4, 5',1,1,'2023-01-24 20:15:54','2023-01-24 21:53:49'),(2,'2, 3, 4, 5',1,1,'2023-01-24 21:13:20','2023-01-24 21:53:49'),(3,'2, 3, 4, 5',1,1,'2023-01-24 21:13:35','2023-01-24 21:53:49'),(4,'2, 3, 4, 5',1,1,'2023-01-24 21:14:37','2023-01-24 21:53:49'),(5,'2, 3, 4, 5',1,1,'2023-01-24 21:15:51','2023-01-24 21:53:49'),(6,'4',0,1,'2023-01-24 21:53:49',NULL),(7,'3, 3, 4, 6, 1',0,4,'2023-01-25 21:38:58',NULL);

#
# View "view_carrinhos"
#

DROP VIEW IF EXISTS `view_carrinhos`;
CREATE
  ALGORITHM = UNDEFINED
  VIEW `view_carrinhos`
  AS
  SELECT
    `carrinhos`.`id`,
    `carrinhos`.`id_produtos`,
    `carrinhos`.`finalizado`,
    `carrinhos`.`id_usuario`,
    `usuarios`.`nome`,
    `carrinhos`.`criado_em`,
    `carrinhos`.`alterado_em`
  FROM
    (`carrinhos`
      JOIN `usuarios` ON ((`carrinhos`.`id_usuario` = `usuarios`.`id`)));

#
# View "view_produtos"
#

DROP VIEW IF EXISTS `view_produtos`;
CREATE
  ALGORITHM = UNDEFINED
  VIEW `view_produtos`
  AS
  SELECT
    `produtos`.`id`,
    `produtos`.`nome_produto`,
    `produtos`.`descricao_produto`,
    `produtos`.`preco`,
    `produtos`.`quantidade`,
    `produtos`.`rating`,
    `produtos`.`ativo`,
    `produtos`.`caminho_imagem`,
    `produtos`.`id_tipo_produto`,
    `tipo_produtos`.`descricao` AS 'descricao_tipo_produto',
    `produtos`.`criado_em`,
    `produtos`.`alterado_em`,
    `produtos`.`id_usuario`,
    `usuarios`.`nome` AS 'nome_usuario'
  FROM
    ((`produtos`
      LEFT JOIN `usuarios` ON ((`produtos`.`id_usuario` = `usuarios`.`id`)))
      LEFT JOIN `tipo_produtos` ON ((`produtos`.`id_tipo_produto` = `tipo_produtos`.`id`)));

#
# View "view_usuarios"
#

DROP VIEW IF EXISTS `view_usuarios`;
CREATE
  ALGORITHM = UNDEFINED
  VIEW `view_usuarios`
  AS
  SELECT
    `usuarios`.`id`,
    `usuarios`.`nome`,
    `usuarios`.`cpf`,
    `usuarios`.`senha`,
    `usuarios`.`email`,
    `usuarios`.`data_nascimento`,
    `usuarios`.`telefone`,
    `usuarios`.`endereco`,
    `usuarios`.`endereco2`,
    `usuarios`.`id_tipo_usuario`,
    `tipo_usuario`.`tipo_conta`,
    `usuarios`.`ativo`,
    `usuarios`.`criado_em`,
    `usuarios`.`alterado_em`
  FROM
    (`usuarios`
      LEFT JOIN `tipo_usuario` ON ((`usuarios`.`id_tipo_usuario` = `tipo_usuario`.`id`)))
  WHERE
    (`usuarios`.`ativo` = 1);
