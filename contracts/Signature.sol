pragma solidity ^0.4.10;
import "Ownable.sol";
contract SignMe is Ownable{
    struct parties {
        address first;
        address second;
    }
    mapping ( bytes32 => mapping (address => bool ) ) agrSignature;
    mapping ( bytes32 => parties  ) agrPartie;
    
    event agrCreated(bytes32 _hash);
    event agrSigned (bytes32 _hash);
    
    function init (bytes32 _hash, address _second) {
        agrSignature[_hash][msg.sender] = true;
        agrPartie[_hash].first  = msg.sender;
        agrPartie[_hash].second = _second;
        agrCreated(_hash);
    }
    
    function sign (bytes32 _hash) {
        if ( msg.sender != agrPartie[_hash].second){
            return;
        }
        agrSignature[_hash][msg.sender] = true;
        agrSigned(_hash);
    }
    
    // 0 - null, 1 - init, 2 - signed
    function agrStatus (bytes32 _hash) returns (uint8 _status) {
        if ( msg.sender != agrPartie[_hash].first){
            return 0;
        }
        if ( msg.sender != agrPartie[_hash].second){
            return 0;
        }
        if ( agrSignature[_hash][agrPartie[_hash].first] ){
            _status = 1;
            if ( agrSignature[_hash][agrPartie[_hash].second] ){
                _status = 2;
                return _status;
            }
            return _status;
        }
        return 0;
    }
    
    function agrParties (bytes32 _hash) returns (address _first, address _second) {
        if ( msg.sender != agrPartie[_hash].first){
            return (0x0, 0x0);
        }
        if ( msg.sender != agrPartie[_hash].second){
            return (0x0, 0x0);
        }
        return (agrPartie[_hash].first, agrPartie[_hash].second);
    }
    
}