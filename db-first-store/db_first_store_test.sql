# Host: localhost  (Version 8.0.11)
# Date: 2023-03-10 20:52:49
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
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

#
# Data for table "tipo_usuario"
#
INSERT INTO
  `tipo_usuario`
VALUES
  (1, 'FREE'),
(2, 'VIP'),
(3, 'ADMIN'),
(4, 'OPERADORES');

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
  `cep` varchar(10) DEFAULT NULL,
  `id_tipo_usuario` int(2) DEFAULT '1',
  `ativo` tinyint(1) DEFAULT '1',
  `usuario_logado` tinyint(1) DEFAULT '0',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `alterado_em` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

#
# Data for table "usuarios"
#
INSERT INTO
  `usuarios`
VALUES
  (
    1,
    'Julio',
    '111.222.333-44',
    '$2b$12$YS7scSb1Vyn5KPJfNcLaTO4tegbWGrRQ.i/aDEc8DrSwzSBZB9k06',
    'juliocesar@gmail.com',
    '05/12/1990',
    '(62)9-9988-7060',
    'Avenida T-63, Edíficio Agulhas Negras, Bloco 1, Apto 1604',
    'Setor Bueno',
    '47813-238',
    1,
    1,
    1,
    '2023-01-19 21:40:44',
    '2023-02-08 21:37:32'
  ),
(
    2,
    'Leo',
    '444.555.666-77',
    '$2b$12$fvVpZva715Tqc7KvV0wfc.JlfC1asLQRJiG37suDRQlBfBQieBOcO',
    'leonidio@gmail.com',
    '05/12/1990',
    '(62)9-8880-7060',
    'Rua Barão de Mauá, Qd. 32, Lt. 68',
    'Setor Aeroporto',
    '60510-175',
    3,
    1,
    0,
    '2023-01-23 20:45:19',
    NULL
  ),
(
    3,
    'João Otávio',
    '666.777.888-99',
    '$2b$12$4LYPDT3mBmKYuP2A7pHKsuS8bYYl3E8CoumKRip6zInnSs1ruuGg2',
    'otaviodev@gmail.com',
    '05/12/1990',
    '(62)9-8562-7060',
    'Avenida Brasil, nº 100, Qd. 10, Lt. 20',
    'Setor Macaranã',
    '29164-784',
    3,
    1,
    0,
    '2023-01-23 20:45:40',
    NULL
  ),
(
    4,
    'Jean',
    '999.888.333-44',
    '$2b$12$kZwCKz3eyYxUXYKBiptMjuEiChVkeXVRL.BDsNWVudY2H4pL/aDQ2',
    'jean@gmail.com',
    '05/12/1990',
    '(62)9-8520-7060',
    'Avenida Manoel Monteiro, nº 1, Qd. 1, Lt. 1',
    'Setor Central',
    NULL,
    2,
    1,
    0,
    '2023-01-25 20:12:46',
    NULL
  );

#
# Structure for table "tipo_produtos"
#
DROP TABLE IF EXISTS `tipo_produtos`;

CREATE TABLE `tipo_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `alterado_em` timestamp NULL DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `tipo_produtos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

#
# Data for table "tipo_produtos"
#
INSERT INTO
  `tipo_produtos`
VALUES
  (
    1,
    'Campanha',
    1,
    '2023-02-17 21:42:54',
    '2023-02-17 21:43:47',
    1
  ),
(
    2,
    'RPG',
    1,
    '2023-02-17 21:42:58',
    '2023-02-17 21:43:52',
    3
  ),
(
    3,
    'Open World',
    1,
    '2023-02-17 21:43:02',
    '2023-02-17 21:43:55',
    3
  ),
(
    4,
    'Aventura',
    1,
    '2023-02-17 21:43:08',
    '2023-02-17 21:43:57',
    3
  ),
(
    5,
    'Ação',
    1,
    '2023-02-17 21:43:12',
    '2023-02-17 21:44:01',
    2
  ),
