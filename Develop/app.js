const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


const managerInfo = () =>{
     inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: 'Enter your name'
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: 'Enter your email'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter your ID'
        },
        {
            type: 'input',
            name: 'managerOfficeNumber',
            message: 'Enter your office number'
        }
    ]).then((answers)=>{
        const manager = new Manager(
            answers.managerName,
            answers.managerEmail,
            answers.managerId,
            answers.managerOfficeNumber
        );
        team.push(manager);
        buildTeam();
    });
}

const buildTeam = ()=>{
      inquirer.prompt([
        {
            type: 'list',
            name: 'empCategory',
            message: 'Do you wanna add an employee?',
            choices: [
                'Engineer',
                'Intern',
                'Stop'
            ],
        },
    ]).then((answer)=>{
        switch(answer.empCategory){
            case 'Engineer':
                engineerInfo();
                break;
            case 'Intern':
                internInfo();
                break;
            default:
                writeTeam();
        }
    });
}

const engineerInfo = ()=>{
     inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: 'Enter your name'
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: 'Enter your email'
        },
        {
            type: 'input',
            name: 'engineerId',
            message: 'Enter your ID'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Provide your github repo.'
        }
    ]).then((answers) =>{
        const engineer = new Engineer(
            answers.engineerName,
            answers.engineerEmail,
            answers.engineerId,
            answers.github
        );
        team.push(engineer);
        buildTeam();
    })
    

}

const internInfo = ()=>{
     inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: 'Enter your name'
        },
        {
            type: 'input',
            name: 'internEmail',
            message: 'Enter your email'
        },
        {
            type: 'input',
            name: 'internID',
            message: 'Enter your ID'
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter your school name.'
        }
    ]).then((answers)=>{
        const intern = new Intern(
            answers.internName,
            answers.internEmail,
            answers.internID,
            answers.school
        );
        team.push(intern);
        buildTeam();
    })
    
}


const writeTeam = () =>{
    const htmlInfo = render(team);
        writeFileAsync(outputPath, htmlInfo, (err)=>{
            if(err){
                console.log(err);
            } else{
                console.log('Done');
            }
        });
    };

managerInfo();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// function to initialize program
