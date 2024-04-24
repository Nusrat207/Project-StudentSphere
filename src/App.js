
import './App.css';
import Home from './screens/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './screens/Signup';
import Login from './screens/Login';
import FoodEast from './screens/FoodEast';
import FoodWest from './screens/FoodWest';
import { CartProvider } from './components/ContextReducer';
import { CartProvider2 } from './components/contextred2';

import MyProfile from './screens/MyProfile';
import Merch from './screens/Merch';
function App() {
  return (
    <CartProvider> <CartProvider2>
      <Router>
      <div>
        <Routes>
          <Route exact path="/" element={ <Home></Home> } />
          <Route exact path="/login" element={ <Login></Login> } />
          <Route exact path="/signup" element={ <Signup></Signup> } />
          <Route exact path="/eastShop" element={ <FoodEast></FoodEast> } />
          <Route exact path="/westShop" element={ <FoodWest></FoodWest> } />
          <Route exact path="/myprofile" element={ <MyProfile></MyProfile> } />
          <Route exact path="/merch" element={ <Merch></Merch> } />
        </Routes>
      </div>
    </Router> </CartProvider2>
    </CartProvider>
  );
}

export default App;
//<div style={{ fontSize: '5rem' }}>Hello world</div>