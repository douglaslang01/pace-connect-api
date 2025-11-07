# Pace Connect API

API para conectar corredores com pace semelhante, promovendo treinos em grupo sob supervisão de treinador.

## Endpoints principais

- POST /users/register — Registro de aluno ou treinador
- POST /users/login — Login (retorna token JWT)
- GET /users — Listar alunos (autenticado)
- GET /users/{id} — Buscar dados de um aluno (autenticado)
- POST /trainings — Registrar treino (usuário autenticado)
- GET /trainings/mine — Buscar treinos do usuário logado
- GET /trainings/user/{userId} — Buscar treinos de um usuário (treinador)
- DELETE /trainings/{id} — Excluir treino
- GET /trainings/consolidate/{userId} — Consolidar pace de um aluno (treinador)
- GET /trainings/group — Agrupar alunos por pace (treinador)
- GET /docs — Documentação Swagger

## Autenticação
- JWT via header Authorization: Bearer <token>

## Modelos
- Usuário: usuario, senha, nascimento, sexo, experiencia, objetivo, pace, tipo
- Treino: dataHora, distancia, tempoTotal (hora), pace

## Observações
- Campos "id" são inteiros incrementais e automáticos
- Dados armazenados em memória
- API dividida em camadas: routes, controllers, service, model
- Documentação completa no Swagger

## Como rodar
```powershell
npm install
npm start
```
Acesse http://localhost:3000/docs para ver a documentação.

# Execução dos Testes  

## Testes de REST API
```Powershell
npm run test-controller
```
O arquivo mochawesome.html será gerado dentro do diretório mochawesome-report.

## Testes de Performance

### Execução simples no K6  
```Powershell
k6 run .\test\performance\<user/training>\nomeDoTeste.test.js
```

### Execução com relatório em tempo real  
O K6 possui um **dashboard web** que pode ser habilitado via variáveis de ambiente:  

```Powershell
$env:BASE_URL="https://sua-api.com" ; $env:K6_WEB_DASHBOARD="true" ; k6 run .\test\performance\<user/training>\nomeDoTeste.test.js
```

Acompanhe no navegador em: **http://localhost:5665/**  

### Execução com exportação do relatório em HTML  
Também é possível exportar o relatório automaticamente:  

```powershell
$env:BASE_URL="https://sua-api.com" ; $env:K6_WEB_DASHBOARD="true" ; $env:K6_WEB_DASHBOARD_EXPORT="html-report.html" ; k6 run .\test\performance\<user/training>\nomeDoTeste.test.js
```

O arquivo **`html-report.html`** será gerado dentro da raiz do projeto. 
