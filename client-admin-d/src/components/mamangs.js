import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from 'axios'
// import { useQuery } from '@apollo/client';
// import { FETCH_MAMANGS } from '../config/queries';

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
            url: "https://gomank-server-mamang.herokuapp.com/mamangs",
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
    // console.log(mamangs)
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
                        {/* <th style={{ textAlign: 'center' }}>Button Detail</th> */}
                    </tr>
                </thead>
                {mamangs.map((el, index) => {
                    return (
                        <tbody key={el._id}>
                            <tr>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ textAlign: 'center' }}>{el._id}</td>
                                <td style={{ textAlign: 'center' }}>{el.name}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <img style={{objectFit: 'cover', borderRadius: 100}} src={el.image} alt="profile" width="100px" height="100px" />
                                </td>
                                <td style={{ textAlign: 'center' }}>{el.phoneNumber}</td>
                                <td style={{ textAlign: 'center' }}>{el.gender}</td>
                                <td style={{ textAlign: 'center' }}>{el.rekNumber}</td>
                                <td style={{ textAlign: 'center' }}>{el.saldo.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</td>
                                <td style={{ display:'flex', justifyContent: 'center' }}>
                                    {/* <button style={{paddingInline: '20%', paddingBlock: 8, marginTop: 30}}>Detail</button> */}
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
