import React from "react";
import styled from "styled-components";
import Sidebar from "../components/main-dashbord/Dashboard-sidebar/Sidebar"; // Adjust the import path as necessary
import DashboardRoutes from "../Routes/DashboardRoutes";
import Dashbordheader from "../components/main-dashbord/dashbord-header/Dashbordheader";



const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header1 = styled.header`
  color: #fff;

  text-align: center;
`;

const Footer1 = styled.footer`
  color: #fff;
  padding: 20px;
  text-align: center;
  margin-top: auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 25px 100px 50px 48px;
  background-color: #f0f0f0;
`;

const Dashboard = () => {

  return (
    <Layout className="my-main-Dashboard">
      <div className="main-dashbord-header-div">
        <Dashbordheader />
      </div>

      <ContentWrapper Layout className="my-main-Dashboard-contanir">

        <Sidebar />
        {/* <MainContent> */}

        <div className="my-mainbox-DashboardRoutes">
          <DashboardRoutes />
        </div>

        {/* </MainContent> */}
      </ContentWrapper>

    </Layout>
  );
};

export default Dashboard;