(
    6,
    'Puzzle',
    1,
    '2023-02-17 21:43:20',
    '2023-02-17 21:44:12',
    4
  ),
(
    7,
    'Teste Editado',
    1,
    '2023-02-27 18:25:22',
    '2023-02-27 18:25:22',
    3
  );

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

#
# Data for table "produtos"
#
INSERT INTO
  `produtos`
VALUES
  (
    1,
    'God of War 5',
    'Novo lançamento!',
    'R$179,90',
    3,
    10,
    1,
    'OneDrive/prod_image/prod_1.jpg',
    1,
    '2023-01-19 21:48:43',
    NULL,
    1
  ),
(
    2,
    'GTA 7 - Rio de Janeiro',
    'ROCKSTAR GAMES BRASIL!',
    'R$299,90',
    15,
    9,
    1,
    'OneDrive/prod_image/prod_2.jpg',
    3,
    '2023-01-19 21:48:43',
    NULL,
    2
  ),
(
    3,
    'Assassins Creed - Odyssey',
    'Ubisoft',
    'R$199,90',
    5,
    7,
    1,
    'OneDrive/prod_image/prod_3.jpg',
    3,
    '2023-01-19 21:48:43',
    '2023-03-10 20:34:33',
    2
  ),
(
    4,
    'God of War - Ragnarok',
    'Descrição Teste',
    'R$279,90',
    1,
    8,
    1,
    'OneDrive/prod_image/prod_4.jpg',
    1,
    '2023-01-28 18:19:46',
    '2023-01-28 18:44:43',
    2
  ),
(
    5,
    'Elden Ring',
    'Lançado em 2022, ganhador do premio XBOX',
    'R$399,90',
    4,
    9,
    1,
    'OneDrive/prod_image/prod_5.jpg',
    2,
    '2023-01-25 21:37:38',
    NULL,
    3
  ),
(
    6,
    'Dark Souls 3',
    '',
    'R$379,90',
    7,
    9,
    0,
    'OneDrive/prod_image/prod_6.jpg',
    4,
    '2023-01-25 21:38:18',
    NULL,
    2
  ),
(
    7,
    'God of War - Ragnarok',
    'Lançado em 2022, ganhador do premio XBOX',
    'R$279,90',
    1,
    10,
    1,
    'https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg',
    3,
    '2023-03-10 20:09:53',
    NULL,
    3
  );

#
# Structure for table "carrinhos"
#
DROP TABLE IF EXISTS `carrinhos`;

