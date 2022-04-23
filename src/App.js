import logo from './logo.svg';
import './App.css';
import StockList from './components/StockList';
function App() {
  return (
    <StockList stocks={[{'id': 1, 'name': 'ABC', 'price': '12'},{'id': 2, 'name': 'DEF', 'price': '14'}]} />
  );
}

export default App;
