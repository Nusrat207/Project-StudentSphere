
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


import Merch from './screens/Merch';
import MyProfile from './screens/MyProfile';
import EditProfile from './screens/editProfile';
import Tshirt from './screens/Tshirt';
import CseMerch from './screens/cseMerch';


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
          <Route exact path="/edit-profile" element={ <EditProfile/>} />
          <Route exact path="/tshirt" element={ <Tshirt></Tshirt> } />
          <Route exact path="/cse" element={ <CseMerch></CseMerch> } />
        </Routes>
      </div>
    </Router> </CartProvider2>
    </CartProvider>
  );
}

export default App;
//<div style={{ fontSize: '5rem' }}>Hello world</div>
// <Route exact path="//edit-profile" element={ <MyProfile></MyProfile> } />