require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Professional Library API",
    description:
      "API for managing books and authors in a professional library system",
  },
  host: process.env.SWAGGER_HOST || "cse341-project2-68q3.onrender.com",
  schemes: [process.env.SWAGGER_SCHEME || "https"],

  securityDefinitions: {
    github_auth: {
      type: "oauth2",
      authorizationUrl: "https://github.com/login/oauth/authorize",
      flow: "implicit",
      scopes: {
        read: "read users",
      },
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
