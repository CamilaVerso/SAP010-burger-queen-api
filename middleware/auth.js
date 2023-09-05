const jwt = require('jsonwebtoken');
// é usado para criar e verificar tokens JWT

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  } // exportando uma função que recebe um segredo como parâmetro.
  // Esse segredo será usado para verificar a validação dos tokens
  // O middleware verifica se o cabeçalho de autorização (authorization)
  // está presente na solicitação. Se não estiver presente, ele passa para
  // o próximo middleware usando next().

  const [type, token] = authorization.split(' '); // Se o cabeçalho de autorização estiver presente, ele divide o valor do cabeçalho em tipo e token. Ele verifica se o tipo é "bearer" (um esquema de autenticação JWT comum).

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    /* Em seguida, ele verifica se o token é válido usando jwt.verify. Se o token for inválido (ou seja, não puder ser verificado), ele chama next(403) para indicar que o acesso é proibido. Se o token for válido, ele poderá ser decodificado

    // TODO: Verificar identidad del usuario usando `decodeToken.uid`--  implementar a verificação da identidade do usuário usando o ID de usuário (uid) decodificado do token. */
  });
};

module.exports.isAuthenticated = (req) => (
  // TODO: decidir por la informacion del request si la usuaria esta autenticada
  false
); // Essa função deve retornar true se a usuária estiver autenticada e false caso contrário. A lógica para verificar se a usuária está autenticada depende das informações do objeto req. Você deve completar essa função com a lógica adequada para verificar a autenticação da usuária. Um exemplo de implementação poderia ser a verificação do token JWT.

module.exports.isAdmin = (req) => (
  // TODO: decidir por la informacion del request si la usuaria es admin
  false
); // Essa função deve retornar true se a usuária for uma admin e false caso contrário. Assim como na função anterior, a lógica para verificar se a usuária é uma admin também depende das informações do objeto req. Você deve implementar a lógica adequada para verificar se a usuária tem privilégios de admin.

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
); // Essa função middleware verifica se a usuária está autenticada. Se ela não estiver autenticada, chama o next com o código de status 401 (Unauthorized), indicando que a usuária não tem permissão para acessar a rota. Caso contrário, permite que o fluxo continue passando para o próximo middleware ou rota.

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
); // Essa função middleware combina verificações de autenticação e permissões de admin. Se a usuária não estiver autenticada, chama o next com o código de status 401 (Unauthorized). Se a usuária estiver autenticada, mas não for uma admin, chama o next com o código de status 403 (Forbidden), indicando que a usuária autenticada não tem permissão para acessar a rota. Caso contrário, permite que o fluxo continue passando para o próximo middleware ou rota.
