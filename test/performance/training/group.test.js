// Bibliotecas
import http from 'k6/http';
import { check, sleep } from 'k6';


//Aplicação
import { getToken, getBaseUrl } from '../../Utils/performance.js';

export const options = {
    //iterations: 1
    // Key configurations for Stress in this section
    stages: [
        { duration: '30s', target: 500 }, // traffic ramp-up from 1 to a higher 500 users over 30 seconds.
        { duration: '90s', target: 500 }, // stay at higher 500 users for 90 seconds
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

    const url = `${getBaseUrl()}/trainings/group`;

    const params = {
        headers: { 'Authorization': `Bearer ${token}` },
    };

    const response = http.get(url, params);

    check(response, {
        'Validar que o status é 200': (r) => r.status === 200,
    });

    sleep(1);
}