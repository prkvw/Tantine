// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
//using ECDSA for bytes32;


contract DSO {
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }
    struct Organization {
        address creator;
        string name;
        string about;        
        uint createdTimestamp;
    }
    //struct Owners

    Organization[] organizations;

  mapping(address => bool) userVerified;
    mapping(address => bytes32) userCodes;
    address owner;

    function addUser(address user, bytes32 hashedVerification) public onlyOwner {
        userVerified[user] = false;
        userCodes[user] = hashedVerification;
    }

    function verifyUser(bytes32 verificationCode) public {
        require(userVerified[msg.sender] == false, "User is already verified");
        require(sha256(abi.encodePacked(verificationCode)) == userCodes[msg.sender], "Verification code is incorrect");
        userVerified[msg.sender] = true;
    }

    function isUserVerified(address user) public view returns (bool) {
        return userVerified[user];
    }

//verify

// function _verify(bytes32 data, address account) pure returns (bool) {
//     return keccack256(data)
//         .toEthSignedMessageHash()
//         .recover(signature) == account;
// }

// Create organisation
    function createOrganization(
        string memory _name,
        string memory _about,
        uint _goalAmount
    ) public {
        require(bytes(_name).length > 0, "Organization name cannot be empty");
        require(_goalAmount > 0, "Goal amount must be greater than 0");

        Organization memory newOrganization = Organization({
            creator: msg.sender,
            name: _name,
            about: _about,
            createdTimestamp: block.timestamp
        });

        organizations.push(newOrganization);
    }

    // get organisations count
    function getOrganiationsCount() public view returns (uint) {
        return organizations.length;
    }

    // get single organisation
    function getOrganization(
        uint index
    ) public view returns (Organization memory) {
        require(index < organizations.length, "Invalid index");
        Organization memory org = organizations[index];
        return (org);
    }

    // Get all organisations
    function getAllOrganizations() public view returns (Organization[] memory) {
        return organizations;
        
    }
    uint256 public endTime;

    function startTimer(uint256 duration) public {
        endTime = block.timestamp + duration;
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= endTime) {
            return 0;
        } else {
            return endTime - block.timestamp;
        }
    }
}

