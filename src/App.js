import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "./reducers/app";
import {useEffect} from "react";

function App() {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(state => state.app.isDarkMode)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    if (!isDarkMode) return;
    dispatch(toggleTheme());
  }, []);

  // use class "'dark-mode' to change theme"
  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Header />
      <List />
    </div>
  );
}

export default App;
