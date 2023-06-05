import './App.css';
import AddConsumer from './consumers/AddConsumer';
import EditConsumer from './consumers/EditConsumer';
import ViewConsumer from './consumers/ViewConsumer';
import Navbar from './components/Navbar';
import Home from './Home';
import Consumers from './consumers/Consumers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Producers from './producers/Producers';
import AddProducer from './producers/AddProducer';
import EditProducer from './producers/EditProducer';
import ViewProducer from './producers/ViewProducer';
import Vendors from './vendors/Vendors';
import AddVendor from './vendors/AddVendor';
import ViewVendor from './vendors/ViewVendor';
import EditVendor from './vendors/EditVendor';
import Footer from './components/Footer';
import About from './components/About';
import Details from './details/Details';
import ViewDetail from './details/ViewDetail';
import AddDetail from './details/AddDetail';
import EditDetail from './details/EditDetail';
import Stock from './stock/Stock';
import AddStock from './stock/AddStock';
import EditStock from './stock/EditStock';
import ViewStock from './stock/ViewStock';
import Orders from './orders/Orders';
import ViewOrder from './orders/ViewOrder';
import AddOrder from './orders/AddOrder';
import EditOrder from './orders/EditOrder';
import AddOrderContent from './orders/AddOrderContent';
import Requests from './requests/Requests';
import AddRequest from './requests/AddRequest';
import EditRequest from './requests/EditRequest';
import ViewRequest from './requests/ViewRequest';
import AddRequestContent from './requests/AddRequestContent';
import EditRequestContent from './requests/EditRequestContent';
import EditOrderContent from './orders/EditOrderContent';
import Sales from './sales/Sales';
import AddSale from './sales/AddSale';
import EditSale from './sales/EditSale';
import ViewSale from './sales/ViewSale';
import AddSaleContent from './sales/AddSaleContent';
import EditSaleContent from './sales/EditSaleContent';
import Defects from './defects/Defects';
import AddDefect from './defects/AddDefect';
import EditDefect from './defects/EditDefect';
import Queries from './components/Queries';
import Query1 from './queries/Query1';
import Query2 from './queries/Query2';
import Query3 from './queries/Query3';
import Query4 from './queries/Query4';
import Query5 from './queries/Query5';
import Query7 from './queries/Query7';
import Query9 from './queries/Query9';
import Query10 from './queries/Query10';
import Query11 from './queries/Query11';
import Query12 from './queries/Query12';
import Query13 from './queries/Query13';
import Query15 from './queries/Query15';
import Query14 from './queries/Query14';
import Query16 from './queries/Query16';
import Query17 from './queries/Query17';
import Query18 from './queries/Query18';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/consumers" element={<Consumers/>}/>
          <Route exact path="/addconsumer" element={<AddConsumer/>}/>
          <Route exact path="/editconsumer/:id" element={<EditConsumer/>}/>
          <Route exact path="/viewconsumer/:id" element={<ViewConsumer/>}/>
          <Route exact path="/producers" element={<Producers/>}/>
          <Route exact path="/addproducer" element={<AddProducer/>}/>
          <Route exact path="/editproducer/:id" element={<EditProducer/>}/>
          <Route exact path="/viewproducer/:id" element={<ViewProducer/>}/>
          <Route exact path="/vendors" element={<Vendors/>}/>
          <Route exact path="/addvendor" element={<AddVendor/>}/>
          <Route exact path="/viewvendor/:id" element={<ViewVendor/>}/>
          <Route exact path="/editvendor/:id" element={<EditVendor/>}/>
          <Route exact path="/details" element={<Details/>}/>
          <Route exact path="/viewdetail/:id" element={<ViewDetail/>}/>
          <Route exact path="/editdetail/:id" element={<EditDetail/>}/>
          <Route exact path="/adddetail" element={<AddDetail/>}/>
          <Route exact path="/stock" element={<Stock/>}/>
          <Route exact path="/addstock" element={<AddStock/>}/>
          <Route exact path="/editstock/:id" element={<EditStock/>}/>
          <Route exact path="/viewstock/:id" element={<ViewStock/>}/>
          <Route exact path="/orders" element={<Orders/>}/>
          <Route exact path="/vieworder/:id" element={<ViewOrder/>}/>
          <Route exact path="/editorder/:id" element={<EditOrder/>}/>
          <Route exact path="/addorder" element={<AddOrder/>}/>
          <Route exact path="/addordercontent/:id" element={<AddOrderContent/>}/>
          <Route exact path="/editordercontent" element={<EditOrderContent/>}/>
          <Route exact path="/requests" element={<Requests/>}/>
          <Route exact path="/viewrequest/:id" element={<ViewRequest/>}/>
          <Route exact path="/editrequest/:id" element={<EditRequest/>}/>
          <Route exact path="/addrequest" element={<AddRequest/>}/>
          <Route exact path="/addrequestcontent/:id" element={<AddRequestContent/>}/>
          <Route exact path="/editrequestcontent/:id" element={<EditRequestContent/>}/>
          <Route exact path="/sales" element={<Sales/>}/>
          <Route exact path="/addsale" element={<AddSale/>}/>
          <Route exact path="/editsale/:id" element={<EditSale/>}/>
          <Route exact path="/viewsale/:id" element={<ViewSale/>}/>
          <Route exact path="/addsalecontent/:id" element={<AddSaleContent/>}/>
          <Route exact path="/editsalecontent" element={<EditSaleContent/>}/>
          <Route exact path="/defects" element={<Defects/>}/>
          <Route exact path="/adddefect" element={<AddDefect/>}/>
          <Route exact path="/editdefect" element={<EditDefect/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/queries" element={<Queries/>}/>
          <Route exact path="/vendors-by-type-details" element={<Query1/>}/>
          <Route exact path="/vendors-by-period" element={<Query2/>}/>
          <Route exact path="/details-info" element={<Query3/>}/>
          <Route exact path="/consumers-by-period" element={<Query4/>}/>
          <Route exact path="/consumers-by-count" element={<Query5/>}/>
          <Route exact path="/top10" element={<Query7/>}/>
          <Route exact path="/average-sales" element={<Queries/>}/>
          <Route exact path="/profit-info" element={<Query9/>}/>
          <Route exact path="/overhead-costs" element={<Query10/>}/>
          <Route exact path="/not-sold-details" element={<Query11/>}/>
          <Route exact path="/defects-by-period" element={<Query12/>}/>
          <Route exact path="/sold-details-in-day" element={<Query13/>}/>
          <Route exact path="/cash-report" element={<Query14/>}/>
          <Route exact path="/stock-report" element={<Query15/>}/>
          <Route exact path="/money-velocity" element={<Query16/>}/>
          <Route exact path="/capacity" element={<Query17/>}/>
          <Route exact path="/requests-by-detail" element={<Query18/>}/>
        </Routes>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
