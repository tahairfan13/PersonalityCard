import { Provider } from "react-redux";
import "./App.css";
import PersonalityCard from "./components/PersonalityCard";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersonalityCard />
    </Provider>
  );
}

export default App;
