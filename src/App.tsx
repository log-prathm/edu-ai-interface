import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import QuizForge from "./pages/QuizForge";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home />}></Route>
        <Route path="/chat" element= {<Chat />}></Route>
        <Route path="/Chat" element= {<Navigate to="/chat" replace />}></Route>
        <Route path="/quiz" element= {<QuizForge />}></Route>
        <Route path="/quizforge.html" element= {<QuizForge />}></Route>
        <Route path="*" element= {<Navigate to="/" replace />}></Route>
      </Routes>
    </BrowserRouter>
  )
} 
