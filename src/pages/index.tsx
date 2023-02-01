import React, { useState, useEffect } from 'react';
let Web3 = require('web3');


function Index() {

    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        (window as any).ethereum ?
            (window as any).ethereum.request({ method: "eth_requestAccounts" })
                .then((accounts: string[]) => {
                    setAddress(accounts[0])
                    let w3 = new Web3((window as any).ethereum)
                    setWeb3(w3)
                }).catch((err: any) => console.log(err))
            : console.log("Please install MetaMask")
    }, [])

    const handleAddress = () => {
        console.log(address)
        console.log(web3)
    }

    return (
        <div onClick={handleAddress}>
            Hello Web3 world!!!
        </div>
    )
}

export default Index