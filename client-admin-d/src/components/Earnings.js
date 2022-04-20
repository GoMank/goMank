import React from "react";
import styled from "styled-components";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { cardStyles } from "./ReusableStyles";
import { useEffect, useState } from "react";
import formatDMY from "../helpers/timeStamp";

// import { GET_ORDERS } from "../config/queries";
export default function Earnings(props) {
  // const {loading, error, dataOrder} = useQuery(GET_ORDERS);
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState({});
  const reduceDate = {}

  useEffect(() => {
    const newData = props.dataOrders;
    const nowDate = formatDMY(new Date())
    newData.forEach(el => {
      el.dateFormated = formatDMY(el.createdAt);
    });
    setDataOrder(newData)
    setDate({month: nowDate.month, year: nowDate.year})
    setLoading(false)
  }, [])

  if(loading){
    return <div>Loading...</div>
  }

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
  dataFiltered.forEach(order => {
    if(order.orderStatus === "Done"){
      totalRupiah += order.price
    }
  });

  console.log(incomePerDate, '<<<<< incomer per date');

  return (
    <Section>
      <div className="top">
        <div className="info">
          <h5>This month earnings</h5>
          <h1>{totalRupiah.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</h1>
          {/* <div className="growth">
            <span>+2.45%</span>
          </div> */}
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={300}
            data={incomePerDate}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
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
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  ${cardStyles}
  padding: 2rem 0 0 0;
  .top {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      h1 {
        font-size: 2rem;
      }
      .growth {
        background-color: #d7e41e1d;
        padding: 0.5rem;
        border-radius: 1rem;
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
  .chart {
    height: 70%;
    .recharts-default-tooltip {
      background-color: black !important;
      border-color: black !important;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
