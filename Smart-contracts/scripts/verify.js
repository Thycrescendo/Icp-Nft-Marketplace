
const hre = require("hardhat");
const { ethers } = require("hardhat");
const network = hre.network.name;

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
