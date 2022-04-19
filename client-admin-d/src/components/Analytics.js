import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { cardStyles } from "./ReusableStyles";
import { MdOutlineFreeCancellation, MdDoneOutline } from "react-icons/md";
import rupiah from "../helpers/currencyGenerate";

export default function Analytics(props) {
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDataOrder(props.dataOrders)
    setLoading(false)
  }, [])

  if(loading){
    return <div>Loading...</div>
  }

  const orderDone = dataOrder.filter(el => el.orderStatus === "Done")
  let totalDoneWorth = 0
  orderDone.forEach(element => {
    totalDoneWorth += element.price
  });
  const orderCancel = dataOrder.filter(el => el.orderStatus === "Cancelled")
  let totalCancelledWorth = 0
  orderCancel.forEach(element => {
    totalCancelledWorth += element.price
  });
  const orderOngoing = dataOrder.filter(el => el.orderStatus === "Received")
  let totalPendingWorth = 0
  orderOngoing.forEach(element => {
    totalPendingWorth += element.price
  });
  // const orderOngoing = dataOrder.length - orderDone.length - orderCancel.length
  return (
    <Section>
      <div className="analytic">
        <div className="logo">
          <IoStatsChart />
        </div>
        <div className="content">
          <h5>Total Ongoing Worth</h5>
          <h2>{rupiah(totalPendingWorth)}</h2>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Total Ongoing Order</h5>
          <h2>{orderOngoing.length}</h2>
        </div>
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
      </div>
      <div className="analytic ">
        <div className="logo">
          <IoStatsChart />
        </div>
        <div className="content">
          <h5>Total Cancelled Worth</h5>
          <h2>{rupiah(totalCancelledWorth)}</h2>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Total Order Cancelled</h5>
          <h2>{orderCancel.length}</h2>
        </div>
        <div className="logo">
          <MdOutlineFreeCancellation />
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <IoStatsChart />
        </div>
        <div className="content">
          <h5>Total Income</h5>
          <h2>{rupiah(totalDoneWorth)}</h2>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Total Order Done</h5>
          <h2>{orderDone.length}</h2>
        </div>
        <div className="logo">
          <MdDoneOutline />
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #079cff;
      color: black;
      svg {
        color: white;
      }
    }
    .logo {
      background-color: black;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
