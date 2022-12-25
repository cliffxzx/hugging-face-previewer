import React, { useState, useEffect } from "react";
import axios from "axios";
import FontAwesome from "./Icon";
import {
  Card,
  Textarea,
  Select,
  Tag,
  Upload,
  Button,
  Spin,
  Progress,
} from "shineout";

const Home = () => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [model, setModel] = useState("");
  const [type, setType] = useState("text");
  const [task, setTask] = useState("");
  const [taskID, setTaskID] = useState("");
  const [ratio, setRatio] = useState(0);
  const [status, setStatus] = useState("Runnable");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  useEffect(() => {
    if (taskID !== "") {
      const timer = setInterval(async () => {
        const output = await axios.get(`/task/${taskID}/status`);
        setStatus(output.data.message);
        setRatio(
          { Runnable: 5, Queueing: 10, Running: 30, Success: 100, Error: 0 }[
            output.data.message
          ]
        );

        if (output.data.message == "Success") {
          const output = await axios.get(`/task/${taskID}/output`);
          setOutput(output.data.text);
          clearInterval(timer);
        }
      }, 2000);
    }
  }, [taskID]);
  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ textAlign: "center", margin: "40px 0" }}>Model Monkey</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Progress
          value={ratio}
          strokeWidth={20}
          style={{ width: 700 }}
          color="linear-gradient(45deg, #ffadd2 25%, #eb2f96 25%, #eb2f96 50%, #ffadd2 50%, #ffadd2 75%, #eb2f96 75%, #eb2f96)"
        >
          {status}
        </Progress>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          padding: "20px 0 0 0",
        }}
      >
        <Select
          keygen
          loading={searchLoading}
          data={searchResult}
          style={{
            width: 500,
            zIndex: 100,
          }}
          placeholder="Select Model"
          onFilter={async (e) => {
            setSearchLoading(true);
            const result = await axios.get("/model/quicksearch", {
              params: { q: e },
            });
            const modelIDs = result.data.models.map((m) => m.id);
            setSearchResult(modelIDs);
            setSearchLoading(false);
          }}
          onChange={async (name) => {
            setSearchLoading(true);
            setModel(name);
            const info = (await axios.get(`/model/${name}`)).data;
            setType(info.input_type);
            setTask(info.task);
            setSearchLoading(false);
          }}
        />
        {task === "" ? (
          searchLoading /*&& <Spin style={width: 50} />*/
        ) : (
          <Tag type="success" style={{ zIndex: 101 }}>
            {task}
          </Tag>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
          paddingTop: 30,
        }}
      >
        <Card key={1} style={{ padding: "20px", width: "400px" }}>
          {type === "text" ? (
            <Textarea onChange={setInput} rows={15} placeholder="Input" />
          ) : (
            <input type="file" id="file_upload" />
          )}
        </Card>
        <Card key={2} style={{ padding: "20px", width: "400px" }}>
          <Textarea value={output} rows={15} placeholder="Output" />
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          padding: "20px 0 0 0 ",
        }}
      >
        <Button
          type="primary"
          onClick={async (e) => {
            const fd = new FormData();
            if (type === "text") {
              fd.append("input", input);
              const result = await axios.post(`/model/${model}`, fd, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              setRatio(10);
              setStatus("Queueing");
              setTaskID(result.data.task_id);
            } else if (type == "file") {
              fd.append(
                "input",
                document.querySelector("#file_upload").files[0]
              );
              const result = await axios.post(`/model/${model}`, fd, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Home;
