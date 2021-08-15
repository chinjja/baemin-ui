import axios from 'axios'
import jwt from 'jsonwebtoken'

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    
})

interface ResponseEntity<T> {
    status: number;
    headers: Headers;
    data?: T;
}

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
    id: number;
    account: Account,
    status: OrderStatus,
    createdAt: Date,
}

export interface AccountProductUpdateDto {
    quantity?: number
}

export interface AccountProduct {
    id: number;
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

        const response = await getAccount(info.id);

        if(!response.data) {
            return;
        }
        current ={
            account: response.data,
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
    const response = await getAccount(id);
    const account = response.data!;
    current = {
        account: account,
        token: token,
    }
    localStorage.setItem(userInfoKey, JSON.stringify({
        id: id,
        token: token,
    }));
    fireSigninListeners(current.account);
    return account;
}

export async function signout(): Promise<void> {
    instance.defaults.headers.common['Authorization'] = null;
    current  = undefined;
    localStorage.removeItem(userInfoKey);
    fireSigninListeners(undefined);
}

export async function newAccount(data: NewAccount): Promise<ResponseEntity<Account>> {
    return instance.post('/accounts', data);
}

export async function getAccount(id: number): Promise<ResponseEntity<Account>> {
    return instance.get(`/accounts/${id}`);
}

export async function newSeller(account: Account, data: SellerInfo): Promise<ResponseEntity<Seller>> {
    return instance.post(`/accounts/${account.id}/sellers`, data);
}

export async function getSeller(id: number): Promise<ResponseEntity<Seller>> {
    return instance.get(`/sellers/${id}`);
}

export async function getSellers(): Promise<ResponseEntity<Seller[]>> {
    return await instance.get('/sellers');
}

export async function newProduct(seller: Seller, data: ProductInfo): Promise<ResponseEntity<Product>> {
    return instance.post(`/sellers/${seller.id}/products`, data);
}

export async function updateProduct(product: Product, info: ProductInfo): Promise<ResponseEntity<Product>> {
    return instance.patch(`/products/${product.id}`, info);
}

export async function getProduct(id: number): Promise<ResponseEntity<Product>> {
    return instance.get(`/products/${id}`);
}

export async function getProducts(seller: Seller): Promise<ResponseEntity<Product[]>> {
    return instance.get(`/sellers/${seller.id}/products`);
}

export async function addToCart(account: Account, product: Product | number, quantity: number = 1): Promise<ResponseEntity<AccountProduct>> {
    const product_id = typeof product === "number" ? product : product.id;
    return instance.put(`/accounts/${account.id}/products/${product_id}?quantity=${quantity}`);
}

export async function buy(account: Account): Promise<ResponseEntity<Order>> {
    return instance.post(`/accounts/${account.id}/orders`);
}

export async function getOrders(account: Account, status: OrderStatus | null = null): Promise<ResponseEntity<Order[]>> {
    if(status) {
        return instance.get(`/accounts/${account.id}/orders?status=${status}`);
    }
    else {
        return instance.get(`/accounts/${account.id}/orders`);
    }
}

export async function cancel(order: Order): Promise<ResponseEntity<Order>> {
    return instance.patch(`/orders/${order.id}/cancel`);
}

export async function complete(order: Order): Promise<ResponseEntity<Order>> {
    return instance.patch(`/orders/${order.id}/complete`);
}

export async function updateAccountProduct(entity: AccountProduct, dto: AccountProductUpdateDto): Promise<ResponseEntity<AccountProduct>> {
    return instance.patch(`/account-products/${entity.id}`, dto);
}

export async function deleteAccountProduct(entity: AccountProduct): Promise<ResponseEntity<void>> {
    return instance.delete(`/account-products/${entity.id}`);
}

export async function getAccountProducts(account: Account): Promise<ResponseEntity<AccountProduct[]>> {
    return instance.get(`/accounts/${account.id}/products`);
}

export async function getOrderProducts(order: Order): Promise<ResponseEntity<OrderProduct[]>> {
    return instance.get(`/orders/${order.id}/products`);
}