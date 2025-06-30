
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Maincontent from "./MyComponents/Main"; 
import Footer from "./MyComponents/Footer";
import Home from "./MyComponents/Herosection";
import MenSection from "./MyComponents/MenSection.jsx";
import LoginSignup from "./MyComponents/LOginSignup.jsx";
import WomenSection from "./MyComponents/WomenSection.jsx";
import Contact from "./MyComponents/Contact.jsx";
import Shop from "./MyComponents/Shopnow";
import Cart from "./MyComponents/Cart.jsx";
import Payment from "./MyComponents/Payment.jsx";
import OrderSuccess from "./Mycomponents/orderSuccess.jsx";


const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
       
          <Route path="/" element={<Maincontent />}>
           
            <Route index element={<Home />} />
            <Route path="mens" element={<MenSection />} />
            <Route path="women" element={<WomenSection />} />
            <Route path="contact" element={<Contact/>}/>
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="LoginSignup" element={<LoginSignup />} />
            <Route path="payment" element={<Payment/>}/>
           <Route path="/OrderSuccess" element={<OrderSuccess />} />
          </Route>
        </Routes>
      
        <Footer />
      </div>
    </Router>
    
  ) ;
};

export default App;