"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchResults = traitPrompt(people);
      break;
    default:
      app(people); // restart app
      break;
  }

  /* Call the mainMenu function ONLY after you find the SINGLE person you are looking for. 
   Else display a list of all poeple*/
  if (searchResults.length >= 1) {
    mainMenu(searchResults, people);
  }else{
    displayPeople(searchResults);
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. 
  We need people in order to find descendants and other information that the user may want. */

  if (!person || person.length == 0) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      // TODO: get person's info
      displayPerson(person)
      break;
    case "family":
      // TODO: get person's family
      displayFamily(person, people);
      break;
    case "descendants":
      // TODO: get person's descendants
      displayPeople(findDescendants(person[0], people))
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

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
    else {
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// Display a person's traits
function displayPerson(person) {
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

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass seachByGender to validate male/fmale answers
function maleFemale() {
  let input = promptFor("What is the person's gender?", chars);

  if (input.toLowerCase() == "male" || input.toLowerCase() == "female") {
    return input.toLowerCase();
  } else {
    alert("Not a valid input")
    //the recusion of this function was causing issues. The user is currently not reprompted if invalid input is given
    //maleFemale();
  }
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}

function traitPrompt(people){
  let traitSearchResults = people;
  do {
    traitSearchResults = searchByTraits(traitSearchResults);
    var response = promptFor("Do you want to search by any other traits? 'yes' or 'no'", yesNo).toLowerCase();
  } while (response == "yes");

  return traitSearchResults;
}

function searchByTraits(people) {
  let criteriaSearch = promptFor("Which trait would you like to search by? You can choose gender, height, weight, eye color, or occupation", chars);

  let traitSearchResults;
  switch (criteriaSearch) {
    case "gender":
      traitSearchResults = searchByGender(people);
      break;
    case "height":
      traitSearchResults = searchByHeight(people);
      break;
    case "weight":
      traitSearchResults = searchByWeight(people);
      break;
    case "eye color":
      traitSearchResults = searchByEyeColor(people)
      break;
    case "occupation":
      traitSearchResults = searchByOccupation(people)
      break;
    default:
      alert("Not a valid input");
      searchByTraits(people);
      break;
  }

  return traitSearchResults;
}

function searchByGender(people) {
  let gender = maleFemale();

  let foundPeopleByGender = people.filter(function (person) {
    if (person.gender === gender.toLowerCase()) {
      return true;
    }
    else {
      return false;
    }
  });

  return foundPeopleByGender;
}

function searchByHeight(people) {
  let height = promptFor("What is the person's height (inches)?", chars);

  let foundPeople = people.filter(function (person) {
    if (person.height == height) {
      return true;
    }
    else {
      return false;
    }
  });

  return foundPeople;
}

function searchByWeight(people) {
  let weight = promptFor("What is the person's weight (pounds)?", chars);

  let foundPeople = people.filter(function (person) {
    if (person.weight == weight) {
      return true;
    }
    else {
      return false;
    }
  });

  return foundPeople;
}

function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the person's eye color?", chars);

  let foundPeople = people.filter(function (person) {
    if (person.eyeColor === eyeColor) {
      return true;
    }
    else {
      return false;
    }
  });

  return foundPeople;
}

function searchByOccupation(people) {
  let occupation = promptFor("What is the person's occupation?", chars);

  let foundPeople = people.filter(function (person) {
    if (person.occupation === occupation) {
      return true;
    }
    else {
      return false;
    }
  });

  return foundPeople;
}

// Alerts a list of family members
function displayFamily(searchedPerson, people) {
  let spouse = searchForSpouse(searchedPerson, people);
  let parents = searchForParents(searchedPerson, people);
  let siblings = searchForSiblings(searchedPerson, people);
  let familyMembers = familyFormatting(spouse, parents, siblings);

  alert(familyMembers);
}

// Searchs for a persons spouse
function searchForSpouse(searchedPerson, people) {
  return people.filter(function (person) {
    if (person.id === searchedPerson[0].currentSpouse) {
      return true;
    }
    else {
      return false;
    }
  })
}

// Searchs for a persons parents
function searchForParents(searchedPerson, people) {
  return people.filter(function (person) {
    if (searchedPerson[0].parents.includes(person.id)) {
      return true;
    }
    else {
      return false;
    }
  })
}

// Searchs for a persons siblings
function searchForSiblings(searchedPerson, people) {
  let siblings = people.filter(function (person) {
    if (searchedPerson[0].parents.includes(person.parents[0]) || searchedPerson[0].parents.includes(person.parents[1])) {
      return true;
    }
    else {
      return false;
    }
  })

  // Removes the originally searched person. They are on the list because the of the sibling criteria
  siblings = siblings.filter(function (person) {
    if (person.id === searchedPerson[0].id) {
      return false;
    }
    else {
      return true;
    }
  })
  return siblings;
}

// returns an string of family members formatted with their relation
function familyFormatting(spouse, parents, siblings) {
  let familyMembers = spouse.map(function (person) {
    return "Spouse: " + person.firstName + " " + person.lastName;
  }).join("\n") + "\n" + parents.map(function (person) {
    return "Parent: " + person.firstName + " " + person.lastName;
  }).join("\n") + "\n" + siblings.map(function (person) {
    return "Sibling: " + person.firstName + " " + person.lastName;
  }).join("\n");

  if (familyMembers === "\n\n") {
    familyMembers = "No known family."
  }
  return familyMembers;
}

function findDescendants(searchedPerson, people) {
  let descendants;
  if (searchedPerson !== undefined) {
    descendants = people.filter(function (person) {
      if (person.parents.includes(searchedPerson.id)) {
        return true;
      }
      else {
        return false;
      }
    })

    let searchedpeople = descendants;
    let newDesc = [];

    if (descendants !== undefined) {
      for (let i = 0; i < descendants.length; i++) {
        newDesc = findDescendants(searchedpeople[i], people);
        
        if (newDesc !== undefined) {
          for (let j = 0; j < newDesc.length; j++) {
            descendants.push(newDesc[j]);
          }
        }
      }
    }
  }
  return descendants;
} 
