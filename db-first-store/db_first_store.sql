# Host: localhost  (Version 8.0.11)
# Date: 2023-01-11 21:59:56
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "produtos"
#

DROP TABLE IF EXISTS `produtos`;
CREATE TABLE `produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `preco` varchar(255) DEFAULT NULL,
  `rating` int(2) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `imagem` varchar(255) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `criado_por_id_usuario` int(11) DEFAULT NULL,
  `alterado_em` timestamp NULL DEFAULT NULL,
  `alterado_por_id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "produtos"
#

INSERT INTO `produtos` VALUES (1,'Primeiro Produto','1000',5,1,NULL,'Produto Teste','2023-01-10 21:58:37',NULL,NULL,NULL),(2,'Produto editado','2000',3,1,'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg','Teste de edição de produto','2023-01-11 20:22:13',NULL,'2023-01-11 20:31:03',NULL),(3,'Edição de teste 2','2000',3,1,'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg','Teste de edição de produto','2023-01-11 20:23:14',NULL,'2023-01-11 20:41:58',NULL),(4,'Novo produto de teste','1500',1,1,'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg','Teste de criação de produto','2023-01-11 20:23:44',NULL,NULL,NULL),(5,'Novo produto de teste','1500',1,1,'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg','Teste de criação de produto','2023-01-11 20:25:15',NULL,NULL,NULL),(6,'Novo produto de teste','1500',1,1,'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg','Teste de criação de produto','2023-01-11 20:25:31',NULL,NULL,NULL),(7,'Novo produto de teste','1500',1,1,'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg','Teste de criação de produto','2023-01-11 20:25:45',NULL,NULL,NULL);

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
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `alterado_em` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "usuarios"
#

