const app = {
  baseURL: 'professor.json',
  init: () => {
      document.addEventListener('DOMContentLoaded', app.load);
      console.log('HTML loaded');
  },
  load: () => {
      //the page had finished loading its HTML
      var studentData = [];
      var matchedProf = [];
      app.getData();
  },
  getData: () => {
      let page = document.body.id;
      switch (page) {
          case 'main':
              app.run();
              break;
          default:
              app.somethingElse();
      }
  },
  run: () => {
    var studInterest1 = document.getElementById('area1');
    var studInterest2 = document.getElementById('area2');
    var studInterest3 = document.getElementById('area3');
  
    var submitButton = document.getElementById("match-button");

    submitButton.addEventListener("click", function(){
      // console.log(profInterest1.value, profInterest2.value, profInterest3.value);
      if (studInterest1.value == ""){
        studInterest1.value = NaN;
      }
      if (studInterest2.value == ""){
        studInterest2.value = NaN;
      }
      if (studInterest3.value == ""){
        studInterest3.value = NaN;
      }
      studentData = [studInterest1.value, studInterest2.value, studInterest3.value];
      // console.log(studentData);
      app.getPosts();
    })
  },
  getPosts: () => {
    let url = app.baseURL;
    let req = new Request(url, {
        method: 'GET',
        mode: 'cors'
    });
    fetch(url)
        .then(response => response.json())
        .then(app.matchProfessors)
        .catch(app.err);
  },
  matchProfessors: (professorData) => {
    const matchingProfessors = [];  
    professorData.professors.forEach(professor => {
      let score = 0;

      if (professor.area_of_study_1.includes(studentData[0])) {
        score += 3;
      } else if (professor.area_of_study_1.includes(studentData[1])) {
        score += 2;
      } else if (professor.area_of_study_1.includes(studentData[2])) {
        score += 1;
      } else {
        score += 0;
      }

      if (professor.area_of_study_2.includes(studentData[0])) {
        score += 2;
      } else if (professor.area_of_study_2.includes(studentData[1])) {
        score += 2;
      } else if (professor.area_of_study_2.includes(studentData[2])) {
        score += 1;
      } else {
        score += 0;
      }        

      if (professor.area_of_study_3.includes(studentData[0])) {
        score += 1;
      } else if (professor.area_of_study_3.includes(studentData[1])) {
        score += 1;
      } else if(professor.area_of_study_3.includes(studentData[2])) {
        score += 1;
      } else {
        score += 0;
      }        

      professor.score = score;
      matchingProfessors.push(professor);
    });

    matchingProfessors.sort((a, b) => b.score - a.score);
    matchedProf = [matchingProfessors[0], matchingProfessors[1], matchingProfessors[2]]; 
    console.log(matchedProf);
    app.switch();
  },
  switch: () => {
    var delMain = document.getElementById('main');
    delMain.innerText = "";
    app.showResults();
  },
  showResults: () => {
    var bodyResult = document.getElementById('main');
    bodyResult.id = "result";

    
    // Heading1
    var heading1 = document.createElement('h1');
    heading1.textContent  = "ProF Match";
    document.body.appendChild(heading1);

    // Heading 2
    var heading2 = document.createElement('h2');
    heading2.textContent  = "Matches";
    heading2.id = "big";
    document.body.appendChild(heading2);

    // Div element - Container
    var divContainer = document.createElement('div');
    divContainer.className = "container";
    document.body.appendChild(divContainer);
    

    // Professors detail
    for (i=0; i<3; i++){
      // Continer - new div - Outer Box 2
      var divOuterBox2 = document.createElement('div');
      divOuterBox2.className = "outer-box2";
      divContainer.appendChild(divOuterBox2);

      // Continer - new div - Inner Box 2
      var divInnerBox2 = document.createElement('div');
      divInnerBox2.className = "inner-box2";
      divOuterBox2.appendChild(divInnerBox2);

      // Inner Box 2 - new div - Prof Name
      var divProfName = document.createElement('div');
      divProfName.className = "prof-name";
      divInnerBox2.appendChild(divProfName);


      // Continer - new div - Img Content
      var divImgContent = document.createElement('div');
      divImgContent.className = "img-content";
      divOuterBox2.appendChild(divImgContent);

      // Img Content - new img element 
      var imgElement = document.createElement('img');
      imgElement.src = "";
      imgElement.alt ="Professor Image";
      divImgContent.appendChild(imgElement);


      // Continer - new div - Prof Area
      var divProfArea = document.createElement('div');
      divProfArea.className = "prof-area";
      divOuterBox2.appendChild(divProfArea);

      // Prof Area - new area heading element 
      var pNewArea = document.createElement('p');
      pNewArea.className = "area-heading";
      pNewArea.textContent ="Area of study:";
      divProfArea.appendChild(pNewArea);


      // Continer - new div - Prof Email
      var divProfEmail = document.createElement('div');
      divProfEmail.className = "prof-email";
      divOuterBox2.appendChild(divProfEmail);

      // Prof Email - new email heading element 
      var pNewEmail = document.createElement('p');
      pNewEmail.className = "email-heading";
      pNewEmail.textContent ="Email:";
      divProfEmail.appendChild(pNewEmail);

      // Email Heading - new email content element 
      var pNewEmailContent = document.createElement('p');
      pNewEmailContent.className = "email-content";
      pNewEmailContent.textContent ="";
      pNewEmail.appendChild(pNewEmailContent);
      

      // Break Element
      if (i<1){
        var breakElement = document.createElement('br');
        document.body.appendChild(breakElement);
      }
    }


    // Div - Submit Button
    var divSubmitButton = document.createElement('div');
    divSubmitButton.id  = "submit";
    document.body.appendChild(divSubmitButton);

    // Button Link
    var linkSubmitButton = document.createElement('a');
    linkSubmitButton.href  = "index.html";
    divSubmitButton.appendChild(linkSubmitButton);

    // Button
    var submitButton = document.createElement('button');
    submitButton.textContent  = "HOME";
    linkSubmitButton.appendChild(submitButton);

    app.matchProf();
  },
  matchProf: () =>{
    // Display the selected professors
    matchedProf.forEach((professor, index) => {
        const professorName = professor.first_name + " " + professor.last_name;
        const professorImageUrl = professor.image;
        const professorEmail = professor.email_id;
        const professorAreasOfStudy = [
            professor.area_of_study_1,
            professor.area_of_study_2,
            professor.area_of_study_3
        ];

        // Set the professor image
        const imageElement = document.querySelectorAll("img")[index];
        imageElement.src = professorImageUrl;

        // Set the professor name
        const nameElement = document.querySelectorAll(".prof-name")[index];
        nameElement.textContent = professorName;

        // // Set the professor areas of study
        const areasOfStudyElement = document.querySelectorAll(".prof-area")[index];
        professorAreasOfStudy.forEach(areaOfStudy => {
            const liElement = document.createElement("li");
            liElement.textContent = areaOfStudy;
            areasOfStudyElement.appendChild(liElement);
        });

        // Set the professor email
        const emailElement = document.querySelectorAll(".email-content")[index];
        emailElement.textContent = professorEmail;
    })
  },
  err: (err) => {
      //display the error to the user
      let div = document.createElement('div');
      div.className = 'error msg';
      div.textContent = err.message;
      document.body.appendChild(div);
      setTimeout(() => {
          let div = document.querySelector('.error.msg');
          div.parentElement.removeChild(div);
      }, 3000);
  }
}
app.init();