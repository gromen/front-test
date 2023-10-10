import "./App.css";
import Header from "./components/Header";
import List from "./components/List";

function App() {
  // use class "'dark-mode' to change theme"
  return (
    <div className="dark-mode">
      <Header />
      <List />
    </div>
  );
}

export default App;
