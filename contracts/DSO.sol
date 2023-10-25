// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct Organization {
        address creator;
        string name;
        string about;        
        uint createdTimestamp;
    }
    //struct Owners

    Organization[] public organizations;
    mapping(address => Donation[]) organizationsToDonation;

    constructor() {
        owner = msg.sender;
    }
//

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
            goalAmount: _goalAmount,
            currentAmount: 0,
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
