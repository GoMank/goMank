import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import axios from "axios";
import { HiArrowNarrowRight } from "react-icons/hi";
import { cardStyles } from "./ReusableStyles";

export default function Transfers() {
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
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    el.time = dateNumber.getTime()
    el.date = dateNumber.toLocaleDateString('id-ID', options)
  });

  
  const displayLogsFn = (logs) => {
    const temp = []
    for (let i = 0 ; i < logs.length ; i++){
      temp.push(logs[i])
      if(i = 2){
        return temp
      }
    }
  }
  function display (data){
    if (data.length === 0){
      return <div><h1>No Logs</h1></div>
    } else {
      data.sort(function(a, b){return b.time - a.time});
      return (data.map((el) => {
        return (
          <div key={el.id} className="transaction">
            <div className="transaction__title">
              <div className="transaction__title__details">
                <h3>{el.description}</h3>
                <h5>{el.date}</h5>
              </div>
            </div>
            <div className="transaction__amount">
              <span>{el.type}</span>
            </div>
          </div>
        );
      }))
    }
  }
  const displayLogs = displayLogsFn(logs)
  
  return (
    <Section>
      <div className="title">
        <h2>List Logs</h2>
      </div>
      <div className="transactions">
        {display(logs)}
      </div>
      <Link className="view" to="/logs">
        View all <HiArrowNarrowRight />
      </Link>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .title {
    h2 {
      color: #079cff;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
    }
  }
  .transactions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .transaction {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      &__title {
        display: flex;
        gap: 1rem;
        &__image {
          img {
            height: 2.5rem;
            border-radius: 3rem;
          }
        }
        &__details {
        }
      }
      &__amount {
        background-color: #d7e41e1d;
        padding: 0.2rem 0.5rem;
        width: 6rem;
        border-radius: 1rem;
        text-align: center;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #079cff;
          span {
            color: black;
          }
        }
        span {
          color: #079cff;
        }
      }
    }
  }
  .view {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: #079cff;
    font-weight: bold;
    margin-top: 1rem;
    gap: 0.5rem;
    svg {
      transition: 0.3s ease-in-out;
      font-size: 1.4rem;
    }
    &:hover {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 375px) {
    .transactions {
      .transaction {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`;
