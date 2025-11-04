Feature: Registro de Treinos

    Scenario: CT20 - Registro de treino válido
        Given que o usuário está autenticado com um token válido
        When envio uma requisição POST para "/trainings" com os dados:
            | dataHora            | distancia | tempoTotal | pace |
            | 2025-11-04T08:00:00 | 10        | 01:00:00   | 360  |
        Then o sistema deve retornar status 201
        And o treino deve ser cadastrado com id incremental
        And o corpo da resposta deve estar em formato "JSON"

    Scenario: CT21 - Registro de treino sem autenticação
        Given que o usuário não está autenticado
        When envio uma requisição POST para "/trainings" com os dados:
            | dataHora            | distancia | tempoTotal | pace |
            | 2025-11-04T08:00:00 | 10        | 01:00:00   | 360  |
        Then o sistema deve retornar status 401
        And deve exibir mensagem de autenticação obrigatória

    Scenario: CT22 - Registro de treino com token inválido
        Given que o usuário está autenticado com um token inválido
        When envio uma requisição POST para "/trainings" com os dados:
            | dataHora            | distancia | tempoTotal | pace |
            | 2025-11-04T08:00:00 | 10        | 01:00:00   | 360  |
        Then o sistema deve retornar status 403
        And deve exibir mensagem de token inválido

    Scenario: CT23 - Registro de treino com dados ausentes
        Given que o usuário está autenticado com um token válido
        When envio uma requisição POST para "/trainings" com os dados:
            | dataHora | distancia | tempoTotal | pace |
            |          |           |            |      |
        Then o sistema deve retornar status 400
        And deve exibir mensagem de campos obrigatórios ausentes (distancia e pace)

    Scenario: CT24 - Registro de treino com formato inválido
        Given que o usuário está autenticado com um token válido
        When envio uma requisição POST para "/trainings" com os dados:
            | dataHora     | distancia | tempoTotal | pace   |
            | invalid-date | dez       | abc        | string |
        Then o sistema deve retornar status 400
        And deve exibir mensagem de formato inválido

    Scenario: CT25 - Registro de treino com valores não permitidos
        Given que o usuário está autenticado com um token válido
        When envio uma requisição POST para "/trainings" com os dados:
            | dataHora            | distancia | tempoTotal | pace |
            | 2025-11-04T08:00:00 | 0         | 01:00:00   | 0    |
        Then o sistema deve retornar status 400
        And deve exibir mensagem indicando que "distancia" e "pace" devem ser maiores que 0

    Scenario: CT26 - Registro de treino sem distancia e pace
        Given que o usuário está autenticado com um token válido
        When envio uma requisição POST para "/trainings" com os dados:
            | dataHora            | tempoTotal |
            | 2025-11-04T08:00:00 | 01:00:00   |
        Then o sistema deve retornar status 400
        And deve exibir mensagem de campos obrigatórios ausentes (distancia e pace)