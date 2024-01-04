import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { InspiroContext, useInspiroCrud } from "./components/context/InspiroContext";
import HomePage from "./components/HomePage";
import Products from "./components/Products";
import ContactUs from "./components/ContactUs";
import WhyInspiro from "./components/WhyInspiro";
import CourseDescription from "./components/CourseDescription";
import ListAllCourses from "./components/ListAllCourses";
import Navigationbar from "./components/Navigationbar";
import PhotoPage from "./components/PhotoPage";
import "./components/css/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import VideoPage from "./components/VideoPage";
import CurrentAffairsMainPage from "./components/CurrentAffairsMainPage";
import ResultPage from "./components/ResultPage";
import DemoClass from "./components/DemoClass";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import RefundPolicy from "./components/RefundPolicy";
import Sidebar from "./components/sidemenu";
import SubProducts from "./components/SubProducts";
import Footer from "./components/Footer";
import NotificationMain from "./components/NotificationMain";
import Popup from "./components/Popup";
import ScrollToTop from "./components/ScrollToTop";
import {disableReactDevTools} from "@fvilers/disable-react-devtools"

if(process.env.NODE_ENV === 'prod'){disableReactDevTools()};

function App() {
  return (
    <div>
      <Router>
        <InspiroContext>
          <Navigationbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Products" element={<Products />}></Route>
            <Route path="/ContactUs" element={<ContactUs />}></Route>
            <Route path="/WhyInspiro" element={<WhyInspiro />}></Route>
            <Route path="/ResultPage" element={<ResultPage />} />
            <Route path="/DemoClass" element={<DemoClass />} />
            <Route
              path="/CourseDescription"
              element={<CourseDescription />}
            ></Route>
            <Route path="/ListAllCourses" element={<ListAllCourses />}></Route>
            <Route path="/PhotoPage" element={<PhotoPage />} />
            <Route path="/VideoPage" element={<VideoPage />} />
            <Route
              path="CurrentAffairsMainPage"
              element={<CurrentAffairsMainPage />}
            />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route
              path="/TermsAndConditions"
              element={<TermsAndConditions />}
            />
            <Route path="/RefundPolicy" element={<RefundPolicy />} />
            <Route path="SubProducts" element={<SubProducts />} />
            <Route path="/NotificationMain" element={<NotificationMain />} />
          </Routes>
          <ScrollToTop />
          <Footer />
        </InspiroContext>
      </Router>
      <Popup />
    </div>
  );
}
export default App;
