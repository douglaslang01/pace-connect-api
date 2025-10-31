Feature: Registro de Usuário

    Scenario: CT01: Cadastro de usuário válido
        Given que o sistema está disponível
        When envio uma requisição POST para "/users/register" com os dados:
            | usuario | senha  | nascimento | sexo | experiencia | objetivo | pace | tipo  |
            | aluno10 | 123456 | 2000-01-01 | M    | iniciante   | saúde    | 300  | aluno |
        Then o sistema deve retornar status 201
        And o usuário deve ser cadastrado com id incremental

    Scenario: CT02: Campos obrigatórios ausentes
        Given que o sistema está disponível
        When envio uma requisição POST para "/users/register" com os dados:
            | usuario | senha | nascimento | sexo | experiencia | objetivo | pace | tipo  |
            |         |       | 2000-01-01 | M    | iniciante   | saúde    | 300  | aluno |
        Then o sistema deve retornar status 400
        And deve exibir mensagem de campo obrigatório ausente

    Scenario: CT03: Data de nascimento inválida
        Given que o sistema está disponível
        When envio uma requisição POST para "/users/register" com os dados:
            | usuario | senha  | nascimento   | sexo | experiencia | objetivo | pace | tipo  |
            | aluno3  | 123456 | invalid-date | F    | iniciante   | saúde    | 300  | aluno |
        Then o sistema deve retornar status 400
        And deve exibir mensagem de formato de data inválido

    Scenario: CT04: Valor inválido para sexo
        Given que o sistema está disponível
        When envio uma requisição POST para "/users/register" com os dados:
            | usuario | senha  | nascimento | sexo | experiencia | objetivo | pace | tipo  |
            | aluno4  | 123456 | 2000-01-01 | X    | iniciante   | saúde    | 300  | aluno |
        Then o sistema deve retornar status 400
        And deve exibir mensagem de valor inválido para sexo

    Scenario: CT05: Tipo inválido para pace
        Given que o sistema está disponível
        When envio uma requisição POST para "/users/register" com os dados:
            | usuario | senha  | nascimento | sexo | experiencia | objetivo | pace  | tipo  |
            | aluno5  | 123456 | 2000-01-01 | M    | iniciante   | saúde    | cinco | aluno |
        Then o sistema deve retornar status 400
        And deve exibir mensagem de tipo inválido para pace

    Scenario: CT06: Tipo inválido para campo tipo
        Given que o sistema está disponível
        When envio uma requisição POST para "/users/register" com os dados:
            | usuario | senha  | nascimento | sexo | experiencia | objetivo | pace | tipo  |
            | aluno7  | 123456 | 2000-01-01 | M    | iniciante   | saúde    | 300  | admin |
        Then o sistema deve retornar status 400
        And deve exibir mensagem de valor inválido para tipo

    Scenario: CT07: Usuário já existente
        Given que o sistema está disponível
        When envio uma requisição POST para "/users/register" com os dados:
            | usuario | senha  | nascimento | sexo | experiencia | objetivo | pace | tipo  |
            | aluno01 | 123456 | 2000-01-01 | M    | iniciante   | saúde    | 300  | aluno |
        Then o sistema deve retornar status 409
        And deve exibir mensagem de usuário já cadastrado