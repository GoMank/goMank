import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation CreateClient(
        $name: String
        $email: String
        $password: String
        $address: String
        $phone: String
        $image: String
        $norek: String
        $saldo: Int
    ) {
        createClient(
            name: $name
            email: $email
            password: $password
            address: $address
            phone: $phone
            image: $image
            norek: $norek
            saldo: $saldo
        ) {
            name
            email
            phoneNumber
        }
    }
`;

export const FETCH_CLIENT = gql`
    query Query {
        mamangs {
            name
            _id
            email
            password
            address
            phoneNumber
        }
    }
`;
export const FETCH_ORDERS = gql`
    query Orders {
        orders {
            id
            invoiceNumber
            price
            date
            orderStatus
            paymentStatus
            clientId
            address
            paymentMethod
            date
            time
            mamangId
            client {
                name
                _id
            }
            service
        }
    }
`;

export const CREATE_ORDER = gql`
    mutation Mutation(
        $clientId: ID!
        $mamangId: ID!
        $service: Int
        $date: String
        $time: String
        $address: String
        $paymentMethod: String
    ) {
        createOrder(
            clientId: $clientId
            mamangId: $mamangId
            service: $service
            date: $date
            time: $time
            address: $address
            paymentMethod: $paymentMethod
        ) {
            message
        }
    }
`;

export const FETCH_ORDER_BY_ID = gql`
    query Order($orderId: ID!) {
        order(id: $orderId) {
            id
            invoiceNumber
            price
            orderStatus
            paymentStatus
            address
            paymentMethod
            mamang {
                name
                _id
            }
            client {
                name
                _id
            }
            clientId
            mamangId
        }
    }
`;
export const FETCH_HISTORY = gql`
    query History {
        histories {
            id
            orderId
            description
            createdAt
            order {
                invoiceNumber
                id
                orderStatus
            }
        }
    }
`;

export const LOGIN = gql`
    mutation Mutation($email: String, $password: String) {
        loginClient(email: $email, password: $password) {
            _id
            name
            email
            phoneNumber
        }
    }
`;
// export const GET_NEAREST_MAMANG = gql`
//     mutation Mutation($location: [Float]) {
//         nearestMamang(location: $location) {
//             _id
//             name
//             email
//             password
//             address {
//                 coordinates
//             }
//             phoneNumber
//             gender
//             image
//             rekNumber
//             saldo
//         }
//     }
// `;

export const FETCH_MAMANGS = gql`
    query Mamangs {
        mamangs {
            name
            email
            password
            phoneNumber
            gender
            image
            rekNumber
            saldo
            _id
            address {
                coordinates
                type
            }
        }
    }
`;

export const GET_NEAREST_MAMANG = gql`
    mutation Mutation($location: [Float]) {
        nearestMamang(location: $location) {
            _id
            name
            email
            password
            address {
                coordinates
            }
            phoneNumber
            gender
            image
            rekNumber
            saldo
        }
    }
`;

export const GET_MAMANG_LOC = gql`
    query Mamang($mamangId: ID!) {
        mamang(id: $mamangId) {
            name
            address {
                coordinates
            }
        }
    }
`;

export const UPDATE_CANCEL_ORDER = gql`
    mutation UpdateCancelOrder($updateCancelOrderId: ID!) {
        updateCancelOrder(id: $updateCancelOrderId) {
            message
        }
    }
`;
