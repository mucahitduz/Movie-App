import Mainpage from "./components/Mainpage";
import Navbar from "./components/Navbar";
import Watchlater from "./components/Watchlater";
import { MovieProvider } from "./context/MovieContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Watched from "./components/Watched";
import Search from "./components/Search";

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
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </div>
  );
}

export default App;
