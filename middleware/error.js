const httpErrors = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  500: 'Internal server error',
};

const isKnownHTTPErrorStatus = (num) => (
  typeof num === 'number' && Object.keys(httpErrors).indexOf(`${num}`) >= 0
);

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, resp, next) => {
  const statusCode = (isKnownHTTPErrorStatus(err))
    ? err
    : err.statusCode || 500;
  const message = err.message || httpErrors[statusCode] || err;

  if (statusCode === 500) {
    console.error(statusCode, message);
  }

  resp.status(statusCode).json({ statusCode, message });
  next();
};

/*  Este é um middleware de tratamento de erros. Ele lida com erros que podem ocorrer durante o processamento de uma solicitação. Aqui estão os principais pontos do arquivo:

Ele define um objeto chamado httpErrors que mapeia códigos de status HTTP para mensagens de erro correspondentes.
Ele exporta uma função middleware que recebe quatro parâmetros: err, req, resp e next.
O middleware verifica se o err é um código de status HTTP válido(400, 401, 403, etc.) ou um erro personalizado.Se for um código de status válido, ele usa a mensagem correspondente do httpErrors.Caso contrário, ele usa a mensagem de erro fornecida.
Se o código de status for 500(erro interno do servidor), ele também registra a mensagem de erro no console.
Em seguida, ele define o status de resposta e retorna um JSON com o código de status e a mensagem de erro.
Por fim, ele chama next() para passar o controle para o próximo middleware ou rota.*/