import { createContext, useEffect, useState} from "react"
import CONFIG from "../data/config.ts"


export const WalletContext = createContext()

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState(JSON.parse(localStorage.getItem('wallet')) || CONFIG.initialMoney)

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