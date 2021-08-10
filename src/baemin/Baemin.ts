import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    
})

export interface Account {
    id: number;
    email: string;
    name: string;
}

export interface SellerInfo {
    name: string;
    description: string;
}

export interface Seller {
    id: number;
    info: SellerInfo;
    account: Account;
}

export interface NewAccount {
    email: string;
    password: string;
    name: string;
}

export interface ProductInfo {
    price: number;
    quantity: number;
    code: string;
    title: string;
    description: string;
}

export interface Product {
    id: number;
    seller: Seller;
    info: ProductInfo;
}

export interface SignIn {
    email: string;
    password: string;
}

export type OrderStatus = "IN_PROGRESS" | "CANCELLED" | "COMPLETED";

export interface Order {
    id: number,
    account: Account,
    status: OrderStatus,
    createdAt: Date,
}

export interface Cart {
    id: number,
    account: Account,
    order: Order | null,
}

export interface CartProduct {
    id: number,
    cart: Cart,
    product: Product,
    quantity: number,
}

let current_account: Account | undefined;

export function getCurrentAccount(): Account | undefined {
    return current_account;
}

export interface SigninListener {
    (account: Account | undefined): void;
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

export async function signin(data: SignIn): Promise<Account> {
    const res = await instance.post('/signin', data);
    let id = res.data.id;
    let token = res.data.token;
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    current_account = await getAccount(id);
    fireSigninListeners(current_account);
    return getAccount(id);
}

export async function signout(): Promise<void> {
    instance.defaults.headers.common['Authorization'] = null;
    current_account = undefined;
    fireSigninListeners(current_account);
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

export async function addToCart(account: Account, product: Product | number, quantity: number = 1): Promise<CartProduct> {
    if(typeof product === "number") {
        const res = await instance.put(`/accounts/${account.id}/products/${product}?quantity=${quantity}`);
        return res.data;
    }
    else {
        const res = await instance.put(`/accounts/${account.id}/products/${product.id}?quantity=${quantity}`);
        return res.data;
    }
}

export async function buy(cart: Cart): Promise<Order> {
    const res = await instance.post(`/carts/${cart.id}/orders`);
    return res.data;
}

export async function getOrders(account: Account, status: OrderStatus | null): Promise<Order[]> {
    const res = await instance.get(`/accounts/${account.id}/orders?status=${status}`);
    return res.data;
}

export async function cancel(order: Order): Promise<Order> {
    const res = await instance.patch(`/orders/${order.id}/cancel`);
    return res.data;
}

export async function complete(order: Order): Promise<Order> {
    const res = await instance.patch(`/orders/${order.id}/complete`);
    return res.data;
}

export async function getCart(account: Account): Promise<Cart> {
    const res = await instance.get(`/accounts/${account.id}/cart`);
    return res.data;
}

export async function getCartProducts(cart: Cart): Promise<CartProduct[]> {
    const res = await instance.get(`/carts/${cart.id}/products`);
    return res.data;
}