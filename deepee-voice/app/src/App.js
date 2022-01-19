import React, { useLayoutEffect, useState } from "react";
import { Card, Layout, Menu, Input, Button } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import "./App.css";
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
      Accept: "audio/mp3",
    };

    axios({
      url: "http://localhost:3080/api/speechInput", //your url
      method: "POST",
      headers: headers,
      responseType: "blob", // important
      data: data,
    })
      .then((res) => {
        console.log("Server: OK!");
        const blob = new Blob([res.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.mp3"); //or any other extension
        document.body.appendChild(link);
        link.click();
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
            <form onSubmit={handleSpeechInput}>
              <p>
                <b>Input</b> your sentence(s) and click <b>Generate</b>, then
                press the
                <b> Play </b>button
              </p>
              <Input
                id="speech-input"
                placeholder="Your sentence here"
                maxLength={200}
                required
              />
              <div
                style={{
                  paddingTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Generate
                </Button>
              </div>
            </form>
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
