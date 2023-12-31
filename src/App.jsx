import { useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import "./App.css";

const App = () => {
  const [img, setimg] = useState(null);
  const [name, setname] = useState("");
  const [mode, setmode] = useState("light");
  const [load, setload] = useState(false);
  //
  const modechange = () => {
    if (mode == "light") {
      setmode("dark");
    } else if (mode == "dark") {
      setmode("light");
    }
  };
  //
  const sty = {
    color: mode == "light" ? "black" : "white",
    border: mode == "light" ? "1px solid black" : "1px solid white",
    backgroundColor: mode == "light" ? "white" : "black",
  };
  const styc = {
    color: mode == "light" ? "black" : "white",
    backgroundColor: mode == "light" ? "white" : "black",
  };
  const isty = {
    color: mode == "light" ? "black" : "white",
    backgroundColor: mode == "light" ? "white" : "#363535",
    // border: mode == "light" ? "0.5px solid black" : "none",
  };
  const sbs = {
    backgroundColor: mode == "light" ? "black" : "rgb(0,191,255)",
  };
  //
  const search = (e) => {
    setname(e?.target.value);
  };
  //
  const click = (e) => {
    e.preventDefault();
    setload(true);
    fetch(`https://api.pexels.com/v1/search?query=${name}&per_page=45`, {
      method: "GET",
      headers: {
        Authorization:
          "yAt9NvjN4rln3RvP20tk1xXK8JiQ8kOKfOonKSlTavUBZrNoameEPfE5",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setimg(res.photos);
        setload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="king-cont" style={styc}>
      <button id="mode" onClick={modechange} style={sty}>
        {mode}
      </button>
      <div id="header" style={styc}>
        Image search
      </div>
      <div className="bar-area">
        <form id="f" onSubmit={click}>
          <input
            type="text"
            className="inbar"
            style={isty}
            onChange={search}
          ></input>
          <button id="sb" type="submit" style={sbs}>
            Search
          </button>
        </form>
      </div>
      <div id="content">
        {img == null && !load && <div id="message">Hallo, search the web!</div>}
        {load && (
          <div id="loader">
            <CircleLoader
              color={mode == "light" ? "#431894" : "#36d7b7"}
              loading={load}
              size={120}
            />
          </div>
        )}
        {!load &&
          img?.map((data) => {
            return (
              <div>
                <img
                  id="image"
                  src={data.src.small}
                  style={{
                    border:
                      mode == "light" ? "1px solid black" : "1px solid white",
                  }}
                ></img>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
