// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AdminDataSecure is Ownable {
    
    struct Patient {
        bytes32 id;
        bytes32 nameHash;
        bytes32 diagnosisHash;
        bytes32 treatmentHash;
        uint256 timestamp;
        address doctorAddress;
    }

    mapping(bytes32 => Patient) public patients;
    mapping(address => bool) public admins;
    mapping(bytes32 => mapping(address => bool)) public accessPermissions;

    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    event PatientRecordCreated(bytes32 indexed patientId);
    event PatientRecordUpdated(bytes32 indexed patientId);
    event AccessGranted(bytes32 indexed patientId, address indexed provider);
    event AccessRevoked(bytes32 indexed patientId, address indexed provider);

    modifier onlyAdmin() {
        require(msg.sender == owner() || admins[msg.sender], "Unauthorized access");
        _;
    }

    modifier hasAccess(bytes32 patientId) {
        require(
            accessPermissions[patientId][msg.sender] ||
            patients[patientId].doctorAddress == msg.sender ||
            msg.sender == owner(),
            "Access denied"
        );
        _;
    }

    // Admin management functions
    function addAdmin(address _admin) external onlyOwner {
        require(!admins[_admin], "Already admin");
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) external onlyOwner {
        require(admins[_admin], "Not an admin");
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    // Patient record management
    function createPatientRecord(
        bytes32 patientId,
        bytes32 nameHash,
        bytes32 diagnosisHash,
        bytes32 treatmentHash,
        address doctorAddress
    ) external onlyAdmin {
        require(patients[patientId].timestamp == 0, "Record exists");
        
        patients[patientId] = Patient({
            id: patientId,
            nameHash: nameHash,
            diagnosisHash: diagnosisHash,
            treatmentHash: treatmentHash,
            timestamp: block.timestamp,
            doctorAddress: doctorAddress
        });
        
        emit PatientRecordCreated(patientId);
    }

    function updatePatientRecord(
        bytes32 patientId,
        bytes32 diagnosisHash,
        bytes32 treatmentHash
    ) external hasAccess(patientId) {
        Patient storage patient = patients[patientId];
        patient.diagnosisHash = diagnosisHash;
        patient.treatmentHash = treatmentHash;
        patient.timestamp = block.timestamp;
        
        emit PatientRecordUpdated(patientId);
    }

    // Access control functions
    function grantAccess(bytes32 patientId, address _provider) external {
        require(msg.sender == owner() || admins[msg.sender], "Unauthorized");
        accessPermissions[patientId][_provider] = true;
        emit AccessGranted(patientId, _provider);
    }

    function revokeAccess(bytes32 patientId, address _provider) external {
        require(msg.sender == owner() || admins[msg.sender], "Unauthorized");
        accessPermissions[patientId][_provider] = false;
        emit AccessRevoked(patientId, _provider);
    }

    // Data retrieval function
    function getPatientData(bytes32 patientId) external view hasAccess(patientId) returns (
        bytes32,
        bytes32,
        bytes32,
        uint256,
        address
    ) {
        Patient memory patient = patients[patientId];
        return (
            patient.nameHash,
            patient.diagnosisHash,
            patient.treatmentHash,
            patient.timestamp,
            patient.doctorAddress
        );
    }
}