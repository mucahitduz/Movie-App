import Mainpage from "./pages/Mainpage/Mainpage";
import Navbar from "./components/Navbar";
import Watchlater from "./components/Watchlater";
import { MovieProvider } from "./context/MovieContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Watched from "./components/Watched";
import Search from "./components/Search";
import Detail from "./pages/Detail/Detail";

// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

function App() {
  return (
    <div>
      <MovieProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlater" element={<Watchlater />} />
            <Route path="/watched" element={<Watched />} />
            <Route path="/details/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </div>
  );
}

export default App;
