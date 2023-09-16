
const API = import.meta.env.VITE_BACKEND_CHATTER_API;
const USER_ENDPOINT = import.meta.env.VITE_BACKEND_USER_ENDPOINT;
const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_DATA_ENDPOINT;


export default class EndpointService {


    endpointStringFactory(endpointName, actionName) {

        const name = endpointName.toLowerCase();
        switch (name) {
            case 'data':
                return `${API}/${DATA_ENDPOINT}/${actionName}`;
            case 'user':
                return `${API}/${USER_ENDPOINT}/${actionName}`;

            default:
                break;
        }
    }

}