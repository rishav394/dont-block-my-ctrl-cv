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

const ValidateIPaddress = async (ipaddress: string) => {
  return new Promise((resolve) => {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress
      ) ||
      ipaddress === "localhost"
    ) {
      axios
        .get(`http://${ipaddress}:3000/ping`)
        .then((res) => {
          baseIp = ipaddress;
          return resolve(res.status === 200);
        })
        .catch(() => resolve(false));
    } else {
      console.error("You have entered an invalid IP address!");
      return resolve(false);
    }
  });
};

ask.question("Enter the IP address of the server: ", async (ip) => {
  const allgood = await ValidateIPaddress(ip);
  if (allgood) {
    baseIp = ip;
    mainProcess();
  } else {
    console.log(`Server was not found running on ${ip}`);
  }
});

const makeRequest = async (text: string) => {
  axios
    .post(`http://${baseIp}:3000/`, {
      some: text,
    })
    .then((res) => {
      console.log("Paste successfull");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const readClipboard = async () => {
  try {
    var newAns = clipboardy.readSync();
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
  console.log("Connected to server. Watching copy actions.");
};
