const request = require("request");
const fs = require("fs");

const getInput = () => {
  const input = process.argv.slice(2);
  const url = input[0];
  const filePath = input[1];
  request(url, (error, response, body) => {
    //console.log("error:", error);
    //console.log("statusCode:", response && response.statusCode);
    //console.log("body:", body);
    fs.writeFile(filePath, body, (err) => {
      if (!error === 200) {
        console.error(err);
      }
      console.log(
        "Downloaded and saved " + body.length + "bytes to " + filePath
      );
    });
  });
};

getInput();
