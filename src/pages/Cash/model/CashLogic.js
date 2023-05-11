import {useEffect, useState} from 'react';
import {createWallet, getCurrencies, getWallets, removeWallet, updateWallet} from '../api/walletRequest';
import toast from "react-hot-toast";
import {createCell, removeCell, updateCell} from "../api/walletCellRequest";
import {createOperation, getOperations, removeOperation, updateOperation} from "../api/operationRequest";

const CashLogic = () => {
    const [wallets, setWallets] = useState([])
    const [currencyList, setCurrencyList] = useState([])
    const [operations, setOperations] = useState([])

    useEffect(() => {
        getWallets(setWallets)
        getCurrencies(setCurrencyList)
        getOperations(setOperations)
    }, [])

    function updateWalletState(updatedWallet) {
        setWallets(prevWallets => prevWallets.map(wallet => wallet.id === updatedWallet.id ? updatedWallet : wallet))
        getOperations(setOperations)
    }

    function updateOperationState(updatedOperation) {
        setOperations(prevOperations => prevOperations.map(operation => operation.id === updatedOperation.id ? updatedOperation : operation))
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
            updateWalletState(updatedWallet)
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
            updateWalletState(updatedWallet)
        })
    }

    const cellUpdate = (walletId, updatedCell) => {
        updateCell(updatedCell, () => {
            // find parent wallet
            const updatedWallet = wallets.find(wallet => wallet.id === walletId)
            // update cells within them
            updatedWallet['cells'] = updatedWallet['cells'].map(cell => cell.id === updatedCell.id ? updatedCell : cell)
            // apply changes
            updateWalletState(updatedWallet)
        })
    }

    const cellRemove = (walletId, cellId) => {
        removeCell(cellId, () => {
            // find parent wallet
            const updatedWallet = wallets.find(wallet => wallet.id === walletId)
            // update cells within them
            updatedWallet['cells'] = updatedWallet['cells'].filter(cell => cell.id !== cellId)
            // apply changes
            updateWalletState(updatedWallet)
        })
    }

    const operationCreate = (product, sum, from, to) => {
        createOperation(from, to, product, sum, null, newItem => {
            toast.success("created")
            setOperations(prevOperations => [...prevOperations, newItem])
        })
    }

    const operationUpdate = (operation) => {
        updateOperation(operation, (updatedOperation) => {
            // apply changes
            updateOperationState(updatedOperation)
        })
    }
    const operationRemove = (operationId) => {
        removeOperation(operationId, () => {
            setOperations(prevOperations => prevOperations.filter(operation => operation.id !== operationId))
        })
    }
/*
    const operationGet = () => {

    }*/

    const Wallet = {
        list: wallets,
        create: walletCreate,
        remove: walletRemove,
        update: walletUpdate,
    }
    const Cell = {
        create: cellCreate,
        update: cellUpdate,
        remove: cellRemove,
    }
    const Operation = {
        list: operations,
        create: operationCreate,
        update: operationUpdate,
        remove: operationRemove,
        // getByDate: () => {},
    }

    return [
        currencyList,
        Wallet,
        Cell,
        Operation,
    ]
}

export { CashLogic };
