export interface Items {
    color: string;
    href: string;
    id: number;
    imageAlt: string;
    imageSrc: string;
    name: string;
    price: string;
    quantity?: number;
}
export interface Item {
    cart: {
        items: Items[]
    }
}