// Bibliotecas
import http from 'k6/http';
import { check, sleep } from 'k6';

//Aplicação
import { getToken, getBaseUrl } from '../../Utils/performance.js';

export const options = {
    //iterations: 1
    // Key configurations for Stress in this section
    stages: [
        { duration: '30s', target: 2000 }, // traffic ramp-up from 1 to a higher 2000 users over 30 seconds.
        { duration: '90s', target: 2000 }, // stay at higher 2000 users for 90 seconds
        { duration: '15s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<3000', 'max<6000'], // 95% das requisições devem ser respondidas em menos de 3000ms
        http_req_failed: ['rate<0.01'] // taxa de erro deve ser menor que 1%
    }
};

export function setup() {
    const token = getToken();
    return { token: token }
}

export default function (data) {
    const token = data.token;

    const url = `${getBaseUrl()}/trainings`;
    

    const payload = JSON.stringify({
        dataHora: "2024-11-05T08:00:00",
        distancia: 10,
        tempoTotal: "01:00:00",
        pace: 360
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    const response = http.post(url, payload, params);

    check(response, {
        'Validar que o status é 201': (r) => r.status === 201,
    });

    sleep(1);
}