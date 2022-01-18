import React, { useLayoutEffect, useState } from "react";
import { Card, Layout, Menu, Input, Button } from "antd";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "antd/dist/antd.css";
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

  function handleSpeechInput(event) {
    event.preventDefault();

    const speechInput = document.querySelector("#speech-input").value;
    const data = { speechText: speechInput };
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:3080/api/speechInput", data, { headers })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Errore nella post\n", err);
      });
  }

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
              <b>Input</b> your sentence and click <b>Generate</b>, then press
              the
              <b> Play </b>button
            </p>
            <Input id="speech-input" placeholder="Your sentence here" />
            <div
              style={{
                paddingTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleSpeechInput}>Generate</Button>
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
