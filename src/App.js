import { useState, useEffect } from "react";
import "./App.css";

const a = {
    user: {
      id: 1,
      name: {
        firstName: "James",
        lastName: "Ibori"
      },
      location: {
        city: "Ikoyi",
        state: "Lagos",
        address: "One expensive house like that"
      }
    }
}

function App() {
  const [data, setData] = useState();

  const [result, setResult] = useState();

  useEffect(() => {
    console.log(data)
  }, [data])

  const pathGet = (arr, query) => {
    const path = ["a"];
    Object.keys(arr).forEach((key) => {
      if (typeof arr[key] === "object") {
        path.push(key);
        console.log(path)
        pathGet(arr[key], query);
      }
      else {
        if (arr[key] === query) {
          path.push(key);
          return `${path.join(".")}.query`;
        }
        else {
          return `${query} not found`
        }
      }
    });
  };

  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(pathGet(a, data.query));
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="query">Enter the value to Search</label>
        <br />
        <input type="text" name="query" onChange={handleChange} />
        <br />
        <input type="submit" name="submit" value="Search" />
      </form>
      <div>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default App;
