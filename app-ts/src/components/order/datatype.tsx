interface Shipping {
    email: string;
    number: number;
}

export interface Product {
    id: number;
    name: string;
    href: string;
    price: string;
    quantity: number,
    deliveryAddress: string;
    shippingUpdates: Shipping;
    status: number;
    deliveryStatus: string;
    imageSrc: string;
    description: string;
}