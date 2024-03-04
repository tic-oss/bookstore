const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "authorName",
        message: "Enter your name:",
        store: true,
        validate: input => {
          return input.trim() !== "" ? true : "Name cannot be empty";
        }
      },
      {
        type: "input",
        name: "authorEmail",
        message: "Enter your email ID:",
        store: true,
        validate: input => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(input) ? true : "Invalid email format";
        }
      },

      {
        type: "input",
        name: "portNumber",
        message: "Enter a custom localhost Backend port :",
        default: 3000
      },
    ]).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    const portNumber = this.answers.portNumber || 3000;
    const authorName = this.answers.authorName;
    const authorEmail = this.answers.authorEmail;

    const options = {
      portNumber: portNumber,
      authorName: authorName,
      authorEmail: authorEmail
    };
    console.log(portNumber + "__");

    this.fs.copyTpl(
      this.templatePath("LICENSE"),
      this.destinationPath("LICENSE"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/database/db.js"),
      this.destinationPath("backend/src/database/db.js")
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/model/note.js"),
      this.destinationPath("backend/src/model/note.js")
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/routes/noteRoutes.js"),
      this.destinationPath("backend/src/routes/noteRoutes.js")
    );

    this.fs.copyTpl(
      this.templatePath("backend/src/controller/noteController.js"),
      this.destinationPath("backend/src/controller/noteController.js"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("backend/index.js"),
      this.destinationPath("backend/index.js"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("backend/.env"),
      this.destinationPath("backend/.env"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/config/keycloak-config.js"),
      this.destinationPath("backend/src/config/keycloak-config.js"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/config/rabbitmq-config.js"),
      this.destinationPath("backend/src/config/rabbitmq-config.js"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("backend/package-lock.json"),
      this.destinationPath("backend/package-lock.json")
    );
    this.fs.copyTpl(
      this.templatePath("backend/package.json"),
      this.destinationPath("backend/package.json"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("backend/keycloak.json"),
      this.destinationPath("backend/keycloak.json"),
      options
    );
  }

  install() {}
};
