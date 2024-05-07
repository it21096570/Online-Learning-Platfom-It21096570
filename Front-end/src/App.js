import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Product from './components/product'
import PayHerePayment from './components/PayHerePayment'
import PaymentSummary from './components/PaymentSummary'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/payment" element={<PayHerePayment />} />
          <Route path="/paymentSummary" element={<PaymentSummary />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
