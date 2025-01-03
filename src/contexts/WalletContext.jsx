import { createContext, useEffect, useState} from "react"
import { config } from "../data/config.json"

export const WalletContext = createContext()

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState(JSON.parse(localStorage.getItem('wallet')) || config.initialEnergy)

    useEffect(() => {
        localStorage.setItem('wallet', JSON.stringify(wallet))
    }, [wallet])

    // Funciones para interactuar con el wallet
    const addMoney = (money) => {
        setWallet(wallet + money)
        return true
    }

    const removeMoney = (money) => {
        if (wallet >= money) {
            setWallet(wallet - money)
            return true
        } else {
            return false
        }
    }

    return (
        <WalletContext.Provider value={{ addMoney, removeMoney, wallet }}>
            {children}
        </WalletContext.Provider>
    )
}