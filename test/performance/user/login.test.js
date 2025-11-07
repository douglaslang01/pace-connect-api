// Bibliotecas
import http from 'k6/http';
import { check, sleep } from 'k6';

//Aplicação
import { getBaseUrl } from '../../Utils/performance.js';

export const options = {
    //iterations: 1
    // Key configurations for spike in this section
    stages: [
        { duration: '1m', target: 250 }, // fast ramp-up to a high point
        { duration: '30s', target: 0 }, // quick ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<3000', 'max<6000'], // 95% das requisições devem ser respondidas em menos de 3000ms
        http_req_failed: ['rate<0.01'] // taxa de erro deve ser menor que 1%
    }
};

export default function () {
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

    check(response, {
        'Validar que o status é 200': (r) => r.status === 200,
    });

    sleep(1);
}