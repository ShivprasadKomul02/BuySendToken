import React from "react";
import { useMoralis,useWeb3Transfer,useWeb3ExecuteFunction, useMoralisQuery} from "react-moralis";
import ReactDOM from "react-dom";
import {useState} from "react";



const SendToken=()=> {
  const {Moralis,enableWeb3}=useMoralis();

  const [receiveraddress,setReceiver]=useState();
  const [amount,setAmount]=useState();
  
  Moralis.enableWeb3();
  
  
  async function send() {
    const requestDetails = 
    {type: "erc20",  
               amount: Moralis.Units.Token(amount, "18"), 
                              receiver: receiveraddress,
                contractAddress: "0xc1d315Aa0fBa26473C3bb1FCBCc39C5dAA5456E1",
                awaitReceipt: false
              }
     
  

    const tx = await Moralis.transfer(requestDetails);
   
  console.log(tx['hash']);
  }

  return(
  <div>
  <input value={receiveraddress} placeholder="Receiver wallet address" onChange={(event)=>setReceiver(event.currentTarget.value)}/>
  <br></br>
  <input value={amount} placeholder="Amount" onChange={(event)=>setAmount(event.currentTarget.value)}/>
   <button onClick={()=>{send()}}>Submit</button>
</div>
 );
  
};


