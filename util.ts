import os from "os";

export const validateIPAddress = (ipAddress: string) => {
  return (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipAddress
    ) || ipAddress === "localhost"
  );
};

export const printAllNetworkInterfaces = () => {
  var ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname]?.forEach(function (iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        return;
      }

      if (alias >= 1) {
        console.log(ifname + ":" + alias, iface.address);
      } else {
        console.log(ifname, iface.address);
      }

      ++alias;
    });
  });
};
