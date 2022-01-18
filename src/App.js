import React, { useLayoutEffect, useState } from "react";
import { Card, Layout, Menu, Input, Button } from "antd";
import AudioPlayer from "react-h5-audio-player";
import "antd/dist/antd.css";
import "./style/Layout.css";
import "react-h5-audio-player/lib/styles.css";
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
          <h2 style={{ color: "#fff" }}>DEEPEE VOICE</h2>
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
            <p>
              Type your sentence and click "Generate", then press the play
              button
            </p>
            <Input placeholder="Your sentence here" />
            <div
              style={{
                paddingTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button>Generate</Button>
            </div>
            <AudioPlayer
              autoPlay
              src="http://example.com/audio.mp3"
              onPlay={(e) => console.log("onPlay")}
              style={{ boxShadow: "none", marginTop: 10 }}
            />
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
