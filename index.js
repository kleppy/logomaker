const inquirer = require("inquirer");

const fs = require("fs");

const { Triangle, Square, Circle } = require("./lib/shapes");

function writeToFile(fileHandle, responses) {
  let svgStr = "";
  svgStr =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgStr += "<g>";
  svgStr+= `${responses.shape}`;

  let shapeChoice;
  if (responses.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgStr += `<polygon points="150, 18 244, 182 56, 182" fill="${responses.shapeBackgroundColor}"/>`;
  } else if (responses.shape === "Square") {
    shapeChoice = new Square();
    svgStr += `<rect x="73" y="40" width="160" height="160" fill="${responses.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgStr += `<circle cx="150" cy="115" r="80" fill="${responses.shapeBackgroundColor}"/>`;
  }

  svgStr += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${responses.textColor}">${responses.text}</text>`;
  svgStr += "</g>";
  svgStr += "</svg>";
  fs.writeFile(fileHandle, svgStr, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

function User() {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "What text would you like you logo to display? (Enter up to three characters)",
        name: "text",
      },
      {
        type: "input",
        message:
          "Choose text color (Enter color keyword OR a hexadecimal number)",
        name: "textColor",
      },
      {
        type: "list",
        message: "What shape would you like the logo to render?",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      {
        type: "input",
        message:
          "Choose shapes color (Enter color keyword OR a hexadecimal number)",
        name: "shapeBackgroundColor",
      },
    ])
    .then((responses) => {
      if (responses.text.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        User();
      } else {
        writeToFile("logo.svg", responses);
      }
    });
}

User();