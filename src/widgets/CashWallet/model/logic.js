import {useEffect, useState} from 'react';
import {createWallet, getCurrencies, getWallets, removeWallet} from '../api/walletRequest';
import toast from "react-hot-toast";
import {createCell, removeCell, updateCell} from "../api/walletCellRequest";

const WalletLogic = () => {
    const [wallets, setWallets] = useState([])
    const [currencyList, setCurrencyList] = useState([])

    useEffect(() => {
        getWallets(setWallets)
        getCurrencies(setCurrencyList)
    }, [])

    function updateWallet(updatedWallet) {
        setWallets(prevWallets => prevWallets.map(wallet => wallet.id === updatedWallet.id ? updatedWallet : wallet))
    }

    const walletCreate = (name, currency) => {
        createWallet(name, currency, (e) => {
            toast.success("Wallet '" + name + "' created")
            e['currency']['name'] = currency['title']
            setWallets(prevWallets => [...prevWallets, e])
        })
    }

    const walletRemove = (id) => {
        removeWallet(id, () => {
            toast.success("Wallet deleted")
            setWallets(prevWallets => prevWallets.filter(wallet => wallet.id !== id))
        })
    }

    const walletUpdate = (updatedWallet) => {
        updateWallet(updatedWallet, () => {
            updateWallet(updatedWallet)
        })
    }

    const cellCreate = (walletId, name, icon) => {
        createCell(walletId, name, icon, (createdCell) => {
            toast.success("Wallet cell '" + name + "' created")

            const updatedWallet = wallets.find(wallet => wallet.id === walletId)
            updatedWallet['cells'] = !!updatedWallet['cells']
                ? [...updatedWallet['cells'], createdCell]
                : [createdCell]

            // update wallet
            updateWallet(updatedWallet)
        })
    }

    const cellUpdate = (walletId, updatedCell) => {
        updateCell(updatedCell, () => {
            // find parent wallet
            const updatedWallet = wallets.find(wallet => wallet.id === walletId)
            // update cells within them
            updatedWallet['cells'] = updatedWallet['cells'].map(cell => cell.id === updatedCell.id ? updatedCell : cell)
            // apply changes
            updateWallet(updatedWallet)
        })
    }

    const cellRemove = (walletId, cellId) => {
        removeCell(cellId, () => {
            // find parent wallet
            const updatedWallet = wallets.find(wallet => wallet.id === walletId)
            // update cells within them
            updatedWallet['cells'] = updatedWallet['cells'].filter(cell => cell.id !== cellId)
            // apply changes
            updateWallet(updatedWallet)
        })
    }

    const actions = {
        create: walletCreate,
        remove: walletRemove,
        update: walletUpdate,
        cellCreate: cellCreate,
        cellUpdate: cellUpdate,
        cellRemove: cellRemove,
    }

    return [
        currencyList,
        wallets,
        actions,
    ]
}

export { WalletLogic };
