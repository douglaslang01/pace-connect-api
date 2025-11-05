Feature: Agrupamento de alunos por pace

    Scenario: CT41 - Agrupamento sem autenticação
        Given que não estou autenticado
        When envio uma requisição GET para "/trainings/group" sem o header Authorization
        Then o sistema deve retornar status 401
        And deve exibir mensagem de autenticação obrigatória

    Scenario: CT42 - Agrupamento com token inválido
        Given que estou autenticado com um token inválido
        When envio uma requisição GET para "/trainings/group" com o header Authorization: Bearer <token inválido>
        Then o sistema deve retornar status 403
        And deve exibir mensagem de token inválido

    Scenario: CT43 - Agrupamento de alunos por pace
        Given que estou autenticado com um token válido
        And existem alunos cadastrados com diferentes valores de pace
        When envio uma requisição GET para "/trainings/group" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 200
        And o corpo da resposta deve conter grupos como "300-330"
        And o pace de cada aluno deve estar dentro do intervalo do grupo correspondente

    Scenario: CT44 - Validação dos intervalos de agrupamento
        Given que estou autenticado com um token válido
        And existem alunos cadastrados com diferentes valores de pace
        When envio uma requisição GET para "/trainings/group" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 200
        And os grupos retornados devem ter intervalos de 30 em 30 segundos, por exemplo: "300-330", "330-360"