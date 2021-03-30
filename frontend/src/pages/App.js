import { BrowserRouter, Route, Switch } from "react-router-dom";
import CustomerOrders from "./CustomerOrders";
import Home from './Home';
import InventoryDashboard from "./InventoryDashboard";
import OrdersDashboard from "./OrdersDashboard";
import ShippingDashboard from "./ShippingDashboard";
import ShoppingCart from "./ShoppingCart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/CustomerOrders" component={CustomerOrders}/>
          <Route exact path="/InventoryDashboard" component={InventoryDashboard}/>
          <Route exact path="/OrdersDashboard" component={OrdersDashboard}/>
          <Route exact path="/ShippingDashboard" component={ShippingDashboard}/>
          <Route exact path="/ShoppingCart" component={ShoppingCart}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
