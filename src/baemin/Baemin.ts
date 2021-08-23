import axios from 'axios'
import jwt from 'jsonwebtoken'

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    
})

instance.interceptors.response.use(res => {
    handleDates(res.data);
    return res;
})

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?.*$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: any) {
    if (body === null || body === undefined || typeof body !== "object")
      return;
  
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (isIsoDateString(value)) body[key] = new Date(value);
      else if (typeof value === "object") handleDates(value);
    }
  }

export interface ResponseEntity<T> {
    status: number;
    headers: any;
    data: T;
}

export interface Account {
    id: number;
    email: string;
    name: string;
}

export interface Address extends AddressInfo {
    id:number;
    account: Account;
}

export interface AddressInfo {
    name?: string;
    master?: boolean;
    city?: string;
    street?: string;
}

export interface SellerInfo {
    name?: string;
    description?: string;
}

export interface Seller extends SellerInfo {
    id: number;
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

export interface Product extends ProductInfo {
    id: number;
    seller: Seller;
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

interface UserInfo {
    account: Account;
    token: string;
}
let current: UserInfo | undefined;

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

initSign();

function initSign() {
    const userInfo = localStorage.getItem(userInfoKey);
    if(userInfo) {
        const info = JSON.parse(userInfo) as UserInfo;
        const token = info.token;
        
        if(isExpired(token)) {
            return;
        }

        current = info;
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + info.token;
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
    localStorage.setItem(userInfoKey, JSON.stringify(current));
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

export async function newAddress(account: Account, data: AddressInfo): Promise<ResponseEntity<Address>> {
    return instance.post(`/accounts/${account.id}/addresses`, data);
}

export async function updateAddress(address: ResponseEntity<Address>, data: AddressInfo): Promise<ResponseEntity<Address>> {
    return instance.patch(`/addresses/${address.data!.id}`, data, ifMatch(address));
}

export async function getMasterAddress(account: Account): Promise<ResponseEntity<Address>> {
    return instance.get(`/accounts/${account.id}/addresses/master`);
}

export async function getAddress(id: number): Promise<ResponseEntity<Address>> {
    return instance.get(`/addresses/${id}`);
}

export async function getAddresses(account: Account): Promise<ResponseEntity<Address[]>> {
    return instance.get(`/accounts/${account.id}/addresses`);
}

export async function newSeller(account: Account, data: SellerInfo): Promise<ResponseEntity<Seller>> {
    return instance.post(`/accounts/${account.id}/sellers`, data);
}

export async function updateSeller(seller: ResponseEntity<Seller>, data: SellerInfo): Promise<ResponseEntity<Seller>> {
    return instance.patch(`/sellers/${seller.data.id}`, data, ifMatch(seller));
}

export async function getSeller(id: number): Promise<ResponseEntity<Seller>> {
    return instance.get(`/sellers/${id}`);
}

export async function getSellers(account?: Account): Promise<ResponseEntity<Seller[]>> {
    if(account) {
        return instance.get(`/accounts/${account.id}/sellers`);
    }
    return instance.get('/sellers');
}

export async function newProduct(seller: Seller, data: ProductInfo): Promise<ResponseEntity<Product>> {
    return instance.post(`/sellers/${seller.id}/products`, data);
}

export async function updateProduct(product: ResponseEntity<Product>, info: ProductInfo): Promise<ResponseEntity<Product>> {
    return instance.patch(`/products/${product.data.id}`, info, ifMatch(product));
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

export async function getOrder(id: number): Promise<ResponseEntity<Order>> {
    return instance.get(`/orders/${id}`);
}

export async function getOrders(account: Account, status: OrderStatus | null = null): Promise<ResponseEntity<Order[]>> {
    if(status) {
        return instance.get(`/accounts/${account.id}/orders?status=${status}`);
    }
    else {
        return instance.get(`/accounts/${account.id}/orders`);
    }
}

export async function cancel(order: ResponseEntity<Order>): Promise<ResponseEntity<Order>> {
    return instance.patch(`/orders/${order.data.id}/cancel`, ifMatch(order));
}

export async function complete(order: ResponseEntity<Order>): Promise<ResponseEntity<Order>> {
    return instance.patch(`/orders/${order.data.id}/complete`, ifMatch(order));
}

export async function updateAccountProduct(entity: ResponseEntity<AccountProduct>, dto: AccountProductUpdateDto): Promise<ResponseEntity<AccountProduct>> {
    return instance.patch(`/account-products/${entity.data.id}`, dto, ifMatch(entity));
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

export function entity<T>(data: T, status = 0, headers?: any): ResponseEntity<T> {
    return {
        status: status,
        data: data,
        headers: headers,
    }
}

function ifMatch(entity: ResponseEntity<any>) {
    return {
        headers: {
            'If-Match': entity.headers.etag,
        }
    }
}