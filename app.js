"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
      displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
      displayPeople(displayFamily(person, people));
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// function searchByTraits(people){
//   let trait = promptFor("What trait do you want to search by: 'gender', 'bod', 'height', 'weight', 'eyecolor', 'occupation'?", chars);

//   return foundPerson
// }

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

//displays a person's traits
function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Gender: " + person[0].gender.charAt(0).toUpperCase() + person[0].gender.slice(1) + "\n";
  personInfo += "Date of Birth: " + person[0].dob + "\n";
  personInfo += "Height: " + person[0].height + "\"" + "\n";
  personInfo += "Weight: " + person[0].weight + " lb" + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor.charAt(0).toUpperCase() + person[0].eyeColor.slice(1) + "\n";
  personInfo += "Occupation: " + person[0].occupation.charAt(0).toUpperCase() + person[0].occupation.slice(1) + "\n";

  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

//searchs for a persons imediate fmaily members
function displayFamily(searchedPerson, people) {

  let familyMembers = people.filter(function (person) {
    if (person.id === searchedPerson[0].currentSpouse || searchedPerson[0].parents.includes(person.id) || searchedPerson[0].parents.includes(person.parents[0]) ||  searchedPerson[0].parents.includes(person.parents[1])) {
      return true;
    }
    else {
      return false;
    }
  })

  //Removes the originally searched person. They are on the list becuase the of the sibling criteria
  familyMembers = familyMembers.filter(function (person) {
    if (person.id === searchedPerson[0].id) {
      return false;
    }
    else {
      return true;
    }
  })

  return familyMembers;
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
