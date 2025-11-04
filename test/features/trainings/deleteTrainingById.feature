Feature: Exclusão de Treinos

    Scenario: CT36 - Exclusão de treino autenticado
        Given que o usuário está autenticado com um token válido
        And existe um treino com ID 1 cadastrado para o usuário logado
        When envio uma requisição DELETE para "/trainings/1" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 204
        And o treino deve ser removido com sucesso

    Scenario: CT37 - Exclusão de treino sem autenticação
        Given que não estou autenticado
        When envio uma requisição DELETE para "/trainings/1" sem o header Authorization
        Then o sistema deve retornar status 401
        And deve exibir mensagem de autenticação obrigatória

    Scenario: CT38 - Exclusão de treino com token inválido
        Given que estou autenticado com um token inválido
        When envio uma requisição DELETE para "/trainings/1" com o header Authorization: Bearer <token inválido>
        Then o sistema deve retornar status 403
        And deve exibir mensagem de token inválido

    Scenario: CT39 - Exclusão de treino inexistente
        Given que estou autenticado com um token válido
        And não existe treino com ID 999 cadastrado para o usuário logado
        When envio uma requisição DELETE para "/trainings/999" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 404
        And deve exibir mensagem de treino não encontrado

    Scenario: CT40 - Exclusão de treino com formato inválido para ID
        Given que estou autenticado com um token válido
        When envio uma requisição DELETE para "/trainings/abc" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 404
        And deve exibir mensagem de treino não encontrado