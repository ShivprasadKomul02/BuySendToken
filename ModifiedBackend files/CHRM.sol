pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CHRM is ERC20, Ownable {
    constructor() ERC20("CHRM", "CHRM") {
        _mint(msg.sender, 50000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
     function decimals() public view override returns (uint8) {
        return 0;
    }
}