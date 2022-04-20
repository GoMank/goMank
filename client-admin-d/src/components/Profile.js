import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import image from "../assets/profile.jpg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { cardStyles } from "./ReusableStyles";
import axios from 'axios'

export default function Profile() {
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

  return (
    <Section>
      <div className="title">
        <h2>Most Valuable Mamang</h2>
        <h5>
          April 2022
        </h5>
      </div>
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="title">
        <h2>Mang Iwan</h2>
        <h5>
          <HiOutlineLocationMarker /> Di Tempat
        </h5>
      </div>
      <div className="info">
        <div className="container">
          <h5>Days at work</h5>
          <h3>28</h3>
        </div>
        <div className="container">
          <h5>Rides</h5>
          <h3>427</h3>
        </div>
        <div className="container">
          <h5>Hours</h5>
          <h3>76</h3>
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .image {
    max-height: 10rem;
    overflow: hidden;
    border-radius: 20rem;
    img {
      height: 10rem;
      width: 10rem;
      object-fit: cover;
      border-radius: 20rem;
      transition: 0.5s ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
  .title {
    text-align: center;
    h2,
    h5 {
      color: #079cff;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
    }
    h5 {
      letter-spacing: 0.2rem;
    }
  }
  .info {
    display: flex;
    gap: 1rem;
    .container {
      text-align: center;
    }
  }
`;
