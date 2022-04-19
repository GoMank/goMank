import { gql } from '@apollo/client';

export const UPDATE_MAMANG_LOCATION = gql`
    mutation updateMamangLoc($address: [Float], $id: ID) {
        updateMamang(address: $address, _id: $id) {
            name
            address {
                coordinates
                type
            }
            _id
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
        }
    }
`;
