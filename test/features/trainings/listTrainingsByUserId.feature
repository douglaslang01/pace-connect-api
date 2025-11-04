Feature: Consulta de Treinos por ID do Usuário

    Scenario: CT31 - Busca de treinos por ID autenticado
        Given que o usuário está autenticado com um token válido
        And existe um usuário com ID 1 que possui treinos cadastrados
        When envio uma requisição GET para "/trainings/user/1" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 200
        And o corpo da resposta deve conter a lista dos treinos do usuário informado em formato "JSON"

    Scenario: CT32 - Busca de treinos por ID sem autenticação
        Given que não estou autenticado
        When envio uma requisição GET para "/trainings/user/1" sem o header Authorization
        Then o sistema deve retornar status 401
        And deve exibir mensagem de autenticação obrigatória

    Scenario: CT33 - Busca de treinos por ID com token inválido
        Given que estou autenticado com um token inválido
        When envio uma requisição GET para "/trainings/user/1" com o header Authorization: Bearer <token inválido>
        Then o sistema deve retornar status 403
        And deve exibir mensagem de token inválido

    Scenario: CT34 - Busca de treinos por ID inexistente
        Given que estou autenticado com um token válido
        And não existem treinos cadastrados para o usuário de ID 999
        When envio uma requisição GET para "/trainings/user/999" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 200
        And o corpo da resposta deve conter uma lista vazia

    Scenario: CT35 - Busca de treinos por ID com formato inválido
        Given que estou autenticado com um token válido
        When envio uma requisição GET para "/trainings/user/abc" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 400
        And deve exibir mensagem de formato inválido para userId