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