CREATE TABLE `carrinhos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produtos` varchar(255) DEFAULT NULL,
  `finalizado` tinyint(1) DEFAULT '0',
  `ativo` tinyint(1) DEFAULT '1',
  `id_usuario` int(11) NOT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `alterado_em` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `carrinhos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

#
# Data for table "carrinhos"
#
INSERT INTO
  `carrinhos`
VALUES
  (
    1,
    '2, 3, 4, 5',
    1,
    1,
    1,
    '2023-01-24 20:15:54',
    '2023-01-24 21:53:49'
  ),
(
    2,
    '2, 3, 4, 5',
    1,
    1,
    1,
    '2023-01-24 21:13:20',
    '2023-01-24 21:53:49'
  ),
(
    3,
    '2, 3, 4, 5',
    1,
    1,
    1,
    '2023-01-24 21:13:35',
    '2023-01-24 21:53:49'
  ),
(
    4,
    '2, 3, 4, 5',
    1,
    1,
    1,
    '2023-01-24 21:14:37',
    '2023-01-24 21:53:49'
  ),
(
    5,
    '2, 3, 4, 5',
    1,
    1,
    1,
    '2023-01-24 21:15:51',
    '2023-01-24 21:53:49'
  ),
(6, '4', 0, 0, 1, '2023-01-24 21:53:49', NULL),
(
    7,
    '3, 3, 4, 6, 1',
    1,
    0,
    4,
    '2023-01-25 21:38:58',
    '2023-03-02 19:41:21'
  ),
(
    8,
    '3, 3, 4, 6, 1',
    1,
    0,
    4,
    '2023-02-03 21:43:13',
    '2023-03-02 19:41:21'
  ),
(
    9,
    '3, 3, 4, 6, 1',
    1,
    0,
    4,
    '2023-02-06 19:59:02',
    '2023-03-02 19:41:21'
  ),
(
    10,
    '6, 1, 5, 7',
    1,
    0,
    2,
    '2023-02-06 21:18:30',
    '2023-02-06 21:21:15'
  ),
(
    11,
    '6, 1, 5, 7',
    1,
    0,
    2,
    '2023-02-06 21:18:33',
    '2023-02-06 21:21:15'
  ),
(
    12,
    '6, 1, 5, 7',
    1,
    0,
    2,
    '2023-02-06 21:20:42',
    '2023-02-06 21:21:15'
  ),
(
    13,
    '1, 2, 3',
    1,
    1,
    2,
    '2023-02-06 21:21:15',
    '2023-02-06 21:25:39'
  ),
(
    14,
    '1, 2, 3',
    0,
    0,
    2,
    '2023-02-07 21:45:17',
    '2023-02-07 21:48:17'
  ),
(
    15,
    '3, 3, 4, 6, 1',
    1,
    0,
    4,
    '2023-02-13 21:36:47',
    '2023-03-02 19:41:21'
  ),
(
    16,
    '3, 3, 4, 6, 1',
    1,
    0,
    4,
    '2023-02-13 21:42:52',
    '2023-03-02 19:41:21'
  ),
(
    17,
    '3, 3, 4, 6, 1',
    1,
    0,
    4,
    '2023-03-02 19:39:22',
    '2023-03-02 19:41:21'
  ),
(
    18,
    '3, 4, 4',
    0,
    1,
    4,
    '2023-03-02 19:41:22',
    '2023-03-02 19:43:22'
  );

#
# View "view_carrinhos"
#
DROP VIEW IF EXISTS `view_carrinhos`;

CREATE ALGORITHM = UNDEFINED VIEW `view_carrinhos` AS
SELECT
  `carrinhos`.`id`,
  `carrinhos`.`id_produtos`,
  `carrinhos`.`finalizado`,
  `carrinhos`.`ativo`,
  `carrinhos`.`id_usuario`,
  `usuarios`.`nome`,
  `carrinhos`.`criado_em`,
  `carrinhos`.`alterado_em`
FROM
  (
    `carrinhos`
    JOIN `usuarios` ON ((`carrinhos`.`id_usuario` = `usuarios`.`id`))
  );

#
# View "view_produtos"
#
DROP VIEW IF EXISTS `view_produtos`;

CREATE ALGORITHM = UNDEFINED VIEW `view_produtos` AS
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
  (
    (
      `produtos`
      LEFT JOIN `usuarios` ON ((`produtos`.`id_usuario` = `usuarios`.`id`))
    )
    LEFT JOIN `tipo_produtos` ON (
      (
        `produtos`.`id_tipo_produto` = `tipo_produtos`.`id`
      )
    )
  );

#
# View "view_usuarios"
#
DROP VIEW IF EXISTS `view_usuarios`;

CREATE ALGORITHM = UNDEFINED VIEW `view_usuarios` AS
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
  `usuarios`.`cep`,
  `usuarios`.`id_tipo_usuario`,
  `tipo_usuario`.`tipo_conta`,
  `usuarios`.`ativo`,
  `usuarios`.`criado_em`,
  `usuarios`.`alterado_em`
FROM
  (
    `usuarios`
    LEFT JOIN `tipo_usuario` ON (
      (
        `usuarios`.`id_tipo_usuario` = `tipo_usuario`.`id`
      )
    )
  )
WHERE
  (`usuarios`.`ativo` = 1);