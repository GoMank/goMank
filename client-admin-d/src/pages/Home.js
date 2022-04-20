import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { Outlet} from 'react-router-dom'


export default function Home() {
  
  return (
    <Div>
        <Sidebar />
        <Outlet />
    </Div>
  );
}

const Div = styled.div`
  position: relative;
`;
