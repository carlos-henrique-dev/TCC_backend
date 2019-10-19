/* configuração do CORS
configuração necessária para que o servidor aceite requisições de qualquer lugar
*/

module.exports = (req, res, next) => {
  res.header('Access-Controll-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
};
