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
