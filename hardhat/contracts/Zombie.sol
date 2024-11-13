pragma solidity ^0.8.24;

contract Zombie {

    event getAmount(uint256 _amount);

    function transferEther (address payable _to, uint256 _amount) public payable {

        emit getAmount(_amount);

        require(address(this).balance >= _amount, "Insufficient balance");
        
        _to.transfer(_amount);
    }

    
}
