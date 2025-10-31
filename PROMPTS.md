Objetivo Criar uma API Rest para conectar corredores com pace semelhante, promovendo treinos em grupo sob supervisão de um treinador.

Contexto
- A API possui as seguintes funcionalidades: registro de aluno e treinador, busca de todos alunos e professores, busca de dados de um aluno/professor baseado no seu id, registro de treinos, busca de treinos, exclusão de treinos, consolidação do pace e agrupamento de grupos por pace.
- Alunos têm acesso ao histórico de treinos realizados de por si mesmo (ex.: endpoint /trainings/mine).
- Apenas os treinadores têm acesso completo aos histórico de treinos de todos os alunos, consolidação do pace e agrupamento por pace.
- Para que o aluno possa consultar seu progresso, ele precisa estar logado.
- Para que o treinador possa ter acesso completo aos histórico de treinos de todos os alunos, consolidação do pace e agrupamento por pace, ele deve estar logado.
- O cadastro de  alunos e treinador deve ser o mesmo, diferenciando pelo tipo de cadastro (aluno / treinador). O cadastro deverá conter os campos: usuario; senha; data de nascimento; sexo; Nível de experiência (iniciante, intermediário ou avançado); Objetivo (performance, saúde ou socialização); pace (em segundos) e Tipo (treinador ou aluno).
- O Registro dos treinos deve ser realizado pelo o usuario logado. Os alunos ou treinadores podem registrar seus treinos com os seguintes dados: Data e horário; Distância; Tempo total (do tipo hora); pace (em segundos).
- A consolidação do Pace deve ser calculada através da média do pace sobre o histórico de treinos dos últimos 30 dias; o resultado atualiza o campo “pace” no cadastro do aluno; treinos com dados incompletos (sem distância ou pace) são ignorados. A consolidação pode ser feito  por aluno ou para todos os alunos.
- O agrupamento por pace deverá agrupar alunos com base no pace (registrado em segundos) consolidado utilizando intervalos de 30 em 30 segundos (ex: 4:00–4:30 min/km, 4:30–5:00 min/km) e retornar os grupos de alunos em sua resposta (Ex.: endpoint "/trainings/group").
- Os campos id de usuarios e treinos devem ser do tipo inteiro incrimental.


Regras
- Não me pergunte nada, só faça.
- A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que API for implementada. O Swagger também deve contemplar os status code de erro que serão implementados na API.
- Adicione um endpoint para renderizar o Swagger.
- Construa um arquivo README para descrever o projeto
- Divida a API em camadas: routes, controllers, service e model
- Armazene os dados da API em um banco de dados em memória
- Utilize a biblioteca express para construir a API Rest
- Utilize "/" ao invés de "-" nos endpoints.
- Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto. Espero que retorne apenas o token.