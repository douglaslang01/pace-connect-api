Feature: Consolidação do Pace por Aluno

    Scenario: CT45 - Consolidação de pace com treinos nos últimos 30 dias
        Given que estou autenticado com um token válido
        And o usuário de ID 1 possui treinos completos nos últimos 30 dias
        When envio uma requisição GET para "/trainings/consolidate/1" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 200
        And o pace consolidado deve ser calculado apenas com os treinos dos últimos 30 dias
        And o pace consolidado deve ser atualizado no cadastro do usuário

    Scenario: CT46 - Consolidação de pace sem treinos nos últimos 30 dias
        Given que estou autenticado com um token válido
        And o usuário de ID 3 não possui treinos completos nos últimos 30 dias
        When envio uma requisição GET para "/trainings/consolidate/2" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 404
        And deve exibir mensagem de Sem treinos válidos para consolidação
        And o pace consolidado não deve ser alterado
        And o cadastro do usuário deve permanecer igual

    Scenario: CT47 - Consolidação de pace ignorando treinos incompletos
        Given que estou autenticado com um token válido
        And o usuário de ID 4 possui treinos incompletos (sem distância ou pace) e completos nos últimos 30 dias
        When envio uma requisição GET para "/trainings/consolidate/3" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 200
        And o pace consolidado deve ser calculado apenas com treinos completos
        And o pace consolidado deve ser atualizado no cadastro do usuário

    Scenario: CT48 - Consolidação de pace sem autenticação
        Given que não estou autenticado
        When envio uma requisição GET para "/trainings/consolidate/1" sem o header Authorization
        Then o sistema deve retornar status 401
        And deve exibir mensagem de autenticação obrigatória

    Scenario: CT49 - Consolidação de pace com token inválido
        Given que estou autenticado com um token inválido
        When envio uma requisição GET para "/trainings/consolidate/1" com o header Authorization: Bearer <token inválido>
        Then o sistema deve retornar status 403
        And deve exibir mensagem de token inválido

    Scenario: CT50 - Consolidação de pace para usuário inexistente
        Given que estou autenticado com um token válido
        And o usuário de ID 999 não existe
        When envio uma requisição GET para "/trainings/consolidate/999" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 404
        And deve exibir mensagem de usuário não encontrado

    Scenario: CT51 - Consolidação de pace com formato inválido para userId
        Given que estou autenticado com um token válido
        When envio uma requisição GET para "/trainings/consolidate/abc" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 400
        And deve exibir mensagem de formato inválido para userId