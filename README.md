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
