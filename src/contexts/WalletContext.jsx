import { createContext, useEffect, useState} from "react"
import CONFIG from "../data/config.ts"


export const WalletContext = createContext()

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState(JSON.parse(localStorage.getItem('wallet')) || CONFIG.initialMoney)

    useEffect(() => {
        // redondear el saldo a dos decimales antes de guardar
        const newWallet = Math.round(wallet * 100) / 100
        localStorage.setItem('wallet', JSON.stringify(newWallet))
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