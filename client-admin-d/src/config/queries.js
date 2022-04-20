import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation CreateClient($name: String, $email: String, $password: String, $address: String, $phone: String, $image: String, $norek: String, $saldo: Int) {
  createClient(name: $name, email: $email, password: $password, address: $address, phone: $phone, image: $image, norek: $norek, saldo: $saldo) {
    name
    email
    phoneNumber
  }
}
`

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
`
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
    mamangId
    client {
      name
      _id
    }
    

  }
}
`

export const CREATE_ORDER = gql`
mutation Mutation($clientId: ID!, $mamangId: ID!, $service: Int, $date: String, $time: String, $address: String, $paymentMethod: String) {
  createOrder(clientId: $clientId, mamangId: $mamangId, service: $service, date: $date, time: $time, address: $address, paymentMethod: $paymentMethod) {
    message
  }
}

`

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
`
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
`


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
`