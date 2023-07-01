const contractAddress = "0x47b1505b583d134a3b810aa8a003a11fa98b9aa5";
const contractABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "total",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        web3.eth.requestAccounts().then((accounts) => {
            web3.eth.defaultAccount = accounts[0];
            console.log(accounts[0]);
            console.log(web3.eth.defaultAccount);
        });
    } else {
        console.error("Web3 provider not found");
    }
}

async function load() {
    await loadWeb3();
    window.contract = await loadContract();
}

async function loadContract() {
    return await new window.web3.eth.Contract(contractABI, contractAddress);
}

function transfer() {
    const to = document.getElementById("address").value;
    console.log(to);
    const amount = document.getElementById("amount").value;
    console.log(amount);
    const transferResult = document.getElementById("transferResult");
    transferResult.textContent = "Transfer in progress...";
    contract.methods
        .transfer(to, amount)
        .send({ from: web3.eth.defaultAccount })
        .then(() => {
            transferResult.textContent = `Transfer successful. Sent ${amount} ISK`;
        })
        .catch((error) => {
            console.error(error);
            transferResult.textContent = `Transfer failed. \n ${error.message}`;
        });
}

function showBalance() {
    const address = document.getElementById("inputAddress").value;
    console.log(address);
    const balanceResult = document.getElementById("balanceResult");

    contract.methods
        .balanceOf(address)
        .call()
        .then((balance) => {
            balanceResult.textContent = `Balance: ${balance} ISK`;
            console.log("Account balance:", balance);
        })
        .catch((error) => {
            balanceResult.textContent = "User not found.";
            console.error(error);
        });
}

load();

