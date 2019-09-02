# Rotas de categorias

| Tipo   | Rota                      | Descrição                               | Parâmetros        |
| ------ | ------------------------- | --------------------------------------- | ----------------- |
| GET    | .../category/             | Retorna todas as categorias cadastradas | nenhum            |
| GET    | .../category/{categoryId} | Retorna uma categoria específica        | id da categoria   |
| POST   | .../category/             | Cadastra uma categoria nova             | { name: String }  |
| PATCH  | .../category/{categoryId} | Altera o nome da categoria              | { name: "value" } |
| DELETE | .../category/{categoryId} | Remove uma categoria                    | id da categoria   |

# Rotas de problemas

| Tipo   | Rota                 | Descrição                             | Parâmetros                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------ | -------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | .../issues/          | Retorna todos os problemas publicados | nenhum                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| GET    | .../issues/{issueId} | Retorna um problema específico        | id do problema                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| POST   | .../issues/          | Posta um problema novo                | Deve ser enviado usando Multipart form: (todos os parâmetros são obrigatórios) <br /> **category**: id da categoria em que o problema se enquadra; <br /> **authorId**: Id do autor da postagem; <br /> **authorName**: Nome do autor da postagem; <br /> **address**: Endereço onde foi tirada a foto; <br /> **longitude**: Coordenada do problema; <br/> **latitude**: Coordenada do problema; <br/> **description**: Descrição do problema |
| PATCH  | .../issues/{issueId} | Edita o problema                      | No parâmetro deve ser enviado **id** do problema <br /> E no corpo da requisição deve ser enviado um array de objetos, e cada objeto deve conter o nome da propriedade que será alterada e o novo valor: <br /> Ex: [ { propName: "description, value: "Nova descrição" } ]                                                                                                                                                                    |
| DELETE | .../issues/{issueId} | Remove uma categoria                  | id do problema                                                                                                                                                                                                                                                                                                                                                                                                                                 |

# Rotas de comentários

| Tipo   | Rota                         | Descrição                                      | Parâmetros                                                                                                                                                                                                 |
| ------ | ---------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | ../issues/comments/{issueId} | Adiciona um comentário na postagem selecionada | No parâmetro deve ser enviado o **id** do problema; <br/> No body deve ser enviado o seguinte objeto: <br/> `{ userID: String, userName: String, comment: String }` (todos os parâmetros são obrigatórios) |
| DELETE | ../issues/comments/{issueId} | Remove um comentário na postagem               | No parâmetro deve ser enviado o **id** do problema; <br/> No body deve ser enviado o **id** do comentário que será excluído: `{ commentId: String }`                                                       |

# Rotas para votação

| Tipo | Rota                               | Descrição                                  | Parâmetros                                                                                                                       |
| ---- | ---------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| POST | ../issues/support/add/{issueId}    | Adiciona um voto de apoio à uma publicação | No parâmetro deve ser enviado o **id** da publicação; <br/> E no body, o **id** do usuário que está votando: `{ voter: String }` |
| POST | ../issues/support/remove/{issueId} | Remove um voto de apoio à uma publicação   | No parâmetro deve ser enviado o **id** da publicação; <br/> E no body, o **id** do usuário que está votando: `{ voter: String }` |


## TODO
- [ ] Rota para buscar postagens de uma categoria específica;
- [ ] Alterar a imagem de uma postagem;
- [ ] Aceitar array de imagens;
- [ ] Rotas de perfil de usuário;
- [ ] Rotas para gerar relatórios;
