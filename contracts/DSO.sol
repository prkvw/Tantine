// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

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

    Organization[] organizations;
    mapping(address => bool) userVerified;
    mapping(address => bytes32) userCodes;
    mapping(address => bool) loggedInUsers;  // New mapping to keep track of logged-in users
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

    // New login function
    function login() public {
        require(userVerified[msg.sender] == true, "User is not verified");
        loggedInUsers[msg.sender] = true;
    }

    // // New logout function
    // function logout() public {
    //     loggedInUsers[msg.sender] = false;
    // }

    // New function to check if a user is logged in
    function isUserLoggedIn(address user) public view returns (bool) {
        return loggedInUsers[user];
    }

    function createOrganization(
        string memory _name,
        string memory _about
    ) public {
        require(bytes(_name).length > 0, "Organization name cannot be empty");

        Organization memory newOrganization = Organization({
            creator: msg.sender,
            name: _name,
            about: _about,
            createdTimestamp: block.timestamp
        });

        organizations.push(newOrganization);
    }

    function getOrganizationsCount() public view returns (uint) {
        return organizations.length;
    }

    function getOrganization(uint index) public view returns (Organization memory) {
        require(index < organizations.length, "Invalid index");
        Organization memory org = organizations[index];
        return org;
    }

    function getAllOrganizations() public view returns (Organization[] memory) {
        return organizations;
    }
}
