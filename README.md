### Back-end do projeto Be The Hero construído durante a semana OmniStack11 da RocketSeat 🚀

Be The Hero é uma plataforma onde ONGs podem cadastrar casos que precisam da ajuda de hérois 💜; <br />
Estes heróis podem ver os casos cadastrados por ONGs e entrar em contato com a ONG através de e-mail ou WhatsApp;

### Executando a aplicação:

``` 
#para instalar as dependências do projeto <br />
npm install

#para criar o banco de dados <br />
npx knex migrate:latest

#para executar os testes projeto e garantir sua integridade <br />
npm test

#para executar o projeto <br />
npm start
```
API pública: bruno-be-the-hero.herokuapp.com

### API
## Ongs

POST /ongs
```json
{
	"name": "ONG",
	"email": "ong@email.com.br",
	"whatsapp": "(45) 9999 9999",
	"city": "cidade",
	"uf": "UF"
}
```
Resposta:
```json
{"id": "abcd1234"}
```
GET /ongs
```json
{
  "id": "abcd1234",
  "name": "ONG",
  "email": "ong@email.com.br",
  "whatsapp": "(45) 9999 9999",
  "city": "cidade",
  "uf": "UF"
}
```

## Session
POST /sessions
```json
{
	"id":"{ong_id}"
}
```
Resposta:
```json
{"name": "ONG"}
```

## Profile
GET /profile

Header: `Authorization: {ong_id}`
<br />
Resposta:
```json
[
  {
    "id": 2,
    "title": "caso 8",
    "description": "descrição",
    "value": "120",
    "ong_id": "c8a16a7c"
  }
]
```

## Incidents
POST /incidents
<br />
Header: `Authorization: {ong_id}`

```json
{
	"title": "caso 8",
	"description": "descrição",
	"value": "120"
}
```

Resposta:
```json
{
  "id": 2
}
```

GET /incidents
```json
[
  {
    "id": 2,
    "title": "caso 8",
    "description": "descrição",
    "value": "120",
    "ong_id": "c8a16a7c",
    "name": "Nome da ONG",
    "email": "betheheromailer@gmail.com",
    "whatsapp": "+999999999999999",
    "city": "cidade",
    "uf": "uf"
  }
]
```
DELETE /incidents/{ong_id}
<br />
Header: `Authorization: {ong_id}`


