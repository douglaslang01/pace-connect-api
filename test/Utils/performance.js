import http from 'k6/http';
import { Faker } from "k6/x/faker";

const configLocal = JSON.parse(open('../config/config.local.json'));

function getBaseUrl() {
    return __ENV.BASE_URL || configLocal.baseUrl;
}

export { getBaseUrl };