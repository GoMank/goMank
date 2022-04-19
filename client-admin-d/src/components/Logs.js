import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import axios from "axios";
import { HiArrowNarrowRight } from "react-icons/hi";
import avatarImage from "../assets/avatarImage.png";
import { cardStyles } from "./ReusableStyles";

export default function Transfers() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true);

  async function fetchLogs() {
    try {
      const logs = await axios({
        method: "get",
        url: "http://localhost:3000/logs",
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

  const transactions = [
    { id: 1,
      image: avatarImage,
      name: "From Kishan Sheth",
      time: "Today, 16:36",
      amount: "+$50",
    },
    { id: 2,
      image: avatarImage,
      name: "To Lauras Santos",
      time: "Today, 08:49",
      amount: "-$25",
    },
    { id: 3,
      image: avatarImage,
      name: "From Jadon S.",
      time: "Yesterday, 14:36",
      amount: "+$150",
    },
  ];

  
  if(loading){
    return <div>Loading...</div>
  }

  logs.forEach(el => {
    const dateNumber = new Date(el.createdAt)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    el.time = dateNumber.getTime()
    el.date = dateNumber.toLocaleDateString('id-ID', options)
  });

  logs.sort(function(a, b){return b.time - a.time});
  const displayLogs = [logs[0], logs[1], logs[2]];

  console.log(displayLogs);
  return (
    <Section>
      <div className="title">
        <h2>List Logs</h2>
      </div>
      <div className="transactions">
        {displayLogs.map((el) => {
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
        })}
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
