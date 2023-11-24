//updateCourse
let CourseList = [];

function fetchCourseData() {
    return fetch('/getCourseList')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the response is in JSON format
        })
        .then(data => {
            CourseList = data.CourseList;
            // Now you can use the CourseList array with the fetched data
        })
        .catch(error => {
            // Handle errors that occurred during the fetch
            console.error('Error during fetch:', error);
        });
}

// Call the function to initiate the fetch operation
fetchCourseData();

document.addEventListener('change', function (event) {
    var target = event.target;

    // Check if the changed element is the course dropdown
    if (target.id === 'course') {
        toggleVisibility("noSubtitle", "subtitleContent");
        var selectedCourse = target.value;
        var subtitleSelect = document.getElementById('subtitle');
        subtitleSelect.innerHTML = ''; // Clear existing options
        subtitleSelect.innerHTML += '<option value="" selected disabled> Select Course </option>';

        // Find the selected course in CourseList
        var selectedCourseData = CourseList.find(function (course) {
            return course.Title === selectedCourse;
        });
        // Assuming selectedCourseData is the object mentioned above

        if (selectedCourseData && selectedCourseData.SubTitle && selectedCourseData.SubTitle.length > 0) {
            selectedCourseData.SubTitle.forEach(function (subtitle) {
                addSubtitleOption(subtitle);
            });
            // The course has subtitles            
            toggleVisibility("yesSubtitle", "subtitleVisiblity", "descriptionVisiblity");
        } else {
            quillDes.setContents(selectedCourseData.Description);
            toggleVisibility("noSubtitle", "subtitleVisiblity", "descriptionVisiblity");
        }

        // Add options based on the selected course's subtitles
        // if (selectedCourseData && selectedCourseData.SubTitle) {
        //     selectedCourseData.SubTitle.forEach(function (subtitle) {
        //         addSubtitleOption(subtitle);
        //     });
        // }
    }

    if (target.id === 'deleteCourse') {
        var selectedCourse = target.value;
        var subtitleSelect = document.getElementById('deletesubtitle');
        subtitleSelect.innerHTML = ''; // Clear existing options
        // subtitleSelect.innerHTML += '<option value="" selected disabled> Select Course </option>';

        // Find the selected course in CourseList
        var selectedCourseData = CourseList.find(function (course) {
            return course.Title === selectedCourse;
        });
        // Assuming selectedCourseData is the object mentioned above

        if (selectedCourseData && selectedCourseData.SubTitle && selectedCourseData.SubTitle.length > 0) {
            toggleVisibility("yesSubtitle", "deletesubtitleVisiblity");
        } else {
            toggleVisibility("noSubtitle", "deletesubtitleVisiblity");
        }

        // Add options based on the selected course's subtitles
        if (selectedCourseData && selectedCourseData.SubTitle) {
            selectedCourseData.SubTitle.forEach(function (subtitle) {
                var deleteSubtitleSelect = document.getElementById('deletesubtitle');
                var newOption = document.createElement('option');
                newOption.value = subtitle.Title;
                newOption.text = subtitle.Title;
                deleteSubtitleSelect.appendChild(newOption);
            });
        }
    }
});

function addSubtitleOption(subtitle) {
    var subtitleSelect = document.getElementById('subtitle');
    var newOption = document.createElement('option');
    newOption.value = subtitle.Title;
    newOption.text = subtitle.Title;
    subtitleSelect.appendChild(newOption);
}

var originalSubTitleName;
function handleSubtitleSelection() {
    var selectedCourse = document.getElementById('course');
    var subtitleSelect = document.getElementById('subtitle');
    originalSubTitleName = subtitleSelect.value;
    var selectedOption = subtitleSelect.options[subtitleSelect.selectedIndex];

    //enabling course, description box
    toggleVisibility("yesSubtitle", "subtitleContent", "upAddSubtDescVisiblity");
    var updateSubTitle = document.getElementById("updatesubTitle");

    //getting descrition from courselist
    var description = CourseList
        .find(course => course.Title === selectedCourse.value)
        ?.SubTitle
        .find(subtitle => subtitle.Title === selectedOption.value)
        ?.Description;

    //setting value for course, description box
    updateSubTitle.value = selectedOption.value;
    quillUp.setContents(description);
}

