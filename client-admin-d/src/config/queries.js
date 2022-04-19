import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
    # fix order
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
    mamangId
    mamang {
      name
      phoneNumber
    }
    client {
      name
      phoneNumber
    }

    # nama service, tanggal pesan, waktu pesan
  }
}
`;

export const GET_MAMANGS = gql`
query Mamangs {
  mamangs {
    name
    email
    address {
      coordinates
      type
    }
    phoneNumber
    gender
    image
    rekNumber
    saldo
  }
}`
