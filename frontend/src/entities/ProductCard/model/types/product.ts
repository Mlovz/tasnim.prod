export interface IProductItem {
    _id: string;
    price: number;
    oldPrice: number;
    content: string;
    rating: number;
    images: {
        url: string;
        public_id: string
    }[];
    status: 'new' | 'promotion';
    reviews?: any
}