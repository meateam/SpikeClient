// config

import { environment } from '../../../src/environments/environment.prod';

export const config = {
        SERVER_HOST: environment.SERVER_HOST,
        SERVER_PORT: environment.SERVER_PORT,
        CLIENT_PORT: environment.CLIENT_PORT,
        PRIVATE_KEY_PATH: environment.PRIVATE_KEY_PATH,
        CERT_PATH: environment.CERT_PATH,
        ELASTIC_APM_SERVICE_NAME: environment.ELASTIC_APM_SERVICE_NAME,
        ELASTIC_APM_SERVER_URL: environment.ELASTIC_APM_SERVER_URL,
        ELASTIC_APM_SECRET_TOKEN: environment.ELASTIC_APM_SECRET_TOKEN,
        ELASTIC_APM_ACTIVE: environment.ELASTIC_APM_ACTIVE,
        SHRAGA_URL: environment.SHRAGA_URL,
};
