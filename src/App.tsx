import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch } from "./States/Hooks";
import { initialize } from "./States/TodoSlice";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Index from "./Pages/Index";


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = "Todo App"
    axios.get("http://localhost:5000/")
      .then(getResponse => {
        dispatch(initialize(getResponse.data.todo))
      })
      .catch(err => {
        console.log(err);
      })
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
