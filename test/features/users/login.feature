Feature: Login do Usuário

    Scenario: CT08: Login com usuário e senha válidos
        Given o usuário "aluno1" e senha "123456" está cadastrado
        When envio uma requisição POST para "/users/login" com os dados:
            | usuario | senha  |
            | aluno1  | 123456 |
        Then o sistema deve retornar status 200
        And o token JWT deve ser retornado

    Scenario: CT09: Login com senha incorreta
        Given o usuário "aluno1" e senha "123456" está cadastrado
        When envio uma requisição POST para "/users/login" com os dados:
            | usuario | senha |
            | aluno1  | xyz   |
        Then a resposta deve ter status 401
        And mensagem de erro "Credenciais inválidas"

    Scenario: CT10: Login com usuario incorreto
        Given o usuário "aluno1" e senha "123456" está cadastrado
        When envio uma requisição POST para "/users/login" com os dados:
            | usuario | senha  |
            | xyz     | 123456 |
        Then a resposta deve ter status 401
        And mensagem de erro "Credenciais inválidas"

    Scenario: CT11: Login com password numérico (tipo inválido)
        Given o usuário "aluno1" e senha "123456" está cadastrado
        When envio uma requisição POST para "/users/login" com os dados:
            | usuario | senha  |
            | aluno1  | 123456 |
        Then a resposta deve ter status 500