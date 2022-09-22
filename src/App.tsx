import { useEffect } from "react";


function App() {

  useEffect(() => {
    document.title = "App"
  },[])

  return (
    <div>
      Hello
    </div>
  );
}

export default App;