const BuyTokenOther=()=> {

  const ABIsok=
  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_curator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_proposalDeposit",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_tokenName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tokenSymbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_socialURI",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "creatorinitalTokens",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_cap",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_decimalPlaces",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "_allowed",
          "type": "bool"
        }
      ],
      "name": "AllowedRecipientChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_allowed",
          "type": "bool"
        }
      ],
      "name": "changeAllowedRecipients",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalDeposit",
          "type": "uint256"
        }
      ],
      "name": "changeProposalDeposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "name": "executeCapProposal",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "name": "executeNFTmint",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "name": "executeProposal",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "getOrModifyBlocked",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_newcap",
          "type": "uint256"
        },
        {
          "internalType": "uint64",
          "name": "_debatingPeriod",
          "type": "uint64"
        }
      ],
      "name": "increaseCapProposal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint64",
          "name": "_debatingPeriod",
          "type": "uint64"
        }
      ],
      "name": "newNFTProposal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_heading",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint64",
          "name": "_debatingPeriod",
          "type": "uint64"
        }
      ],
      "name": "newProposal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "proposalID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenID",
          "type": "uint256"
        }
      ],
      "name": "NFTminted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "proposalID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "heading",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "ProposalAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "proposalID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "result",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quorum",
          "type": "uint256"
        }
      ],
      "name": "ProposalTallied",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "factory",
          "type": "address"
        }
      ],
      "name": "setSocTokNFTfactory",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_buyerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_sendAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_receiveAmount",
          "type": "uint256"
        }
      ],
      "name": "swap",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_buyerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_sendAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_receiveAmount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_tokenAddress",
          "type": "address"
        }
      ],
      "name": "swap",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unblockMe",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_supportsProposal",
          "type": "bool"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "proposalID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "position",
          "type": "bool"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "name": "unVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "name": "verifyPreSupport",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "actualBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_actualBalance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowedRecipients",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "blocked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "checkProposalCode",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_codeChecksOut",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "curator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastTimeMinQuorumMet",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minQuorumDivisor",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfProposals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_numberOfProposals",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proposalDeposit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "heading",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            }
          ],
          "internalType": "struct SocTokDAO.Proposaltext",
          "name": "proptext",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "votingDeadline",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "open",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "proposalPassed",
          "type": "bool"
        },
        {
          "internalType": "bytes32",
          "name": "proposalHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "proposalDeposit",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "preSupport",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "yea",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nay",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "view_socialURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "votingRegister",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const {Moralis,enableWeb3}=useMoralis();

  const [tokenSymbol,setTokenSymbol]=useState();
  const [amount,setAmount]=useState();
  
  Moralis.enableWeb3();
  
  let tokenadd="0x1FDBD0B1EC0E8632171fc27AC2Ef4c9Fa796109E" ;//address of token(dao address)
  let finalamtinwei="10000000000000000";
  let nooftokens="200";
  let buyerwalletadd="0x0A231078b1B3BeA3e796f4e95af837e969dfCc93";
  let WETHadd="0x259f60DD358C1fb751dd2274d837a6fF988d1E9d";
  let nooftokensinwei="200000000000000000000";//200 tokens
  const abiweth=[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  async function swapfunc() {
    

              //approve function in erc20 i.e wethadd
              //@contractAddress is address of erc20 WETH contract
              //@abi is abi of WETH erc20 contract
              //@params in @spender is contract address of dao token address 
              //@params in amount is final amount after calculation to pay in wei
              const optionsforapprove = 
              {      
                functionName: "approve",
                contractAddress: WETHadd,
                abi:abiweth,
                params:{
                  spender:tokenadd,
                  amount:finalamtinwei
                    }
              }
              const transactionapprove = await Moralis.executeFunction(optionsforapprove);
              const approvereceipt = await transactionapprove.wait();
              console.log(approvereceipt);    
    

              //@contractAddress is address of token user want to buy
              //@msgValue is final amount user need to pay to buy n tokens in "ether"(not in wei)
              //@params in @sendAmount is conversion of "msgValue" to wei from ether i.e msgValue is in ether that is 0.02 so _sendamount is 20000000000000000 
              //@params in @reciveamount is no of token user want to buy
              const requestDetails = 
              {      
                functionName: "swap(address,uint256,uint256,address)",
                contractAddress: tokenadd,
                //msgValue:Moralis.Units.ETH("0.02"),
                abi:ABIsok,
                params:{
                  _buyerAddress:buyerwalletadd,
                  _sendAmount:finalamtinwei,
                  _receiveAmount:nooftokens,
                  _tokenAddress:WETHadd

                    }
              }
              const transaction = await Moralis.executeFunction(requestDetails);
              const receipt = await transaction.wait();
              console.log(receipt)    
              
  }

  return(
  <div>
  <input value={tokenSymbol} placeholder="Token Symbol" onChange={(event)=>setTokenSymbol(event.currentTarget.value)}/>
  <br></br>
  <input value={amount} placeholder="Amount" type="text" onChange={(event)=>setAmount(event.currentTarget.value)}/>
   <button onClick={()=>{swapfunc()}}>Submit</button>
</div>
 );
  
};



const BuyTokenMatic=()=> {

  const ABIsok=
  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_curator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_proposalDeposit",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_tokenName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tokenSymbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_socialURI",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "creatorinitalTokens",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_cap",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_decimalPlaces",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "_allowed",
          "type": "bool"
        }
      ],
      "name": "AllowedRecipientChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_allowed",
          "type": "bool"
        }
      ],
      "name": "changeAllowedRecipients",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalDeposit",
          "type": "uint256"
        }
      ],
      "name": "changeProposalDeposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "name": "executeCapProposal",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "name": "executeNFTmint",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "name": "executeProposal",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "getOrModifyBlocked",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_newcap",
          "type": "uint256"
        },
        {
          "internalType": "uint64",
          "name": "_debatingPeriod",
          "type": "uint64"
        }
      ],
      "name": "increaseCapProposal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint64",
          "name": "_debatingPeriod",
          "type": "uint64"
        }
      ],
      "name": "newNFTProposal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_heading",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint64",
          "name": "_debatingPeriod",
          "type": "uint64"
        }
      ],
      "name": "newProposal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "proposalID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenID",
          "type": "uint256"
        }
      ],
      "name": "NFTminted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "proposalID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "heading",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "ProposalAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "proposalID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "result",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quorum",
          "type": "uint256"
        }
      ],
      "name": "ProposalTallied",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "factory",
          "type": "address"
        }
      ],
      "name": "setSocTokNFTfactory",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_buyerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_sendAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_receiveAmount",
          "type": "uint256"
        }
      ],
      "name": "swap",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_buyerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_sendAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_receiveAmount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_tokenAddress",
          "type": "address"
        }
      ],
      "name": "swap",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unblockMe",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_supportsProposal",
          "type": "bool"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "proposalID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "position",
          "type": "bool"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "name": "unVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        }
      ],
      "name": "verifyPreSupport",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "actualBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_actualBalance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowedRecipients",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "blocked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalID",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "checkProposalCode",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_codeChecksOut",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "curator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastTimeMinQuorumMet",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minQuorumDivisor",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfProposals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_numberOfProposals",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proposalDeposit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "heading",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            }
          ],
          "internalType": "struct SocTokDAO.Proposaltext",
          "name": "proptext",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "votingDeadline",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "open",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "proposalPassed",
          "type": "bool"
        },
        {
          "internalType": "bytes32",
          "name": "proposalHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "proposalDeposit",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "preSupport",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "yea",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nay",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "view_socialURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "votingRegister",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const {Moralis,enableWeb3}=useMoralis();

  const [tokenSymbol,setTokenSymbol]=useState();
  const [amount,setAmount]=useState();
  
  Moralis.enableWeb3();
  
  let tokenadd="0x1FDBD0B1EC0E8632171fc27AC2Ef4c9Fa796109E" ;//address of token(dao address)
  let finalamtinwei="20000000000000000";
  let nooftokens="200";
  let buyerwalletadd="0x0A231078b1B3BeA3e796f4e95af837e969dfCc93";
  async function swapfunc() {
    


              //@contractAddress is address of token user want to buy
              //@msgValue is final amount user need to pay to buy n tokens in "ether"(not in wei)
              //@params in @sendAmount is conversion of "msgValue" to wei from ether i.e msgValue is in ether that is 0.02 so _sendamount is 20000000000000000 
              //@params in @reciveamount is no of token user want to buy
              const requestDetails = 
              {      
                functionName: "swap(address,uint256,uint256)",
                contractAddress: tokenadd,
                msgValue:Moralis.Units.ETH("0.02"),
                abi:ABIsok,
                params:{
                  _buyerAddress:buyerwalletadd,
                  _sendAmount:finalamtinwei,
                  _receiveAmount:nooftokens,

                    }
              }
              const transaction = await Moralis.executeFunction(requestDetails);
              const receipt = await transaction.wait();
              console.log(receipt)    
              
  }

  return(
  <div>
  <input value={tokenSymbol} placeholder="Token Symbol" onChange={(event)=>setTokenSymbol(event.currentTarget.value)}/>
  <br></br>
  <input value={amount} placeholder="Amount" type="text" onChange={(event)=>setAmount(event.currentTarget.value)}/>
   <button onClick={()=>{swapfunc()}}>Submit</button>
</div>
 );
  
};

