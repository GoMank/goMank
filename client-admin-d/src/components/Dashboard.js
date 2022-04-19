import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios'
import Analytics from "./Analytics";
import Earnings from "./Earnings";
import FAQ from "./FAQ";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Transfers from "./Logs";
import scrollreveal from "scrollreveal";

export default function Dashboard() {
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrder() {
    try {
      const orders = await axios({
        method: "get",
        url: "http://localhost:3005/orders",
      })
      setDataOrder(orders.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
    fetchOrder()
  }, []);

  if(loading){
    return <div>Loading...</div>
  }
  
  return (
    <Section>
      <Navbar />
      <div className="grid">
        <div className="row__one">
          <Analytics dataOrders = {dataOrder}/>
          <FAQ dataOrders = {dataOrder}/>
        </div>
        <div className="row__two">
          <Earnings dataOrders = {dataOrder}/>
          <Transfers />
          <Profile />
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 15vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
