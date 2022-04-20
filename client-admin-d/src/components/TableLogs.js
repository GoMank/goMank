import React, { useEffect, useState }  from 'react'
import axios from "axios";
import styled from "styled-components";

export default function TableLogs() {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true);

    async function fetchLogs() {
        try {
            const logs = await axios({
                method: "get",
                url: "https://gomank-server-app.herokuapp.com/logs",
            })
            setLogs(logs.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchLogs()
    }, [])

    if(loading){
        return <div>Loading...</div>
    }

    logs.forEach(el => {
        const dateNumber = new Date(el.createdAt)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        el.time = dateNumber.getTime()
        el.createdFormated = dateNumber.toLocaleDateString('id-ID', options)
    });

    logs.sort(function(a, b){return b.time - a.time});
    console.log(logs);
    return (
        <Table>
            <table>
                <tr>
                    <th style={{textAlign: 'center'}}>No.</th>
                    <th style={{textAlign: 'center'}}>Description</th>
                    <th style={{textAlign: 'center'}}>Type</th>
                    <th style={{textAlign: 'center'}}>Crated Time</th>
                </tr>
                {logs.map((el, index) => {
                    return (
                        <tr key={el.id}>
                            <td style={{textAlign: 'center'}}>{index + 1}</td>
                            <td style={{textAlign: 'center'}}>{el.description}</td>
                            <td style={{textAlign: 'center'}}>{el.type}</td>
                            <td style={{textAlign: 'center'}}>{el.createdFormated}</td>
                        </tr>
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
    table-layout: auto;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;