const TransferToken= () => {
  const {Moralis,isAuthenticated,authenticate}=useMoralis();
  const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis()
  Moralis.enableWeb3();
  const {fetch, error, isFetching} = useWeb3Transfer(
    {type: "erc20",  
               amount: Moralis.Units.Token(5, "18"), 
                              receiver: "0xeC5ad8bfDD71618BA92785BC05DBC34276575356",
                contractAddress: "0xc1d315Aa0fBa26473C3bb1FCBCc39C5dAA5456E1",
                awaitReceipt: false
              }
    )
  return (<div>
    {error }
    <button onClick={() => fetch()} disabled={isFetching}>Transfer</button>
  </div>)
};



function App() {
  const { authenticate, isAuthenticated, user,logout } = useMoralis();

  if (isAuthenticated) {
    return (
      <div>
         <h1>Welcome {user.get("username")}
         </h1>
         {/*
         <TransferToken/> */}
         <BuyTokenMatic/>
         {/* <BuyToken/>
         {/* <BuyTokenOther/> */}

        </div>
    );
  }
  
  return (
    <div>
      {/* <button onClick={() => authenticate()}>Authenticate</button>
       */}
                {/* <TransferToken/> */}
                <BuyTokenMatic/>
               
                    {/* <BuyTokenOther/> */}
      </div> 
    
  );
}
export default App;
