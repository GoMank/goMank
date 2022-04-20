import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from 'axios'
// import { useQuery } from '@apollo/client';
// import { FETCH_MAMANGS } from '../config/queries';
const listMamangs = [
    {
        "_id": "62559dcfc9054d53a273fb14",
        "email": "mamang@mail.com",
        "name": "mamang123",
        "phoneNumber": "0822123456",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "1234567",
        "saldo": 5000
    },
    {
        "_id": "62559ddfc9054d53a273fb15",
        "email": "mamang123@mail.com",
        "name": "mamang123456",
        "phoneNumber": "0822123456",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.0111476,
                -6.2694103
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "1234567",
        "saldo": "2000"
    },
    {
        "_id": "6255ac5b192510a0ea77be65",
        "name": "kuda",
        "email": "kuda@mail.com",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "phoneNumber": "12345",
        "gender": "male",
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "123456",
        "saldo": 0
    },
    {
        "_id": "625b9a52f58c2b1e38ee21f5",
        "email": "mamang12377test@mail.com",
        "name": "mamang12345677test",
        "phoneNumber": "0822123456",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "1234567",
        "saldo": 0
    },
    {
        "_id": "625b9a53f58c2b1e38ee21f6",
        "email": "mamang12377test@mail.com",
        "name": "mamang12345677test",
        "phoneNumber": "0822123456",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "1234567",
        "saldo": 0
    },
    {
        "_id": "625b9a54f58c2b1e38ee21f7",
        "email": "mamang12377test@mail.com",
        "name": "mamang12345677test",
        "phoneNumber": "0822123456",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "1234567",
        "saldo": 0
    },
    {
        "_id": "625b9f7485ef221da1e0c6f1",
        "email": "testMamang@mail.com",
        "phoneNumber": "0822123456",
        "name": "testingMamang",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "82292838",
        "saldo": 0
    },
    {
        "_id": "625ba0028e6519ca13bbcf6d",
        "email": "testMamang@mail.com",
        "phoneNumber": "0822123456",
        "name": "testingMamang",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "82292838",
        "saldo": 0
    },
    {
        "_id": "625ba01d67cac2203edd96f3",
        "email": "testMamang@mail.com",
        "phoneNumber": "0822123456",
        "name": "testingMamang",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "82292838",
        "saldo": 0
    },
    {
        "_id": "625ba053b25beb60fe360662",
        "email": "testMamang@mail.com",
        "phoneNumber": "0822123456",
        "name": "testingMamang",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "82292838",
        "saldo": 0
    },
    {
        "_id": "625ba088c746d26d66867950",
        "email": "testMamang@mail.com",
        "phoneNumber": "0822123456",
        "name": "testingMamang",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "82292838",
        "saldo": 0
    },
    {
        "_id": "625e7e175638c70a81809acf",
        "email": "testMamang@mail.com",
        "phoneNumber": "0822123456",
        "name": "testingMamang",
        "gender": "male",
        "address": {
            "type": "Point",
            "coordinates": [
                107.01118835699735,
                -6.269429087104287
            ]
        },
        "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
        "rekNumber": "82292838",
        "saldo": 0
    }
]

export default function Mamangs() {
    // const {loading, error, data} = useQuery(FETCH_MAMANGS)
    // if(loading) return <p>Loading...</p>
    // if(error) return <p>Error: {error.message}</p>
    
    const [mamangs, setMamangs] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchMamangs() {
        try {
          const mamang = await axios({
            method: "get",
            url: "https://big-penguin-91.loca.lt/mamangs",
          })
          console.log(mamang.data)
          setMamangs(mamang.data)
          setLoading(false)
        } catch (err) {
          console.log(err)
        }
      }
    useEffect(() => {
        fetchMamangs()
    }, [])

    if(loading) return <p>Loading...</p>
    console.log(mamangs)
    return (

        <Table>
            <table>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>No.</th>
                        <th style={{ textAlign: 'center' }}>ID</th>
                        <th style={{ textAlign: 'center' }}>Name</th>
                        <th style={{ textAlign: 'center' }}>Profile Picture</th>
                        <th style={{ textAlign: 'center' }}>Phone Number</th>
                        <th style={{ textAlign: 'center' }}>Gender</th>
                        <th style={{ textAlign: 'center' }}>Bank Account</th>
                        <th style={{ textAlign: 'center' }}>Saldo</th>
                        <th style={{ textAlign: 'center' }}>Button Detail</th>
                    </tr>
                </thead>
                {listMamangs.map((el, index) => {
                    return (
                        <tbody>
                            <tr key={el._id}>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ textAlign: 'center' }}>{el._id}</td>
                                <td style={{ textAlign: 'center' }}>{el.name}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <img style={{objectFit: 'cover', borderRadius: 100}} src={el.image} alt="profile" width="100px" height="100px" />
                                </td>
                                <td style={{ textAlign: 'center' }}>{el.phoneNumber}</td>
                                <td style={{ textAlign: 'center' }}>{el.gender}</td>
                                <td style={{ textAlign: 'center' }}>{el.rekNumber}</td>
                                <td style={{ textAlign: 'center' }}>{el.saldo}</td>
                                <td style={{ display:'flex', justifyContent: 'center' }}>
                                    <button style={{paddingInline: '20%', paddingBlock: 8, marginTop: 30}}>Detail</button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </Table>
    )
}

const Table = styled.section`
table {
    font-family: "Montserrat", sans-serif;
    border-collapse: collapse;
    margin-left: 15vw;
    width: 85vw;
    height: 100%;
    border-width: thick;
    border-color: coral;
  }
  
  td, th {
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;
