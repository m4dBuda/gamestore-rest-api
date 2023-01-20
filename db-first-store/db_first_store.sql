# Host: localhost  (Version 8.0.11)
# Date: 2023-01-19 21:59:41
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "usuarios"
#

INSERT INTO `usuarios` VALUES (1,'Julio Cesar Camargo','111.222.333-44','$2b$12$yderdeqKvvF4Kc/ZUsq6kOcr0r3IJOyEJIfXlMfaRyB.m93igQJ7y','juliocesar@gmail.com','05/12/1990','(62)9-9580-7060','Avenida T-63, nº 1, Qd. 1, Lt. 1','Edífico Agulhas Negras',1,1,'2023-01-19 21:40:44','2023-01-19 21:56:24');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "tipo_produtos"
#

INSERT INTO `tipo_produtos` VALUES (1,'MMORPG',1,'2023-01-19 21:37:17',NULL,'2023-01-19 21:42:28',1),(2,'Aventura',1,'2023-01-19 21:37:31',NULL,'2023-01-19 21:45:01',NULL),(3,'Esportes',1,'2023-01-19 21:37:37',NULL,NULL,NULL),(4,'Campanha',1,'2023-01-19 21:37:49',NULL,NULL,NULL);

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
  `criado_por_id_usuario` int(11) DEFAULT NULL,
  `alterado_em` timestamp NULL DEFAULT NULL,
  `alterado_por_id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `criado_por_id_usuario` (`criado_por_id_usuario`),
  KEY `alterado_por_id_usuario` (`alterado_por_id_usuario`),
  KEY `id_tipo_produto` (`id_tipo_produto`),
  CONSTRAINT `produtos_ibfk_2` FOREIGN KEY (`criado_por_id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `produtos_ibfk_3` FOREIGN KEY (`alterado_por_id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `produtos_ibfk_4` FOREIGN KEY (`id_tipo_produto`) REFERENCES `tipo_produtos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "produtos"
#

INSERT INTO `produtos` VALUES (2,'God of War 5','Novo lançamento!','R$199,90',10,5,1,NULL,4,'2023-01-19 21:48:43',1,NULL,NULL),(3,'GTA 7 - Rio de Janeiro','ROCKSTAR GAMES BRASIL!','R$699,90',10,6,1,NULL,2,'2023-01-19 21:50:07',1,'2023-01-19 21:55:07',1);

#
# Structure for table "carrinho"
#

DROP TABLE IF EXISTS `carrinho`;
CREATE TABLE `carrinho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produtos` varchar(255) DEFAULT NULL,
  `finalizado` tinyint(1) DEFAULT '0',
  `id_usuario` int(11) NOT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `alterado_em` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `carrinho_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "carrinho"
#

