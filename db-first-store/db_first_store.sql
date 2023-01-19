# Host: localhost  (Version 8.0.11)
# Date: 2023-01-19 20:45:55
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


#
# Structure for table "tipo_produto"
#

DROP TABLE IF EXISTS `tipo_produto`;
CREATE TABLE `tipo_produto` (
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
# Data for table "tipo_produto"
#


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
  KEY `id_tipo_produto` (`id_tipo_produto`),
  KEY `criado_por_id_usuario` (`criado_por_id_usuario`),
  KEY `alterado_por_id_usuario` (`alterado_por_id_usuario`),
  CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`id_tipo_produto`) REFERENCES `tipo_produto` (`id`),
  CONSTRAINT `produtos_ibfk_2` FOREIGN KEY (`criado_por_id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `produtos_ibfk_3` FOREIGN KEY (`alterado_por_id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "produtos"
#


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

