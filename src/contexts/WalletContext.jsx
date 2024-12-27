import { createContext, useEffect, useState} from "react"

export const WalletContext = createContext()

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState(JSON.parse(localStorage.getItem('wallet')) || 0)

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

    const getMoney = () => {
        return wallet
    }


    return (
        <WalletContext.Provider value={{ addMoney, removeMoney, getMoney }}>
            {children}
        </WalletContext.Provider>
    )
}