
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// COMPONENT
import Home from './Home'
import CreateRestaurantDataset from './CreateRestaurantDataset'
import CreateHotelDataset from './CreateHotelDataset';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import NavBar from './components/NavBar';
import Map from './components/Map';
import Loader from './components/Loader'
import Footer from './components/Footer';
import themeReducer from "./features/theme";
import factorReducer from "./features/factorDetails";
import businessReducer from "./features/business";
import headerReducer from "./features/header";
import userReducer from "./features/user";
import InputHotelDetails from './components/InputHotelDetails';
import InputPharmacyDetails from './components/InputPharmacyDetails';
import Results from './components/Results';
import Pricing from './components/Pricing';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import BusinessTypePage from './components/BusinessTypePage';
import InputGroceryDetails from './components/InputGroceryDetails';
import MultipleResult from './components/MultipleResult';
import ResultsWOTypes from './components/ResultsWOTypes';
import LocationBasedPredict from './components/LocationBasedPredict';
import MultipleResultP from './components/PharmacyInputs/MultupleResultsP';
import MultipleResultG from './components/Grocery Input/MultipleResultG'
import FactorDetails from './components/FactorDetails';
import AdminDashboard  from './components/Admin/AdminDashboard';
import GroceryTips from './components/Grocery Input/groceryTips'
import UserSubscriptionPlan from './components/User/UserSubscriptionPlan';
import ResultsFD from './components/ResultsFD';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    business: businessReducer,
    header: headerReducer,
    user: userReducer,
    factorDetails: factorReducer
  },
});

function App() {

  return (

    <Provider store={store}>
      <ResponsiveAppBar />
      <Routes>
        <Route >
          <Route index element={<Home/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/createRes" element={<CreateRestaurantDataset />} />
          <Route path="/createHotel" element={<CreateHotelDataset />} />
          <Route path="/result" element={<Results />} />
          <Route path="/inputHotel" element={<InputHotelDetails />} />
          <Route path="/inputPharmacy" element={<InputPharmacyDetails />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/Service" element={<BusinessTypePage/>} />
          <Route path="/inputGrocery" element={<InputGroceryDetails />} />
          <Route path="/multipleResult" element={<MultipleResult/>} />
          <Route path="/resultWOTypes" element={<ResultsWOTypes/>} />
          <Route path="/Service" element={<BusinessTypePage />} />
          <Route path="/locationBasedPredict" element={<LocationBasedPredict />} />
          <Route path="/pmultipleResult" element={<MultipleResultP/>} />
          <Route path="/multipleResultG" element={<MultipleResultG/>} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/GroceryTips" element={<GroceryTips />} />
          <Route path="/AreaAnalysis" element={<FactorDetails />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UserSubscriptionPlan" element={<UserSubscriptionPlan />} />
          <Route path="/ResultsFactorDetails" element={<ResultsFD />} />
        </Route>
      </Routes>
      <Footer />
    </Provider>
    

  );
}

export default App;
