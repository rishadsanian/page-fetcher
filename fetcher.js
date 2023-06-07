const request = require("request");
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getInput = () => {
  const input = process.argv.slice(2);
  const url = input[0];
  const filePath = input[1];

  request(url, (error, response, body) => {
    if (error) {
      console.log(error);
      rl.close();
      return;
    }
    //Edge Case If response status code not 200
    if (response.statusCode !== 200) {
      console.log(
        "Error: Failed to fetch the URL. Status code: " + response.statusCode
      );
      console.log(response);
      rl.close();
      return;
    }

    //Edge Case if filepath is invalid
    fs.access(filePath, (err) => {
      if (err) {
        console.error("The file path is invalid.");
        process.exit;
        rl.close();
        return;
      }
    });

    //Edge Case if file exists in the system
    if (fs.existsSync(filePath)) {
      //Overwrite prompt
      rl.question(
        "This file already exists. do you want to overwrite it? Type y for yes. ",
        (answer) => {
          if (answer !== "y") {
            //if no to overwrite close.
            console.log("Aborted.");
            rl.close();
            return;
          }
          //if yes to overwrite.
          fs.writeFile(filePath, body, (err) => {
            if (err) {
              console.error("Error: Failed to write the file.", err);
              return;
            }
            console.log(
              "Downloaded and saved " + body.length + " bytes to " + filePath
            );
            rl.close();
          });
          console.log("File overwrite.");
        }
      );
      return;
    }

    fs.writeFile(filePath, body, (err) => {
      if (err) {
        console.error("Error: Failed to write the file.", err);
        return;
      }
      console.log(
        "Downloaded and saved " + body.length + " bytes to " + filePath
      );
    });
  });
};

getInput();
