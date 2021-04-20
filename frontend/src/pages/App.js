import { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CustomerOrders from "./CustomerOrders";
import Home from './Home';
import InventoryDashboard from "./InventoryDashboard";
import OrdersDashboard from "./OrdersDashboard";
import ShippingDashboard from "./ShippingDashboard";
import ShoppingCart from "./ShoppingCart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from '../utils/AuthContext';
import CustomerProtectedRoute from './CustomerProtectedRoute';
import EmployeeProtectedRoute from './EmployeeProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import LoginPage from './LoginPage';

function useLocalStorage(key, initialValue) {

	/**********************************************************************
	*
	* This grabs a piece of data from local storage in the browser.
	* It helps the persistences of states.
	*
	* @param key Name of the value being to be queried.
	* @param initialValue value of data being retrieved. (usually null on start up)
	*
	* @return The initial value, usually received by the context state.
	*
	***********************************************************************/
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			//console.log(error);
			return initialValue;
		}
	});

	/**********************************************************************
	*
	* This stores or updates a value in global storage.
	*
	* @param value The value being stored or updated
	*
	* @return A state hook.
	*
	***********************************************************************/
	const setValue = value => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue];
}

function App() {

  // User's authentication tokens
  const [customerAccessToken, setCustomerAccessToken] = useLocalStorage('customerAccessToken', null);
  const [customerRefreshToken, setCustomerRefreshToken] = useLocalStorage('customerRefreshToken', null);
  const [employeeAccessToken, setEmployeeAccessToken] = useLocalStorage('employeeAccessToken', null);
  const [employeeRefreshToken, setEmployeeRefreshToken] = useLocalStorage('employeeRefreshToken', null);

  //Info about the current user.
  const [name, setName] = useLocalStorage('name', "");
  const [id, setId] = useLocalStorage('id', 0);
  const [emailAddress, setEmailAddress] = useLocalStorage('emailAddress', 0);

  // Flag for viewing protected routes.
  const [isCustomerAuthed, setIsCustomerAuthed] = useLocalStorage('isCustomerAuthed', false);
  const [isEmployeeAuthed, setIsEmployeeAuthed] = useLocalStorage('isEmployeeAuthed', false);

  // For administrator purposes
  const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin', false);

  // Shopping Cart Data
  const [shoppingCartContents, setShoppingCartContents] = useLocalStorage('shoppingCartContents', []);
  const [selectedPartRows, setSelectedPartRows] = useLocalStorage('selectedPartRows', [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter>
        <Switch>
          <AuthContext.Provider
            value={{
              customerAccessToken,
              setCustomerAccessToken,
              customerRefreshToken,
              setCustomerRefreshToken,
              employeeAccessToken,
              setEmployeeAccessToken,
              employeeRefreshToken,
              setEmployeeRefreshToken,
              name,
              setName,
              setEmailAddress,
              emailAddress,
              id,
              setId,
              isCustomerAuthed,
              isEmployeeAuthed,
              setIsCustomerAuthed,
              setIsEmployeeAuthed,
              isAdmin,
              setIsAdmin,
              shoppingCartContents,
              setShoppingCartContents,
              selectedPartRows,
              setSelectedPartRows
            }}>
            <Navbar/>
            <br/><br/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Login" component={LoginPage}/>
            <Route exact path="/ShoppingCart" component={ShoppingCart}/>
            <CustomerProtectedRoute exact path="/CustomerOrders" component={CustomerOrders}/>
            <EmployeeProtectedRoute exact path="/InventoryDashboard" component={InventoryDashboard}/>
            <EmployeeProtectedRoute exact path="/OrdersDashboard" component={OrdersDashboard}/>
            <AdminProtectedRoute exact path="/ShippingDashboard" component={ShippingDashboard}/>
            <br/><br/>
            <Footer style={{ marginTop: 'auto' }}/>
          </AuthContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
