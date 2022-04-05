// const profileDataArgs = process.argv.slice(2);

// const printProfileData = profileDataArr => {
//   // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

//   // Is the same as this...
//   profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);

const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./project/src/page-template');// const generatePage = require("./src/page-template.js")

// const pageHTML = generatePage(name, github);

// fs.writeFile("./index.html", pageHTML, err => {
//     if (err) throw new Error (err);

//     console.log("Portfolio complete! Check out index.html to see the output");
// });





const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username'
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
        
    ])
    
};

const promptProject = portfolioData => {
    console.log(`
        Add a new project
    `);
    //if theres no projects array create one
    if (!portfolioData.project) {
        portfolioData.projects = [];
    }

    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name");
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself: ',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true
                } else {
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddObject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};


promptUser()
    .then(promptProject)
    .then(portfolioData => {
        // const pageHTML = generatePage();

        // fs.writeFile('./index.html', pageHTML, err => {
        //   if (err) throw new Error(err);

        //   console.log('Page created! Check out index.html in this directory to see it!');
        // });
    });

//console.log(inquirer);