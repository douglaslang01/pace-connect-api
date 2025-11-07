import http from 'k6/http';

const configLocal = JSON.parse(open('../config/config.local.json'));


function getBaseUrl() {
    return __ENV.BASE_URL || configLocal.baseUrl;
}

const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

function getToken() {
    const url = `${getBaseUrl()}/users/login`;

    const payload = JSON.stringify({
        usuario: 'aluno1',
        senha: '123456',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);

    return response.json('token');
}

export { getToken, getBaseUrl };