import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { Account, AccountProduct, Address, addSigninListener, getAccountProducts, getAddresses, getCurrentAccount, getMasterAddress, getOrderProducts, getOrders, getProducts, getSellers, Order, OrderProduct, Product, removeSigninListener, Seller } from './Baemin'

export function useAuth() {
    const [account, setAccount] = useState(getCurrentAccount());
    
    useEffect(() => {
        addSigninListener(setAccount);
        return () => {
            removeSigninListener(setAccount);
        }
    }, [])
    return account;
}

export function useAddresses(account: Account) {
    const [list, setList] = useState<Address[]>([]);
    
    useEffect(() => {
        getAddresses(account)
        .then(res => setList(res.data || []))
        .catch(reason => alert(reason))
    }, [account]);

    return list;
}

export function useMasterAddress(account: Account) {
    const [addr, setAddr] = useState<Address>();

    useEffect(() => {
        getMasterAddress(account)
        .then(res => {
            if(res.status === 200) {
                setAddr(res.data!);
            }
        })
        .catch(reason => alert(reason))
    }, [account]);

    return addr;
}

export function useAccountProducts(account: Account) {
    const [products, setProducts] = useState<AccountProduct[]>([]);
    
    useEffect(() => {
        getAccountProducts(account)
        .then(res => setProducts(res.data || []))
        .catch(reason => alert(reason))
    }, [account]);

    return products;
}

export function useSellers(account?: Account) {
    const [sellers, setSellers] = useState<Seller[]>([]);

    useEffect(() => {
        getSellers(account)
        .then(res => setSellers(res.data || []))
        .catch(reason => alert(reason))
    }, [account]);

    return sellers;
}

export function useProducts(seller: Seller) {
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        getProducts(seller)
        .then(res => setProducts(res.data || []))
        .catch(reason => alert(reason))
    }, [seller]);

    return products;
}

export function useOrders(account: Account) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        getOrders(account)
        .then(res => setOrders(res.data || []))
        .catch(reason => alert(reason))
    }, [account])

    return orders;
}
export function useOrderProducts(order: Order) {
    const [products, setProducts] = useState<OrderProduct[]>([]);

    useEffect(() => {
        getOrderProducts(order)
        .then(res => setProducts(res.data || []))
        .catch(reason => alert(reason))
    }, [order])

    return products;
}

export interface PrivateRouteProps {
    auth: Account;
}

export function PrivateRoute({component: Component, ...rest}: any) {
    const account = useAuth();

    return (
        <Route
        {...rest}
        render={props => account ? <Component { ...props} auth={account} /> : <Redirect to="/signin"/>}
        />
    )
}