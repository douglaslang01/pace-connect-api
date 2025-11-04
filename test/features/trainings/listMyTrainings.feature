Feature: Consulta de Treinos do Usuário Logado

    Scenario: CT27 - Busca de treinos autenticado
        Given que o usuário está autenticado com um token válido
        And existem treinos cadastrados para o usuário logado
        When envio uma requisição GET para "/trainings/mine" com o header Authorization
        Then o sistema deve retornar status 200
        And o corpo da resposta deve conter uma lista de todos os treinos do usuario logado em formato "JSON"

    Scenario: CT28 - Busca de treinos sem autenticação
        Given que o usuário não está autenticado
        When envio uma requisição GET para "/trainings/mine" sem o header Authorization
        Then o sistema deve retornar status 401
        And deve exibir mensagem de autenticação obrigatória

    Scenario: CT29 - Busca de treinos com token inválido
        Given que o usuário está autenticado com um token inválido
        When envio uma requisição GET para "/trainings/mine" com o header Authorization inválido
        Then o sistema deve retornar status 403
        And deve exibir mensagem de token inválido

    Scenario: CT30 - Busca treinos do usuário logado
        Given que o usuário "aluno1" está autenticado e possui treinos cadastrados
        And existe um usuário "treinador1" também logado ao sistema
        And envio de treinos para o usuário "treinador1"
        When envio uma requisição GET para "/trainings/mine" autenticado como "aluno1"
        Then o sistema deve retornar status 200
        And o corpo da resposta deve conter apenas os treinos do usuário "aluno1"