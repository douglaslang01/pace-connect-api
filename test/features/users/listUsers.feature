Feature: Consulta de Usuários

    Scenario: CT12 - Busca de usuários autenticado
        Given que o sistema está disponível
        And estou autenticado com um token válido
        When envio uma requisição GET para "/users" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 200
        And o corpo da resposta deve conter uma lista de todos os usuários (alunos e treinadores) em formato "JSON"

    Scenario: CT13 - Busca de usuários sem autenticação
        Given que o sistema está disponível
        When envio uma requisição GET para "/users" sem o header Authorization
        Then o sistema deve retornar status 401
        And deve exibir mensagem de autenticação obrigatória
    @focus
    Scenario: CT14 - Busca de usuários com token inválido
        Given que o sistema está disponível
        When envio uma requisição GET para "/users" com o header Authorization: Bearer <token inválido>
        Then o sistema deve retornar status 403
        And deve exibir mensagem de token inválido

Feature: Consulta de Usuário por ID

    Scenario: CT15 - Busca de usuário por ID autenticado
        Given que o sistema está disponível
        And estou autenticado com um token válido
        When envio uma requisição GET para "/users/{id}" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 200
        And o corpo da resposta deve conter os dados completos do usuário correspondente ao ID em formato "JSON"

    Scenario: CT16 - Busca de usuário por ID sem autenticação
        Given que o sistema está disponível
        When envio uma requisição GET para "/users/{id}" sem o header Authorization
        Then o sistema deve retornar status 401
        And deve exibir mensagem de autenticação obrigatória

    Scenario: CT17 - Busca de usuário por ID com token inválido
        Given que o sistema está disponível
        When envio uma requisição GET para "/users/{id}" com o header Authorization: Bearer <token inválido>
        Then o sistema deve retornar status 403
        And deve exibir mensagem de token inválido

    Scenario: CT18 - Busca de usuário por ID inexistente
        Given que o sistema está disponível
        And estou autenticado com um token válido
        When envio uma requisição GET para "/users/{id inexistente}" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 404
        And deve exibir mensagem de usuário não encontrado

    Scenario: CT19 - Busca de usuário por ID com formato inválido
        Given que o sistema está disponível
        And estou autenticado com um token válido
        When envio uma requisição GET para "/users/abc" com o header Authorization: Bearer <token válido>
        Then o sistema deve retornar status 400
        And deve exibir mensagem de formato inválido para ID
