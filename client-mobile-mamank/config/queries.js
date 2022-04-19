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
