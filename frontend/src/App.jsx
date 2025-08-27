import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layout from './Layout';
// import TableList from './Pages/Registration/TableList';
import Signup from './Pages/Signup/SignUp';
import Login from './Pages/Login/Login';
import Confirmation from './Pages/Confirmation/Confirmation';
import Profile from './Pages/Profile/Profile';
import Menu from './Pages/Menu/Menu';
import Gallery from './Pages/Gallery/Gallery';
import AdminDashboard from "./Admin/AdminDashboard";
import AddMenu from './Admin/AddMenu';
import AddMenuItem from './Admin/AddMenuItem';
import CategoryMenuPage from "./Pages/Menu-Items/CategoryMenuPage";
import AllCategories from './Admin/AllCategories';
import AllItems from './Admin/AllItems';
import AddTables from './Admin/AddTables';
import AllTables from './Admin/AllTables';
import ReserveTable from './Pages/Reserve-Table/ReserveTable';
import ReservationList from './Admin/ReservationList';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Layout />}>
          <Route path="/register-user" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reserve-table" element={<ReserveTable />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/menu" element={<Menu />} />
           <Route path="/menu/:id" element={<CategoryMenuPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="add-menu" element={<AddMenu />} />
            <Route path="add-menu-item" element={<AddMenuItem />} />
            <Route path="all-categories" element={<AllCategories />} />
            <Route path="all-items" element={<AllItems />} />
            <Route path="add-tables" element={<AddTables />} />
            <Route path="all-tables" element={<AllTables />} />
            <Route path="reservation-list" element={<ReservationList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App