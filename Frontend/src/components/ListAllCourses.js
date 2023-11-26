import ContactUsHomePage from "./ContactUsHomePage";
import Footer from "./Footer";
import { useInspiroCrud } from "./context/InspiroContext";
import { useEffect, useState } from "react";
import CourseDescription from "./CourseDescription";
import { useLocation } from "react-router-dom";
const ListAllCourses = () => {
  const { Courses } = useInspiroCrud();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSubCourse, setSelectedSubCourse] = useState(null);
  const location = useLocation();
  let initialTitle = location.state.data.Title;
  let initialSubarr = location.state.data.subarr;
  const [a, setA] = useState(initialTitle);
  const [b, setB] = useState(initialSubarr);

  useEffect(() => {
    if (location.state.data) {
      setA(location.state.data.Title);
      setB(location.state.data.subarr);
    }
  }, [location.state.data]);

  const handleCourseClick = (index, Title, subarr) => {
    if (selectedCourse === index) {
      setSelectedCourse(null);
    } else {
      setSelectedCourse(index);
      setSelectedSubCourse(null);
      setA(Title);
      setB(subarr);
    }
  };

  const handleSubtitleClick = (index, Title, subarr) => {
    if (selectedSubCourse === index) {
      setSelectedSubCourse(null);
    } else {
      setSelectedSubCourse(index);
      setA(Title);
      setB(subarr);
    }
  };
  return (
    <div>
      <div className="courses__page">
        <div className="courses__header">Courses offered</div>
        {Courses.map((course, index) => {
          let Title;

          if (course.SubTitle) {
            Title = course.SubTitle.map((subCourse, subIndex) => (
              <div className="d-flex">
                <div
                  className="col-3 text__title"
                  key={subIndex}
                  onClick={() =>
                    handleSubtitleClick(
                      subIndex,
                      subCourse.Title,
                      subCourse.subarr
                    )
                  }
                >
                  <div className="text__left">{subCourse.Title}</div>
                </div>
                <div className="col-9 text__description">
                  {" "}
                  {selectedSubCourse === subIndex && (
                    <CourseDescription
                      Title={subCourse.Title}
                      subarr={subCourse.subarr}
                    />
                  )}
                </div>
              </div>
            ));
          } else {
            Title = (
              <div className="d-flex">
                <div
                  className="col-3 text__title"
                  onClick={() =>
                    handleCourseClick(index, course.Title, course.subarr)
                  }
                >
                  <div className="text__left">{course.Title}</div>
                </div>
                <div className="col-9 text__description">
                  {selectedCourse === index &&
                    course.subarr &&
                    course.subarr.length > 0 && (
                      <CourseDescription
                        Title={course.Title}
                        subarr={course.subarr}
                      />
                    )}
                </div>
              </div>
            );
          }
          return <div className="test5">{Title}</div>;
        })}
      </div>
      <div className="col-9 text__description">
        <CourseDescription Title={a} subarr={b} />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <ContactUsHomePage />
      <Footer />
    </div>
  );
};
export default ListAllCourses;
