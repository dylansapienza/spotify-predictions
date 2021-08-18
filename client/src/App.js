import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'



function App(){

  const [response, setResponse] = useState("")

  function getResponse(){
    axios.get('/api/v1/say-something').then((res) => {
      setResponse(res.data);
    });
}

  useEffect(() => {
    getResponse();
  }, [])



  return(
    <div className="App">
        <h1>Hello from the frontend!</h1>
        <h1>{response.body}</h1>
      </div>
  );

}

export default App;
