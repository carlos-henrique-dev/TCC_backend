# Descrição
  Repositório do backend do aplicativo <b>MS Alerta</b>

  O projeto foi desenvolvido com node na versão 10.16.3

  Abaixo estão algumas instruções para instalação e uma breve documentação das rotas disponíveis

## Instruções de uso

para instalar as dependências, utilize o comando: ```yarn``` na raiz do projeto

e para rodar, utilize o comando: ```npm run dev```

o sistema utiliza algumas variáveis de ambiente, para adicioná-las crie um arquivo ```.env``` na raiz do sistema e insira os valores abaixo:

NODE_ENV="ambiente do sistema <b>development</b> ou <b>production</b> <br>

STORAGE_TYPES="tipo de armazenamento. <b>local</b> para salvar imagens na pasta tmp ou <b>s3</b> para salvar na aws <br>
AWS_BUCKET="nome do bucket na amazon s3" <br>
AWS_ACCESS_KEY_ID="id de acesso" <br>
AWS_SECRET_ACCESS_KEY="chave de acesso ao bucket" <br>
AWS_DEFAULT_REGION="região do bucket. ex: us-east-2" <br>

MONGO_URL="sua url do mongoDB local" <br>****
MONGO_ATLAS_URL="sua url no mongo atlas" <br>

---

## Rotas

### Usuário

|  Tipo  | Rota  | Descrição | Parâmetros |
| ------------ | ------------ | ------------ | ------------ |
| ```POST```  |  .../user/signup | Cria uma conta  | <b>Multipart form</b> <br/># name: string <br/> avatar: arquivo (jpeg/pjpeg/png) <br/># email: string <br/># password: string <br/><br/>  |
| ```POST```  | .../user/login  |  Faz o login  |  <b>json:</b>  { <br/># "email": "string",<br/> # "password": "string"<br/>}  <br/><br/> |
| ```PATCH```  | .../user/:id  | Atualiza o perfil  | ```#  :id = _id do usuário na url ``` <br/>  <b>Multipart form</b> <br/> name: string <br/> avatar: arquivo (jpeg/pjpeg/png) <br/> password: string <br/>  |
| ```DELETE```  | .../user/:id  | Deleta a conta  | ```#  :id = _id do usuário na url ```  |
| ```POST```  | .../user/forgotPassword  | Solicita alteração de senha  | <b>json:</b>  { # "email": "string", }   |
| ```POST```  | .../user/resetPassword  | Envia o token e a senha nova  |  <b>json:</b>  { <br/># "email": "string",<br/># "token": number,<br/># "password": "string"<br/>} <br/><br/> *o token é recebido no e-mail informado na rota "forgotPassword" |

campos marcados com # são obrigatórios                                                                                                                                                                                                                                                                                                   

### Categorias

|  Tipo  | Rota  | Descrição | Parâmetros |
| ------------ | ------------ | ------------ | ------------ |
| ```POST```  |  .../category | Cria uma categoria  | <b>json:</b>  {<br/> # "name": "string", <br/> #"code": "string"  }  <br/> *code é a abreviatura da categoria |
| ```PATCH```  | .../category/:id  | Atualiza a categoria  | ```#  :id = _id da categoria na url ``` <br/> <b>json:</b> [ <br/> {<br/> # "propName": "string", <br/> #"value": "string"  } <br/> ] <br/> *ex : [ { propName: code, value: novoCode } ]  |
| ```DELETE```  | .../category/:id  | Deleta a categoria  | ```#  :id = _id da categoria na url ```  |
| ```GET```  |  .../category/:id  | Busca uma categoria  | ```#  :id = _id da categoria na url ```  |
| ```GET```  | .../category  | Busca todas as categorias  |  nenhum |

campos marcados com # são obrigatórios

### Problemas

|  Tipo  | Rota  | Descrição | Parâmetros |
| ------------ | ------------ | ------------ | ------------ |
| ```POST```  |  .../issues | Cria uma publicação  | <b>Multipart form</b> <br/># authorId: string <br/># authorName: string <br/> authorAvatar: string <br/> # files: arquivo (jpeg/pjpeg/png) <br/>files: arquivo (jpeg/pjpeg/png) <br/>files: arquivo (jpeg/pjpeg/png) <br/># categoryId: string <br/># street: string<br/># neighborhood: string<br/># city: string<br/># longitude: string<br/># latitude: string<br/># description: string <br/><br/> *pelo menos uma foto é necessária. no máximo 3 fotos  |
| ```PATCH```  | .../issues/:id  | Atualiza a publicação  | ```#  :id = _id da publicação na url ``` <br/> <b>json:</b> [ <br/> {<br/> # "propName": "string", <br/> # "value": "string" <br/>  } <br/> ] <br/> *ex : [ { propName: description, value: novaDescrição } ]  |
| ```DELETE```  | .../issues/:id  | Deleta a publicação  | ```#  :id = _id da publicação na url ```  |
| ```GET```  | .../issues  | Busca todas as pulicações  | nenhum   |
| ```GET```  |  .../issues/:id  | Busca uma publicação  | ```#  :id = _id da publicação na url ```  |
| ```GET```  |  .../issues/user/:id  | Busca publicações de um usuário  | ```#  :id = _id de um usuário na url ```  |
| ```GET```  |  .../issues/category/:id  | Busca publicações de uma categoria  | ```#  :id = _id de uma categoria na url ```  |

##### Comentários nos problemas
|  Tipo  | Rota  | Descrição | Parâmetros |
| ------------ | ------------ | ------------ | ------------ |
| ```POST```  |  .../issues/comments/:id | Cria uma categoria  |  ```#  :id = _id da publicação na url ``` <br/> <b>json:</b>  {<br/> # "userId": "string", <br/> #"userName": "string", <br/> #"comment": "string"  }  <br/>  |
| ```DELETE```  | .../issues/comments/:id  | Deleta o comentário  | ```#  :id = _id da publicação na url ```  <br/> <b>json:</b>  { # "commentId": "string",  }  |

##### Apoio aos problemas
|  Tipo  | Rota  | Descrição | Parâmetros |
| ------------ | ------------ | ------------ | ------------ |
| ```POST```  |  .../issues/support/add/:id | Apoia a publicação  |  ```#  :id = _id da publicação na url ``` <br/> <b>json:</b>  {<br/> # "voter": "string" <br/>  *voter recebe o id do usuário que está apoiando }  <br/> |
| ```POST```  | .../issues/suport/remove/:id  | Retira o apoio  |  ```#  :id = _id da publicação na url ``` <br/> <b>json:</b>  {<br/> # "voter": "string" <br/>  *voter recebe o id do usuário que está apoiando }  <br/>   |

campos marcados com # são obrigatórios


### Relatórios

|  Tipo  | Rota  | Descrição | Parâmetros |
| ------------ | ------------ | ------------ | ------------ |
| ```GET```  |  .../reports/byCategory  | busca um relatório das publicaçÕes  | nenhum |

<br/><br/><br/><br/><br/>
###### Obs:
  Para compreender melhor as rotas, abra o arquivo routes.json no software <b>Insomnia REST client</b> 