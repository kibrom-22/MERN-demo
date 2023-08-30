import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListProductComponent from "./components/list-product.component";
import ViewProductComponent from "./components/view-product.component";
import AddProductComponent from "./components/add-product.component";




// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Router>
      
        <div className="container">
            <Routes>
            <Route path="/" element={<ListProductComponent />} />
            <Route path="/products" element={<ListProductComponent />} />
            <Route path="/add-product/:id" element={<AddProductComponent />} />
            <Route path="/view-product/:id" element={<ViewProductComponent />} />
            
            </Routes>
         
        </div>
       
      </Router>
    </div>
  );
}

export default App;
