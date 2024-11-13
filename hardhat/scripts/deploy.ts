import { ethers } from 'hardhat';

async function main() {
  try {
      const Zombie = await ethers.getContractFactory("Zombie");

      // Deploy the contract
      const helloWorld = await Zombie.deploy();

    console.log("Contract deployed to:",  await helloWorld.getAddress());
      
      
      
  } catch (error) {
      console.error("Error during contract deployment:", error);
  }
}

// We recommend using process.exit(0) to exit without an error
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error("Error in main function:", error);
      process.exit(1); // Exit with an error code
  });
