import Navigationbar from "./Navigationbar";
import Gallery from "./Gallery";

import StudentFeedback from "./StudentsFeedback";
import Footer from "./Footer";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import ContactUsHomePage from "./ContactUsHomePage";
import PopularCourse from "./PopularCourses";
import ProductsHomePage from "./ProductsHomePage";

const HomePage = () => {
  return (
    <div>
      <Navigationbar></Navigationbar>
      <PopularCourse />
      <ProductsHomePage />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Gallery />
      <br />
      <br />
      <br />
      <br />
      <br />
      <StudentFeedback />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FrequentlyAskedQuestions />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ContactUsHomePage />
      <br />
      <Footer />
    </div>
  );
};
export default HomePage;