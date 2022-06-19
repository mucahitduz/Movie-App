import Mainpage from "./components/Mainpage";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./context/MovieContext";

function App() {
  return (
    <div>
      <MovieProvider>
        <Navbar />
        <Mainpage />
      </MovieProvider>
    </div>
  );
}

export default App;
