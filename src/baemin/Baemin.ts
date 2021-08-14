import axios from 'axios'
import jwt, { JwtPayload } from 'jsonwebtoken'

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    
})

export interface Account {
    id: number;
    email: string;
    name: string;
}

export interface SellerInfo {
    name?: string;
    description?: string;
}

export interface Seller {
    id: number;
    info: SellerInfo;
    account: Account;
}

export interface NewAccount {
    email?: string;
    password?: string;
    name?: string;
}

export interface ProductInfo {
    price?: number;
    quantity?: number;
    code?: string;
    title?: string;
    description?: string;
}

export interface Product {
    id: number;
    seller: Seller;
    info: ProductInfo;
}

export interface SignIn {
    email?: string;
    password?: string;
}

export type OrderStatus = "IN_PROGRESS" | "CANCELLED" | "COMPLETED";

export interface Order {
    id: number,
    account: Account,
    status: OrderStatus,
    createdAt: Date,
}

export interface AccountProduct {
    id: number,
    account: Account,
    product: Product,
    quantity: number,
}

export interface OrderProduct {
    id: number,
    order: Order,
    product: Product,
    quantity: number,
}

interface Current {
    account: Account;
    token: string;
}
let current: Current | undefined;

export function getCurrentAccount(): Account | undefined {
    return current?.account;
}

export interface SigninListener {
    (account?: Account): void;
}

const signinList: SigninListener[] = []
export function addSigninListener(listener: SigninListener) {
    signinList.push(listener);
}

export function removeSigninListener(listener: SigninListener) {
    const idx = signinList.indexOf(listener);
    if(idx > -1) {
        signinList.splice(idx, 1);
    }
}

function fireSigninListeners(account: Account | undefined) {
    signinList.forEach(value => value(account));
}

const userInfoKey = "userInfo";

interface UserInfo {
    id: number,
    token: string,
}

export async function initSign() {
    const userInfo = localStorage.getItem(userInfoKey);
    if(userInfo) {
        const info = JSON.parse(userInfo) as UserInfo;
        const token = info.token;
        
        if(isExpired(token)) {
            return;
        }

        current ={
            account: await getAccount(info.id),
            token: info.token,
        }
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + info.token;
        fireSigninListeners(current.account);
    }
}

function isExpired(token: string): Boolean {
    const payload = jwt.decode(token, {json: true});
    if(payload && payload.exp) {
        return payload.exp * 1000 <= Date.now();
    }
    return false;
}

export async function signin(data: SignIn): Promise<Account> {
    const res = await instance.post('/signin', data);
    let id = res.data.id;
    let token = res.data.token;
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    current = {
        account: await getAccount(id),
        token: token,
    }
    localStorage.setItem(userInfoKey, JSON.stringify({
        id: id,
        token: token,
    }));
    fireSigninListeners(current.account);
    return getAccount(id);
}

export async function signout(): Promise<void> {
    instance.defaults.headers.common['Authorization'] = null;
    current  = undefined;
    localStorage.removeItem(userInfoKey);
    fireSigninListeners(undefined);
}

export async function newAccount(data: NewAccount): Promise<Account> {
    const res = await instance.post('/accounts', data);
    return res.data;
}

export async function getAccount(id: number): Promise<Account> {
    const res = await instance.get(`/accounts/${id}`);
    return res.data;
}

export async function newSeller(account: Account, data: SellerInfo): Promise<Seller> {
    const res = await instance.post(`/accounts/${account.id}/sellers`, data);
    return res.data;
}

export async function getSeller(id: number): Promise<Seller> {
    const res = await instance.get(`/sellers/${id}`);
    return res.data;
}

export async function getSellers(): Promise<Seller[]> {
    const res = await instance.get('/sellers');
    return res.data;
}

export async function newProduct(seller: Seller, data: ProductInfo): Promise<Product> {
    const res = await instance.post(`/sellers/${seller.id}/products`, data);
    return res.data;
}

export async function getProduct(id: number): Promise<Product> {
    const res = await instance.get(`/products/${id}`);
    return res.data;
}

export async function getProducts(seller: Seller): Promise<Product[]> {
    const res = await instance.get(`/sellers/${seller.id}/products`);
    return res.data;
}

export async function addToCart(account: Account, product: Product | number, quantity: number = 1): Promise<AccountProduct> {
    const product_id = typeof product === "number" ? product : product.id;
    const res = await instance.put(`/accounts/${account.id}/products/${product_id}?quantity=${quantity}`);
    return res.data;
}

export async function buy(account: Account): Promise<Order> {
    const res = await instance.post(`/accounts/${account.id}/orders`);
    return res.data;
}

export async function getOrders(account: Account, status: OrderStatus | null = null): Promise<Order[]> {
    if(status) {
        const res = await instance.get(`/accounts/${account.id}/orders?status=${status}`);
        return res.data;
    }
    else {
        const res = await instance.get(`/accounts/${account.id}/orders`);
        return res.data;
    }
}

export async function cancel(order: Order): Promise<Order> {
    const res = await instance.patch(`/orders/${order.id}/cancel`);
    return res.data;
}

export async function complete(order: Order): Promise<Order> {
    const res = await instance.patch(`/orders/${order.id}/complete`);
    return res.data;
}

export async function getAccountProducts(account: Account): Promise<AccountProduct[]> {
    const res = await instance.get(`/accounts/${account.id}/products`);
    return res.data;
}

export async function getOrderProducts(order: Order): Promise<OrderProduct[]> {
    const res = await instance.get(`/orders/${order.id}/products`);
    return res.data;
}