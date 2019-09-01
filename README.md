# Rotas de categorias

| Tipo   | Rota                    | Descrição                               | Parâmetros        |
| ------ | ----------------------- |
| GET    | .../category/           | Retorna todas as categorias cadastradas | nenhum            |
| GET    | .../category/categoryId | Retorna uma categoria específica        | id da categoria   |
| POST   | .../category/           | Cadastra uma categoria nova             | { name: String }  |
| PATCH  | .../category/categoryId | Altera o nome da categoria              | { name: "value" } |
| DELETE | .../category/categoryId | Remove uma categoria                    | id da categoria   |


# Rotas de problemas

| Tipo   | Rota               | Descrição                             | Parâmetros                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ------------------ |
| GET    | issues/            | Retorna todos os problemas publicados | nenhum                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| GET    | .../issues/issueId | Retorna um problema específico        | id do problema                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| POST   | .../issues/        | Posta um problema novo                | Deve ser enviado usando Multipart form: <br /> **file**: image.jpeg/pjpeg/png no máximo 10mb; <br /> **category**: id da categoria em que o problema se enquadra; <br /> **authorId**: id do autor da postagem; <br /> **authorName**: nome do autor da postagem; <br />  **address**: Endereço onde foi tirada a foto; <br /> **longitude**: coordenada do problema; <br /> **latitude**: coordenada do problema; <br /> **description**: Descrição do problema; |
| PATCH  | .../issues/issueId | Edita o problema                      | No parâmetro deve ser enviado id do problema <br /> E no corpo da requisição deve ser enviado um array de objetos, e cada objeto deve conter o nome da propriedade que será alterada e o novo valor: <br /> Ex:  [ { propName: "description, value: "Nova descrição" } ]                                                                                                                                                                                          |
| DELETE | .../issues/issueId | Remove uma categoria                  | id do problema                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
