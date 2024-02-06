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
        name: "description",
        message: "Enter a description for your app:",
        default: "A MEAN stack application for managing books and events."
      },
      {
        type: "input",
        name: "heading",
        message: "Enter a custom heading for your app:",
        default: "Book Store Using MEAN Stack"
      },
      {
        type: "input",
        name: "portNumber",
        message: "Enter a custom localhost Backend port :",
        default: 8000
      },

      {
        type: "input",
        name: "serverUrl",
        message: "Enter your serverUrl :",
        default: `http://localhost:8080/`
      },

      {
        type: "input",
        name: "URLBook",
        message: "Enter the apiUrlBook: ",
        default: answers => `http://localhost:${answers.portNumber}/api`
      },
      {
        type: "input",
        name: "URLEvent",
        message: "Enter the apiUrlBook: ",
        default: answers => `http://localhost:${answers.portNumber}/alert`
      }
    ]).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    const authorName = this.answers.authorName;
    const authorEmail = this.answers.authorEmail;
    const heading = this.answers.heading || "Book Store Using MEAN Stack";
    const portNumber = this.answers.portNumber || 8000;
    const URLBook =
      this.answers.URLBook || `http://localhost:${answers.portNumber}/api`;
    const URLEvent =
      this.answers.URLEvent || `http://localhost:${answers.portNumber}/alert`;
    const description =
      this.answers.description ||
      "A MEAN stack application for managing books and events.";
    const serverUrl = this.answers.serverUrl;

    const options = {
      heading: heading,
      portNumber: portNumber,
      serverUrl: serverUrl,
      description: description,
      URLBook: URLBook,
      URLEvent: URLEvent,
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
      this.templatePath("backend/src/model/book.js"),
      this.destinationPath("backend/src/model/book.js")
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/dbmigration/migrate-mongo-config.js"),
      this.destinationPath("backend/src/dbmigration/migrate-mongo-config.js")
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/dbmigration/migrate.js"),
      this.destinationPath("backend/src/dbmigration/migrate.js")
    );
    this.fs.copyTpl(
      this.templatePath(
        "backend/src/dbmigration/migrations/20231214104401-books_migration.js"
      ),
      this.destinationPath(
        "backend/src/dbmigration/migrations/20231214104401-books_migration.js"
      )
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/model/event.js"),
      this.destinationPath("backend/src/model/event.js")
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/routes/book.routes.js"),
      this.destinationPath("backend/src/routes/book.routes.js")
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/routes/event.routes.js"),
      this.destinationPath("backend/src/routes/event.routes.js")
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/controller/bookController.js"),
      this.destinationPath("backend/src/controller/bookController.js"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/controller/eventController.js"),
      this.destinationPath("backend/src/controller/eventController.js"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("backend/index.js"),
      this.destinationPath("backend/index.js"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("backend/src/config/keycloak-config.js"),
      this.destinationPath("backend/src/config/keycloak-config.js"),
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

    // angular

    this.fs.copyTpl(
      this.templatePath("frontend/.editorconfig"),
      this.destinationPath("frontend/.editorconfig")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/angular.json"),
      this.destinationPath("frontend/angular.json")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/package-lock.json"),
      this.destinationPath("frontend/package-lock.json")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/package.json"),
      this.destinationPath("frontend/package.json"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("frontend/README.md"),
      this.destinationPath("frontend/README.md")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/tsconfig.app.json"),
      this.destinationPath("frontend/tsconfig.app.json"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("frontend/tsconfig.json"),
      this.destinationPath("frontend/tsconfig.json"),
      options
    );
    this.fs.copyTpl(
      this.templatePath("frontend/tsconfig.spec.json"),
      this.destinationPath("frontend/tsconfig.spec.json")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/index.html"),
      this.destinationPath("frontend/src/index.html")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/favicon.ico"),
      this.destinationPath("frontend/src/favicon.ico")
    );

    this.fs.copyTpl(
      this.templatePath("frontend/src/main.ts"),
      this.destinationPath("frontend/src/main.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/styles.css"),
      this.destinationPath("frontend/src/styles.css")
    );

    this.fs.copyTpl(
      this.templatePath("frontend/src/app/app-routing.module.ts"),
      this.destinationPath("frontend/src/app/app-routing.module.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/app.component.css"),
      this.destinationPath("frontend/src/app/app.component.css")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/app.component.html"),
      this.destinationPath("frontend/src/app/app.component.html"),
      options
    );

    this.fs.copyTpl(
      this.templatePath("frontend/src/app/app.component.spec.ts"),
      this.destinationPath("frontend/src/app/app.component.spec.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/app.component.ts"),
      this.destinationPath("frontend/src/app/app.component.ts")
    );

    this.fs.copyTpl(
      this.templatePath("frontend/src/app/app.module.ts"),
      this.destinationPath("frontend/src/app/app.module.ts")
    );

    this.fs.copyTpl(
      this.templatePath("frontend/src/app/auth/auth-config.module.ts"),
      this.destinationPath("frontend/src/app/auth/auth-config.module.ts")
    );

    this.fs.copyTpl(
      this.templatePath("frontend/src/app/auth/auth-guard.module.ts"),
      this.destinationPath("frontend/src/app/auth/auth-guard.module.ts")
    );

    this.fs.copyTpl(
      this.templatePath("frontend/src/app/service/book.spec.ts"),
      this.destinationPath("frontend/src/app/service/book.spec.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/service/book.ts"),
      this.destinationPath("frontend/src/app/service/book.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/service/crud.service.spec.ts"),
      this.destinationPath("frontend/src/app/service/crud.service.spec.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/service/crud.service.ts"),
      this.destinationPath("frontend/src/app/service/crud.service.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/service/environment.local.ts"),
      this.destinationPath("frontend/src/app/service/environment.local.ts"),
      options
    );

    this.fs.copyTpl(
      this.templatePath("frontend/src/app/service/event.service.spec.ts"),
      this.destinationPath("frontend/src/app/service/event.service.spec.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/service/event.service.ts"),
      this.destinationPath("frontend/src/app/service/event.service.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/service/event.spec.ts"),
      this.destinationPath("frontend/src/app/service/event.spec.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/service/event.ts"),
      this.destinationPath("frontend/src/app/service/event.ts")
    );
    this.fs.copyTpl(
      this.templatePath("frontend/src/app/components"),
      this.destinationPath("frontend/src/app/components")
    );
  }

  install() {}
};
