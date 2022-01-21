import React, { useLayoutEffect, useState, useEffect } from "react";
import { Layout, PageHeader, Select } from "antd";
import SpeechSynthesis from "./components/SpeechSynthesis";
import axios from "axios";
import "antd/dist/antd.css";
import "./App.css";
const { Content, Footer } = Layout;

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

function App(props) {
  const host = props.host;
  const year = new Date().getFullYear();
  const [width, height] = useWindowSize();
  const { Option } = Select;
  const [language, setLanguage] = useState("it");

  useEffect(() => {
    // Viene eseguito una volta durante il primo rendering
    // e ogni volta che 'language' cambia
    document.title = "deepee voice - " + language;
  }, [language]);

  function handleSetLanguage(event) {
    setLanguage(event);
  }

  function handleSpeechInput(event) {
    event.preventDefault();

    const speechInput = document.querySelector("#speech-input").value;
    const data = { speechText: speechInput, speechLanguage: language };
    const headers = {
      "Content-Type": "application/json",
      Accept: "audio/mp3",
    };

    axios({
      url: host + "/speechInput",
      method: "POST",
      headers: headers,
      responseType: "blob", // importante
      data: data,
    })
      .then((res) => {
        const blob = new Blob([res.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.mp3");
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
        <PageHeader
          ghost={false}
          //onBack={() => window.history.back()}
          title="DEEPEE VOICE"
          //subTitle="Questo è un sottotitolo"
          extra={[
            <Select
              id="language"
              key={0}
              defaultValue={language}
              style={{ width: 120 }}
              onChange={handleSetLanguage}
            >
              <Option value="en">English</Option>
              <Option value="it">Italiano</Option>
            </Select>,
          ]}
        ></PageHeader>
        <Content
          style={{
            padding: "0 50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { width },
            height: { height },
          }}
        >
          <SpeechSynthesis
            languageProp={language}
            handleSpeechInputProp={handleSpeechInput}
          />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          deepee voice ©{year} Created by Andrea Di Pisa (deepee)
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
