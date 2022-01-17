import React, { useLayoutEffect, useState } from "react";
import { Card, Layout, Menu, Input } from "antd";
import "antd/dist/antd.css";
import "./style/Layout.css";
const { Header, Content, Footer } = Layout;

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function App() {
  const year = new Date().getFullYear();
  const [width, height] = useWindowSize();
  return (
    <div id="app">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
          ></Menu>
        </Header>
        <Content
          style={{
            padding: "0 50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: { height },
          }}
        >
          <Card title="Speech synthesis" style={{ width: 300 }}>
            <Input placeholder="Type your sentence and click play" />
          </Card>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          deepee voice ©{year} Created by Andrea Di Pisa (deepee)
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
