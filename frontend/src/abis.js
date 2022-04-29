export const TRANSFER_CONTRACT_ADDRESS = '0x1534Be655635Fe07D0F82d7B38c1ced3cC17b178';
export const TRANSFER_TOKEN_ABI = [
  {
    "inputs": [],
    "stateMutability": "payable",
    "type": "constructor",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "internalType": "uint64",
        "name": "postId",
        "type": "uint64"
      }
    ],
    "name": "pay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getDonations",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "accountSender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "accountReceiver",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint64",
            "name": "postId",
            "type": "uint64"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          }
        ],
        "internalType": "struct Transfer.Donation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

export const DONOR_CONTRACT_ADDRESS = '0x78890D6e13BF30FA4E6BE5C83bc6d6A4fd6B7802';
export const DONOR_TOKEN_ABI= [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accountAddress",
        "type": "address"
      }
    ],
    "name": "getDonorUsername",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accountAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      }
    ],
    "name": "setDonorUsername",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const CHARITY_ORGANIZATIONS_CONTRACT_ADDRESS = '0x0393B0Cb9f3cf90F2f447b64C4857e0644F5bE34';
export const CHARITY_ORGANIZATIONS_TOKEN_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accountAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phoneNumber",
        "type": "string"
      }
    ],
    "name": "addCharityOrganization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accountAddress",
        "type": "address"
      }
    ],
    "name": "getCharityOrganizationByAddress",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phoneNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CharityOrganizations.CharityOrganization",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAllCharityOrganizations",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phoneNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CharityOrganizations.CharityOrganization[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]