//SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract Transfers {

    constructor() payable {}

    struct Donation {
        address accountSender;
        address accountReceiver;
        uint256 amount;
        uint64 postId;
        string message;
    }

    Donation[] private donations;
    event DonationEvent();

    function pay(address payable _to, string calldata message, uint64 postId) public
                                                                              payable {

        (bool sent, ) = _to.call{ value: msg.value }("");
        require(sent, "Failed to send Ether");

        donations.push(Donation({
            accountSender: msg.sender,
            accountReceiver: _to,
            amount: msg.value,
            postId: postId,
            message: message
        }));

        emit DonationEvent();
    }

    function getDonations() external 
                            view 
                            returns (Donation[] memory) {
        return donations;
    }
}