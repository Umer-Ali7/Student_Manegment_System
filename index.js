#! /usr/bin/env node
import inquirer from 'inquirer';
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseid = 10000;
let studentid = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: 'list',
        name: 'ans',
        message: 'Please select an option:\n',
        choices: ['Enroll a student', 'Show student status']
    });
    if (action.ans === 'Enroll a student') {
        let studentName = await inquirer.prompt({
            type: 'input',
            name: 'ans',
            message: 'Enter student name:'
        });
        let trimmeStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimmeStudentName) === false) {
            if (trimmeStudentName !== "") {
                baseid++;
                studentid = "STID" + baseid;
                console.log("\n\tYour account has been created");
                console.log(`Welcome, ${trimmeStudentName}`);
                let course = await inquirer.prompt({
                    type: 'list',
                    name: 'ans',
                    message: 'Please select a course :',
                    choices: ['IT', 'Englih', 'GenAI']
                });
                let coursefees = 0;
                switch (course.ans) {
                    case 'IT':
                        coursefees = 5000;
                        break;
                    case 'Englih':
                        coursefees = 4000;
                        break;
                    case 'GenAI':
                        coursefees = 6000;
                        break;
                }
                let courseConfrim = await inquirer.prompt({
                    type: 'confirm',
                    name: 'ans',
                    message: "Do you want to enroll in this course"
                });
                if (courseConfrim.ans === true) {
                    let Student = new student(studentid, trimmeStudentName, [course.ans], coursefees);
                    students.push(Student);
                    console.log("You have enrolled in this course");
                }
            }
            else {
                console.log("invalid Name");
            }
        }
        else {
            console.log("this name is already exists");
        }
    }
    else if (action.ans === 'Show student status') {
        if (students.length !== 0) {
            let studentNamesCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: 'list',
                name: 'ans',
                message: 'Please select Name:',
                choices: studentNamesCheck
            });
            let foundStudent = students.find(student => student.name === selectedStudent.ans);
            console.log("Student information");
            console.log(foundStudent);
            console.log("\n\n");
        }
        else {
            console.log("Record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: 'confirm',
        name: 'ans',
        message: "Do you want to continue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
