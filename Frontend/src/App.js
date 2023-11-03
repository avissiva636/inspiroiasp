import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { InspiroContext } from "./components/context/InspiroContext";
import HomePage from "./components/HomePage";
import Products from "./components/Products";
import ContactUs from "./components/ContactUs";
import WhyInspiro from "./components/WhyInspiro";
import CourseDescription from "./components/CourseDescription";
import ListAllCourses from "./components/ListAllCourses";
import Navigationbar from "./components/Navigationbar";
import PhotoPage from "./components/PhotoPage";
import VideoPage from "./components/VideoPage";
import { useEffect } from "react";
import CurrentAffairsMainPage from "./components/CurrentAffairsMainPage";
import ResultPage from "./components/ResultPage";
import DemoClass from "./components/DemoClass";
import Footer from "./components/Footer";
function App() {
  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scrolls to the top of the page
  // }, []);
  return (
    <div>
      <Router>
        <InspiroContext>
          <Navigationbar />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Products" element={<Products />}></Route>
            <Route path="/ContactUs" element={<ContactUs />}></Route>
            <Route path="/WhyInspiro" element={<WhyInspiro />}></Route>
            <Route path="/ResultPage" element={<ResultPage />} />
            <Route path="/DemoClass" element={<DemoClass />}/>
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
          </Routes>
        </InspiroContext>
      </Router>
    </div>
  );
}
export default App;
