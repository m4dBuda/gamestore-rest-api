module.exports = Object.freeze({
  // Mensagem e dados direcionados a testes

  // Usuarios
  mensagemTesteCreateUsuarios1: `Passo 1. Adiciona um novo usuário usando o bodyUsuario`,
  mensagemTesteCreateUsuarios2: `Passo 2. Tenta adicionar um novo usuário usando o bodyUsuario e não deve conseguir, pois o e-mail já está cadastrado`,
  mensagemTesteCreateUsuarios3: `Passo 3. Tenta adicionar um novo usuário usando o bodyUsuario após alterar o email (evitar erro de email repetido acima) e não deve conseguir, pois agora será bloqueado pelo CPF que já está cadastrado.`,
  mensagemTesteGetUsuarios1: `Passo 4. Busca todos os usuários no banco de dados`,
  mensagemTesteGetUsuarios2: `Passo 5. Busca o usuário criado no passo 1 por getById`,
  mensagemTestePutUsuarios1: `Passo 6. Atualiza os dados do usuário criado no passo 1`,
  mensagemTesteDeleteUsuarios1: `Passo 7. Inativa o usuário criado no passo 1`,
  mensagemTesteDeleteUsuarios2: `Passo 8. Ativa novamente o usuário criado no passo 1`,

  // Produtos
  mensagemTesteCreateProdutos1: 'Passo 1. Deve criar um produto com o bodyProduto.',
  mensagemTesteGetProdutos1: 'Passo 2. Deve buscar o produto criado no passo 1.',
  mensagemTesteGetProdutos2: 'Passo 3. Deve buscar todos os produtos.',
  mensagemTesteGetProdutos3: 'Passo 4. Deve buscar todos os produtos usando filtros na query.',
  mensagemTestePutProdutos1: 'Passo 5. Deve editar o produto criado no passo 1.',
  mensagemTesteDeleteProdutos1: 'Passo 6. Deve inativar o produto criado no passo 1.',
  mensagemTesteDeleteProdutos2: 'Passo 7. Deve ativar o produto criado no passo 1.',

  // Carrinhos
  mensagemTesteCarrinho1: 'Passo 1. Deve criar um novo carrinho.',
  mensagemTesteCarrinho2: 'Passo 2. Deve buscar todos os carrinhos do banco de dados.',
  mensagemTesteCarrinho3:
    'Passo 3. Deve buscar o ultimo carrinho não finalizado de um usuário específico.',
  mensagemTesteCarrinho4: 'Passo 4. Deve atualizar o carrinho criado no passo 1.',
  mensagemTesteCarrinho5: 'Passo 5. Deve inativar o carrinho criado no passo 1.',
  mensagemTesteCarrinho6: 'Passo 6. Deve ativar novamente o carrinho inativado no passo anterior.',

  // Strings fixas direcionadas à testes
  nomeTeste: 'Teste',
  nomeTesteProduto: 'Nome teste produto',
  nomeTesteDescricaoProduto: 'Nome teste descricao produto',
  nomeTesteEditado: 'Teste Editado',
  cpfTeste: '999.999.999-99',
  telefoneTeste: '(99)9-9999-9999',
  emailTeste: 'teste@example.com',
  senhaTeste: '123456',
  enderecoTeste: 'Rua T, Bloco T, Ap T',
  idTipoADMIN: 3,
  dataNascimentoTeste: '01/01/1990',

  // Nomes tabelas

  VIEW_USUARIOS: 'view_usuarios',
  VIEW_PRODUTOS: 'view_produtos',
  VIEW_CARRINHOS: 'view_carrinhos',

  // Mensagens para responses

  criadoComSucesso: 'criado com sucesso!',
  editadoComSucesso: 'editado com sucesso!',
  naoEncontrado: 'não encontrado!',

  // Strings para `tipo_conta` relacionado aos usuários

  ADMIN: 'ADMIN',
  OPERADOR: 'OPERADOR',
  FREE: 'FREE',
  VIP: 'VIP',

  // JWT KEY
  JWT_KEY: '$7#RRgUFT*9kdTEv5vL5tgEw%EW3JMGO',
});
