export interface User{
    id: string,
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
    telephone: string
    photos: string,
    address : Address
}

export interface Address {
    addressLine: string,
    postalCode: string | null,
    defaultAddress: boolean | null,
}