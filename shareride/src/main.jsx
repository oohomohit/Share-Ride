import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import MyJourneyForm from "./components/MyJourneyForm.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <MyJourneyForm/> */}
   
  </StrictMode> 
);
