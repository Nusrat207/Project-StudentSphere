
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
import Study from './screens/Study';
import Summer from './screens/Summer';
import Winter from './screens/Winter';
import MpeMerch from './screens/MpeMerch';
import EeeMerch from './screens/eeeMerch';
import CeeMerch from './screens/ceeMerch';
import BtmMerch from './screens/btmMerch';
import MealHistory from './screens/MealHistory';
import MerchHistory from './screens/MerchHistory';
import Laundry from './screens/Laundry'; 


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
          <Route exact path="/summer" element={ <Summer></Summer> } />
          <Route exact path="/winter" element={ <Winter></Winter> } />
          <Route exact path="/cse" element={ <CseMerch></CseMerch> } />
          <Route exact path="/mpe" element={ <MpeMerch></MpeMerch> } />
          <Route exact path="/eee" element={ <EeeMerch></EeeMerch> } />
          <Route exact path="/cee" element={ <CeeMerch></CeeMerch> } />

          <Route exact path="/btm" element={ <BtmMerch></BtmMerch> } />

          <Route exact path="/study" element={ <Study></Study> } />
          <Route exact path="/laundry" element={<Laundry />} />

          <Route exact path="/mealHistory" element={ <MealHistory/> }/>
          <Route exact path="/merchHistory" element={ <MerchHistory/> }/>
        </Routes>
      </div>
    </Router> </CartProvider2>
    </CartProvider>
  );
}

export default App;
//<div style={{ fontSize: '5rem' }}>Hello world</div>
// <Route exact path="//edit-profile" element={ <MyProfile></MyProfile> } />
//<Route exact path="/study" element={ <Study></Study> } />