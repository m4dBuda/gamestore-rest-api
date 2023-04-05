const axios = require('axios');
const config = require('../../config/config');

module.exports = {
  criarCobrança: async (req, res) => {
    try {
      const { query, body } = req;

      const api = axios.create({
        baseURL: 'https://sandbox.api.pagseguro.com',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.development.keyPagSeguro}`,
          'x-api-version': '4.0',
        },
      });

      let tipoPagamento;
      let bodyCobrança;

      if (!query) {
        return res.status(401).send({ error: 'É necessário escolher uma forma de pagamento.' });
      }

      if (query.cartao) {
        tipoPagamento = 'CREDIT_CARD';

        bodyCobrança = {
          reference_id: body.id_carrinho,
          description: body.descricao,
          amount: {
            value: body.valor_total,
            currency: 'BRL',
          },
          payment_method: {
            type: tipoPagamento,
            installments: 1,
            capture: false,
            card: {
              number: body.numero_cartao,
              exp_month: body.mes_vencimento_cartao,
              exp_year: body.ano_vencimento_cartao,
              security_code: body.codigo_seguranca_cartao,
              holder: {
                name: body.nome_pessoa,
              },
            },
          },
        };
      }

      if (query.boleto) {
        tipoPagamento = 'BOLETO';

        const diaGerado = new Date();
        const diaVencimentoBoleto = diaGerado.getDate() + 3;

        bodyCobrança = {
          reference_id: body.id_carrinho,
          description: body.descricao,
          amount: {
            value: body.valor_total,
            currency: 'BRL',
          },
          payment_method: {
            type: tipoPagamento,
            boleto: {
              due_date: diaVencimentoBoleto,
              instruction_lines: {
                line_1: 'Pagamento processado para DESC Fatura',
                line_2: 'Via PagSeguro',
              },
              holder: {
                name: body.nome_pessoa,
                tax_id: body.id_carrinho,
                email: body.email,
                adress: body.endereco,
              },
            },
          },
          notification_urls: [
            'https://yourserver.com/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/',
          ],
        };
      }

      const response = api.post('/charges', bodyCobrança);

      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar cobrança' });
    }
  },
};
