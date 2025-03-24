require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
let secrets = require("./secrets");
polia: {
      url: secrets.url,
      accounts: [secrets.key],
      apiKey: secrets.apiKey,
    },
    bsc: {
      url: secrets.bscUrl,
      accounts: [secrets.bscKey],
    },
    fuji: {
      url: secrets.fujiUrl,
      accounts: [secrets.key],
    },
    amoy: {
      url: secrets.amoyUrl,
      accounts: [secrets.key],
    },
    arbitrum: {
      url: secrets.arUrl,
      accounts: [secrets.arKey],
    },
  },
  etherscan: {
    apiKey: secrets.apiKey,
  },
};
