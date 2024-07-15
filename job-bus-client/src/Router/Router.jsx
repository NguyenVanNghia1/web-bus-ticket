import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Index_Home from "../Pages/Home/Index_Home";
import Login from "../Pages/Account/Login";
import Contact from "../Pages/Contact/Contact";
import LookUp_Ticket from "../Pages/LookUp/LookUp_Ticket";
import Register from "../Pages/Account/Register";
import { UserContextProvider } from "../Pages/Account/UserContext";
import Account from "../Pages/Account/Account";
import ResetPassword from "../Pages/Account/ResetPassword";
import Logout from "../Pages/Account/Logout";
import ForgotPassword from "../Pages/Account/ForgotPassword";
import UpdatePassword from "../Pages/Account/UpdatePassword";
import Index_BookTickets from "../Pages/Booking/Index_BookTickets";
import Index_InformationTicket from "../Pages/Booking/Information_Ticket/Index_InformationTicket";
import Schedule from "../Pages/Schedule/Schedule";
import News from "../Pages/News/News";
import Payment from "../Pages/Pay/Payment";
import Detail_News from "../Pages/News/Detail_News";
import Success from "../Pages/Pay/Success";
import History_Ticket from "../Pages/Account/History_Ticket";

import AdminLayout from "../AdminLayout";
import Index_Admin from "../Admin/Home/Index_Admin";
import Index_RouteBusAdmin from "../Admin/RouteBus/Index_RouteBusAdmin";
import Index_TripBusAdmin from "../Admin/TripBus/Index_TripBusAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserContextProvider>
        <App />
      </UserContextProvider>
    ),
    children: [
      { path: "/", element: <Index_Home /> },
      { path: "/lich-trinh", element: <Schedule /> },
      { path: "/dat-ve", element: <Index_BookTickets /> },
      { path: "/dat-ve/thong-tin-ve", element: <Index_InformationTicket /> },
      { path: "/thanh-toan", element: <Payment /> },
      { path: "/ve-xe", element: <Success /> },
      { path: "/lien-he", element: <Contact /> },
      { path: "/tra-cuu", element: <LookUp_Ticket /> },
      { path: "/dang-nhap", element: <Login /> },
      { path: "/dang-ky", element: <Register /> },
      { path: "/quen-mat-khau", element: <ForgotPassword /> },
      { path: "/cap-nhat-mat-khau/:id/:token", element: <UpdatePassword /> },
      { path: "/account", element: <Account /> },
      { path: "/account/dat-lai-mat-khau", element: <ResetPassword /> },
      { path: "/account/dang-xuat", element: <Logout /> },
      { path: "/account/lich-su-mua-ve", element: <History_Ticket /> },
      //tin tuc
      { path: "/tin-tuc", element: <News /> },
      { path: "/tin-tuc/:id", element: <Detail_News /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "trang-chu", element: <Index_Admin /> },
      { path: "tuyen-xe", element: <Index_RouteBusAdmin /> },
      { path: "chuyen-xe", element: <Index_TripBusAdmin /> },
    ],
  },
]);

export default router;
