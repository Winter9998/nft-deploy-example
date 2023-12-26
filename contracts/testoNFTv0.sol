// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/// @title Testo ERC721 Token
/// @dev Extends ERC721 Non-Fungible Token Standard basic implementation with pausability, access control, and burnability
contract Testo is ERC721, ERC721Pausable, AccessControl, ERC721Burnable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 private _nextTokenId;

    /// @notice Initializes the contract by setting up roles and ERC721 token details
    /// @param defaultAdmin Address to be granted the default admin role
    /// @param pauser Address to be granted the pauser role
    /// @param minter Address to be granted the minter role
    constructor(address defaultAdmin, address pauser, address minter)
        ERC721("Testo", "TST")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(MINTER_ROLE, minter);
    }

    /// @notice Pauses all token transfers
    /// @dev Caller must have the pauser role
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    /// @notice Unpauses all token transfers
    /// @dev Caller must have the pauser role
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /// @notice Mints a new token to a given address
    /// @param to Address to which the token will be minted
    /// @dev Caller must have the minter role
    function safeMint(address to) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity for the ERC721 and AccessControl contracts.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
