// Run on computers jaha se copy karna ho
import axios from "axios";
import clipboardy from "clipboardy";
import readline from "readline";

let ans = "";
let baseIp = "localhost";
const ask = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ValidateIPaddress(ipaddress: string) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  return false;
}

ask.question("Enter the IP address of the server: ", (ip) => {
  if (ValidateIPaddress(ip)) {
    baseIp = ip;
    mainProcess();
  } else {
    console.error("You have entered an invalid IP address!");
  }
});

const makeRequest = async (text: string) => {
  axios
    .post(`http://${baseIp}:3000/`, {
      text: text,
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const readClipboard = async () => {
  try {
    var newAns = await clipboardy.read();
    if (ans !== newAns) {
      ans = newAns;
      await makeRequest(ans);
    }
  } catch (err) {
    console.error(err.message);
  }
};

const mainProcess = () => {
  setInterval(readClipboard, 1000);
  console.log("Watching copy actions");
};