function updateCourseListSubtitle() {
    var selectedCourse = document.getElementById('course');
    var updateSubTitle = document.getElementById("updatesubTitle");
    // var updateQuillEditorSub = document.getElementById("updatequill-editorSub");
    var updateQuillEditorSub = quillUp.getContents();

    CourseList = CourseList.map(course => {
        if (course.Title === selectedCourse.value) {
            course.SubTitle = course.SubTitle.map(subtitle => {
                if (subtitle.Title === originalSubTitleName) {
                    return { Title: updateSubTitle.value, Description: updateQuillEditorSub };
                }
                return subtitle;
            });
        }
        return course;
    });

    updateSubTitle.value = "";
    // updateQuillEditorSub.value = "";
    quillUp.setText("");
    toggleVisibility("noSubtitle", "subtitleContent");

}


function updateCourseListDescrition() {
    var selectedCourse = document.getElementById('course');
    var updateDescription = JSON.stringify(quillDes.getContents());

    CourseList = CourseList.map(course => {
        if (course.Title === selectedCourse.value) {
            return { ...course, Description: JSON.parse(updateDescription) };
        }
        return course;
    });

    fetchUpdateCourseList();
}

function updateAddSubTitle() {

    var selectedCourse = document.getElementById('course');
    var title = document.getElementById("upAddsubTitle");

    var description = quillUpAdd.getContents();


    // Find the target course in CourseList
    var targetCourse = CourseList.find(course => course.Title === selectedCourse.value);
    targetCourse.SubTitle.push({ Title: title.value, Description: description });

    addSubtitleOption({ Title: title.value, Description: description })

    // Clear input fields
    title.value = "";
    quillUpAdd.setText("");
    // description.value = ""

    toggleVisibility('noSubtitle', 'upAddSubtDescVisiblity')
}

function fetchUpdateCourseList() {
    const formData = new FormData();
    formData.append("CourseList", JSON.stringify(CourseList));

    fetch('/updateCourseList', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            CourseList = data.CourseList;
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });

    // location.reload();

}

function deleteCourse() {
    var deleteCourseSelect = document.getElementById('deleteCourse');

    var deleteSubtitleSelect = document.getElementById('deletesubtitle');
    var selectedValues = Array.from(deleteSubtitleSelect.selectedOptions).map(option => option.value);
    if ((selectedValues.length === 1 && selectedValues[0] === '') || selectedValues.length === 0) {
        // It will not delete course if it has subTitle
        var kpscCourseLength = CourseList.find(course => course.Title === deleteCourseSelect.value)?.SubTitle?.length;
        if (kpscCourseLength > 0) {
            return;
        }

        // Get the index of the currently selected option
        var selectedIndex = deleteCourseSelect.selectedIndex;

        if (selectedIndex !== -1) {
            // Remove the currently selected option
            deleteCourseSelect.remove(selectedIndex);
            deleteCourseList(selectedIndex - 1)
        }
        return;
    }

    selectedValues.forEach(function (value) {
        var optionToRemove = deleteSubtitleSelect.querySelector('option[value="' + value + '"]');

        if (optionToRemove) {
            // Remove the option
            optionToRemove.remove();
        }
        toggleVisibility("noSubtitle", "deletesubtitleVisiblity");
    });
    deleteCourseList(deleteCourseSelect.selectedIndex - 1, selectedValues);

}

function deleteCourseList(courseIndex, selectedValues) {
    if (selectedValues === null || selectedValues === undefined) {
        CourseList.splice(courseIndex, 1)
        deleteApi();
        return
    }
    if (courseIndex !== -1) {
        // Iterate over selectedValues
        selectedValues.forEach(subTitleTitleToRemove => {
            // Find the index of the subTitle in SubTitle array
            var subTitleIndex = CourseList[courseIndex]?.SubTitle.findIndex(subTitle => subTitle.Title === subTitleTitleToRemove);

            // Check if the subTitle exists
            if (subTitleIndex !== -1) {
                CourseList[courseIndex].SubTitle.splice(subTitleIndex, 1);
            }
        });
    }
    deleteApi();
}

function deleteApi() {
    const formData = new FormData();
    formData.append("CourseList", JSON.stringify(CourseList));
    fetch('/deleteCourseList', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            CourseList = data.CourseList;
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
}