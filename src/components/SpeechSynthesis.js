import { Card, Input, Button } from "antd";
import React from "react";

function SpeechSynthesis(props) {
  const language = props.languageProp;
  const title = { en: "Speech Synthesis", it: "Sintesi vocale" };
  const formDescription = {
    en: (
      <React.Fragment>
        <b>Input</b> your text and click the <b>Generate</b> button to download:
      </React.Fragment>
    ),
    it: (
      <React.Fragment>
        <b>Inserisci</b> il tuo testo e clicca sul pulsante <b>Genera</b> per
        scaricare:
      </React.Fragment>
    ),
  };
  const generateButtonText = { en: "Generate", it: "Genera" };
  const textInputPlaceholder = {
    en: "Insert text here",
    it: "Inserire testo qui",
  };

  return (
    <Card title={title[language]} style={{ width: 300 }}>
      <form onSubmit={props.handleSpeechInputProp}>
        <p>{formDescription[language]}</p>
        <Input
          id="speech-input"
          placeholder={textInputPlaceholder[language]}
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
            {generateButtonText[language]}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default SpeechSynthesis;
