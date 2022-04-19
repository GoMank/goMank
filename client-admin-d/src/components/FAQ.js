import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { IoIosArrowForward } from "react-icons/io";
import { AiFillCalendar } from "react-icons/ai";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { MdCancel , MdDoneOutline } from "react-icons/md";
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { cardStyles } from "./ReusableStyles";
import formatDMY from "../helpers/timeStamp";
import monthModifier from "../helpers/monthModifier";

export default function FAQ(props) {
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState({});
  const reduceDate = {}
  
  useEffect(() => {
    const nowDate = formatDMY(new Date())
    setDataOrder(props.dataOrders)
    setDate({month: nowDate.month, year: nowDate.year})
    setLoading(false)
  }, [])

  const dataFiltered = dataOrder.filter((el) => {
    let arr
    if(el.dateFormated.month === date.month && el.dateFormated.year === date.year){
      arr = el
    }
    return arr
  })

  dataFiltered.forEach(element => {
    if(element.orderStatus === "Done"){
      if(!reduceDate[element.dateFormated.date]){
        reduceDate[element.dateFormated.date] = element.price
      } else {
        reduceDate[element.dateFormated.date] += element.price
      }
    }
  });

  let incomePerDate = []
  for (const key in reduceDate) {
    incomePerDate.push({'date' :key, 'price': reduceDate[key]});
  }

  let totalRupiah = 0
  incomePerDate.forEach(el => {
    totalRupiah += el.price
  });

  if(loading){
    return <div>Loading...</div>
  }

  function changeMonth (e) {
    e.preventDefault()
    const newMonth = +e.target.value

    const objDate = {
      ...date,
      month: newMonth
    }
    setDate(objDate)
  }

  function changeYear (e) {
    e.preventDefault()
    const newYear = +e.target.value

    const objDate = {
      ...date,
      year: newYear
    }
    setDate(objDate)
  }

  // function search(e){
  //   e.preventDefault()
  //   console.log(date)
  // }

  // console.log(dataFiltered, 'dari FAQ');
  // console.log(incomePerDate, 'reduceDate dari FAQ');
  const orderDone = dataFiltered.filter(el => el.orderStatus === "Done").length
  const orderCancel = dataFiltered.filter(el => el.orderStatus === "Cancelled").length
  const orderTotal = dataFiltered.length
  return (
    <Section>
      <div className="title">
        <h2>Dashboard Modifier</h2>
      </div>
      <div className="faqs">
        <div className="faq">
          <div className="info">
            <AiFillCalendar />
            <form>
              <div>
                <label htmlFor="monthDate">Month</label>
                <select onChange={(e) => changeMonth(e)} style={{marginLeft: 10, width: '100px'}} name="monthDate" id="monthDate" value={date.month}>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <label style={{marginLeft: 20}} htmlFor="yearDate">Year</label>
                <input onChange={(e) => changeYear(e)} style={{marginLeft: 10, width: '100px'}} type="number" name="yearDate" id="yearDate" value={date.year} />
              </div>
            </form>
          </div>
        </div>
        <div style={{flexDirection: 'col', display:'flex'}}>
          <div style={{flexDirection: 'row', flex: 1}}>
            <div className="analytic ">
              <div className="logo">
                <BsFillCalendar2WeekFill />
              </div>
              <div className="content">
                <h5>Total Order</h5>
                <h2>{orderTotal}</h2>
              </div>
            </div>
          </div>
          <div style={{flexDirection: 'row', flex: 1}}>
            <div className="analytic ">
              <div className="logo">
                <MdDoneOutline />
              </div>
              <div className="content">
                <h5>Total Order Done</h5>
                <h2>{orderDone}</h2>
              </div>
            </div>
          </div>
          <div style={{flexDirection: 'row', flex: 1}}>
            <div className="analytic ">
              <div className="logo">
                <MdCancel  />
              </div>
              <div className="content">
                <h5>Total Order Cancel</h5>
                <h2>{orderCancel}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Earnings dataOrders={dataOrder} /> */}
      <div className="top">
        <div className="info">
          <h5>{`${monthModifier(date.month)} - ${date.year} earnings`}</h5>
          <h1>{totalRupiah.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</h1>
          <div className="growth">
          </div>
        </div>
      </div>
      <ResponsiveContainer width={700} height="56%">
        <AreaChart data={incomePerDate}
          margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
          <XAxis dataKey="date"/>
          <YAxis dataKey="price" />
          <Tooltip cursor={false} />
          <Area
              animationBegin={800}
              animationDuration={2000}
              type="monotone"
              dataKey="price"
              stroke="#079cff"
              fill="#079cff"
              strokeWidth={5}
            />
        </AreaChart>
      </ResponsiveContainer>
    </Section>
  );
}
const Section = styled.section`
  ${cardStyles};
  .title {
    h2 {
      color: #079cff;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
    }
  }
  .faqs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .faq {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .info {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      svg {
        font-size: 1.4rem;
      }
      &:nth-of-type(2) {
        border-top: 0.01rem solid #6c6e6e;
        border-bottom: 0.01rem solid #6c6e6e;
        padding: 0.8rem 0;
      }
    }
  }
  .analytic {
    ${cardStyles};
    padding: 0.5rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.3rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #079cff;
      color: black;
      svg {
        color: white;
      }
    }
    
  .chart {
    height: 70%;
    .recharts-default-tooltip {
      background-color: black !important;
      border-color: black !important;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    svg {
      font-size: 2rem !important;
    }
  }
`;
