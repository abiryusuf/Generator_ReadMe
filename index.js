const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([
 {
    type: "input",
    message: "Enter your GitHub username?",
    name: "username"
  },
  {
    type: "input",
    message:"What is your porject's title?",
    name: "GoodReadMe"
  },
  {
     type: "input",
     message:"Please wirte a description of your about the project",
     name: "description"
   },
   
   {
    type: "list",
    message: "Contact Information",
    name: "contact",
    //inside another array
    choices: [
      "email",
      "phone",
      
    ]
   },
    
   {
     
    type: "input",
    message: "What command should be run to install dependencies?",
    name: "dependencies",
    default: "npm install"

   },
   {
    type: "list",
    message: "What kind of license should your project have?",
    choices: ["Webdriver","POI Apache","Intellij"],
    name: "license"

   },

   {
    type: "input",
    message: "What command should be run to run tests?",
    name: "tests",
    default: "npm run test"
   },
   {
    type: "input",
    message: "What does the user need to know about contributing to the repo?",
    name: "contributing"
}
])
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;
   
    axios.get(queryUrl).then (function(res){
       const repoNames =res.data.map(function(repo){
         return repo.name;
       });
       const repoNameStr = repoNames.join("\n");
       fs.writeFile("README.md", repoNameStr, function(err){
         if(err){
           throw err
         }
         console.log(`Saved ${repoNames.length} repos`);
       });
    });
   
  });

 
function getInfo(project, description, licenses, dependencies, tests, contributing ){
 console.log(`Project ${project}`);
 return
`
 ## Description 
   
 ${description}


## Table of Contents


* [Installation](#installation)
* [Contributing](#contributing)
* [Features](#features)
* [Team](#team)
* [Usage](#usage)
* [License](#license)
* [Tests] (#tests)
* [Questions](#questions)

## Installation 
 All the code required to get started, Run the following command
\`\`\
${dependencies}
\`\`\

## Contributing 
 ${contributing}
 Step 1
 * Option 1
    Fork This repo
 * Option  2
    Clone this repo to your local maching using:  https://github.com/abiryusuf/Generator_ReadMe

 If you want to add something, You can do it.

 ## Features (Optional)   

 ## Team (Optional)

 ## Usage 

 Have to install All dependencies such as npm, axios. 

 ## License 
 
 ${licenses}
 ## Tests 
  Runing test by using the commmand:
  \`\`\
  ${tests}
  \`\`\
  

  ## Questions 

 If you have any question about my project ping here : abiryusuf5225@gmail.com and [abiryusuf](https://github.com/abiryusuf/Update_Portfolio) 
`;
}
module.exports =getInfo;
