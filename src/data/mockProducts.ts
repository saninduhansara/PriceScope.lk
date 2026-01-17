import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Basmati Rice',
    category: 'grains',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    unit: '5kg',
    prices: [
      { 
        supermarket: 'cargills', 
        price: 1450.00, 
        available: true, 
        rating: 4.5,
        reviews: [
          { id: 'r1', userName: 'Anjali P.', rating: 5, date: '2026-01-10', comment: 'Great quality rice! Very fluffy and aromatic. Perfect for biryani.', helpful: 12 },
          { id: 'r2', userName: 'Kamal S.', rating: 4, date: '2026-01-08', comment: 'Good quality but slightly pricey. Fresh stock always available.', helpful: 8 },
        ]
      },
      { 
        supermarket: 'keells', 
        price: 1520.00, 
        available: true, 
        rating: 4.8,
        reviews: [
          { id: 'r3', userName: 'Shamila R.', rating: 5, date: '2026-01-12', comment: 'Excellent quality! Worth the extra price. Very long grains.', helpful: 15 },
          { id: 'r4', userName: 'Dinesh M.', rating: 5, date: '2026-01-09', comment: 'Best basmati in Colombo. Premium quality, cooks perfectly every time.', helpful: 10 },
          { id: 'r5', userName: 'Nadeeka F.', rating: 4, date: '2026-01-05', comment: 'Very good rice but a bit expensive compared to other stores.', helpful: 5 },
        ]
      },
      { 
        supermarket: 'glomark', 
        price: 1380.00, 
        available: true, 
        discount: 10, 
        rating: 4.2,
        reviews: [
          { id: 'r6', userName: 'Ravi D.', rating: 4, date: '2026-01-11', comment: 'Good value for money with the discount. Quality is decent.', helpful: 9 },
          { id: 'r7', userName: 'Priya K.', rating: 4, date: '2026-01-07', comment: 'Nice rice at a great price point. Happy with the purchase.', helpful: 6 },
        ]
      },
    ],
  },
  {
    id: '2',
    name: 'Fresh Milk',
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    unit: '1L',
    prices: [
      { supermarket: 'cargills', price: 340.00, available: true, rating: 4.3 },
      { supermarket: 'keells', price: 350.00, available: true, rating: 4.7 },
      { supermarket: 'glomark', price: 335.00, available: true, rating: 4.1 },
    ],
  },
  {
    id: '3',
    name: 'Chicken Breast',
    category: 'meat',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
    unit: '1kg',
    prices: [
      { supermarket: 'cargills', price: 980.00, available: true, rating: 4.6 },
      { supermarket: 'keells', price: 1050.00, available: true, rating: 4.9 },
      { supermarket: 'glomark', price: 920.00, available: true, rating: 4.0 },
    ],
  },
  {
    id: '4',
    name: 'Brown Bread',
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    unit: '450g',
    prices: [
      { supermarket: 'cargills', price: 180.00, available: true, rating: 4.4 },
      { supermarket: 'keells', price: 195.00, available: true, rating: 4.6 },
      { supermarket: 'glomark', price: 175.00, available: true, rating: 4.2 },
    ],
  },
  {
    id: '5',
    name: 'Red Onions',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400',
    unit: '1kg',
    prices: [
      { supermarket: 'cargills', price: 420.00, available: true, rating: 4.1 },
      { supermarket: 'keells', price: 450.00, available: true, rating: 4.5 },
      { supermarket: 'glomark', price: 400.00, available: true, discount: 5, rating: 3.9 },
    ],
  },
  {
    id: '6',
    name: 'Tomatoes',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
    unit: '1kg',
    prices: [
      { supermarket: 'cargills', price: 380.00, available: true, rating: 4.3 },
      { supermarket: 'keells', price: 390.00, available: true, rating: 4.7 },
      { supermarket: 'glomark', price: 365.00, available: true, rating: 4.0 },
    ],
  },
  {
    id: '7',
    name: 'Coconut Oil',
    category: 'cooking',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    unit: '750ml',
    prices: [
      { supermarket: 'cargills', price: 680.00, available: true, rating: 4.5 },
      { supermarket: 'keells', price: 720.00, available: true, rating: 4.8 },
      { supermarket: 'glomark', price: 650.00, available: true, discount: 8, rating: 4.3 },
    ],
  },
  {
    id: '8',
    name: 'Ceylon Tea',
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    unit: '200g',
    prices: [
      { supermarket: 'cargills', price: 520.00, available: true, rating: 4.7 },
      { supermarket: 'keells', price: 550.00, available: true, rating: 4.9 },
      { supermarket: 'glomark', price: 495.00, available: true, rating: 4.4 },
    ],
  },
  {
    id: '9',
    name: 'Eggs',
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1760393339745-18360fc2b6e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2dzJTIwY2FydG9uJTIwd2hpdGV8ZW58MXx8fHwxNzY4NTc4MzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: '10 pack',
    prices: [
      { supermarket: 'cargills', price: 450.00, available: true, rating: 4.2 },
      { supermarket: 'keells', price: 480.00, available: true, rating: 4.6 },
      { supermarket: 'glomark', price: 440.00, available: true, rating: 4.0 },
    ],
  },
  {
    id: '10',
    name: 'Banana',
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    unit: '1kg',
    prices: [
      { supermarket: 'cargills', price: 280.00, available: true, rating: 4.4 },
      { supermarket: 'keells', price: 295.00, available: true, rating: 4.5 },
      { supermarket: 'glomark', price: 270.00, available: true, rating: 4.1 },
    ],
  },
  {
    id: '11',
    name: 'Apples',
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
    unit: '1kg',
    prices: [
      { supermarket: 'cargills', price: 820.00, available: true, rating: 4.6 },
      { supermarket: 'keells', price: 850.00, available: true, discount: 5, rating: 4.8 },
      { supermarket: 'glomark', price: 790.00, available: true, rating: 4.3 },
    ],
  },
  {
    id: '12',
    name: 'Yogurt',
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    unit: '400g',
    prices: [
      { supermarket: 'cargills', price: 220.00, available: true, rating: 4.3 },
      { supermarket: 'keells', price: 235.00, available: true, rating: 4.7 },
      { supermarket: 'glomark', price: 210.00, available: true, rating: 4.1 },
    ],
  },
  {
    id: '13',
    name: 'Red Dhal',
    category: 'grains',
    image: 'https://i.etsystatic.com/23140051/r/il/3c6853/3208085158/il_570xN.3208085158_fb1i.jpg',
    unit: '1kg',
    prices: [
      { supermarket: 'cargills', price: 385.00, available: true, rating: 4.5 },
      { supermarket: 'keells', price: 395.00, available: true, rating: 4.7 },
      { supermarket: 'glomark', price: 365.00, available: true, discount: 3, rating: 4.3 },
    ],
  },
  {
    id: '14',
    name: 'Potatoes',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
    unit: '1kg',
    prices: [
      { supermarket: 'cargills', price: 320.00, available: true, rating: 4.4 },
      { supermarket: 'keells', price: 340.00, available: true, rating: 4.6 },
      { supermarket: 'glomark', price: 305.00, available: true, rating: 4.2 },
    ],
  },
  {
    id: '15',
    name: 'Cheddar Cheese',
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400',
    unit: '200g',
    prices: [
      { supermarket: 'cargills', price: 780.00, available: true, rating: 4.7 },
      { supermarket: 'keells', price: 820.00, available: true, rating: 4.9 },
      { supermarket: 'glomark', price: 750.00, available: true, rating: 4.4 },
    ],
  },
  {
    id: '16',
    name: 'Orange Juice',
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    unit: '1L',
    prices: [
      { supermarket: 'cargills', price: 450.00, available: true, rating: 4.5 },
      { supermarket: 'keells', price: 480.00, available: true, rating: 4.8 },
      { supermarket: 'glomark', price: 430.00, available: true, discount: 5, rating: 4.3 },
    ],
  },
  {
    id: '17',
    name: 'Pasta',
    category: 'grains',
    image: 'https://images.unsplash.com/photo-1751182471056-ecd29a41f339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRyeSUyMHNwYWdoZXR0aXxlbnwxfHx8fDE3Njg1NzgzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: '500g',
    prices: [
      { supermarket: 'cargills', price: 320.00, available: true, rating: 4.4 },
      { supermarket: 'keells', price: 350.00, available: true, rating: 4.6 },
      { supermarket: 'glomark', price: 295.00, available: true, rating: 4.2 },
    ],
  },
  {
    id: '18',
    name: 'Carrots',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    unit: '1kg',
    prices: [
      { supermarket: 'cargills', price: 280.00, available: true, rating: 4.4 },
      { supermarket: 'keells', price: 295.00, available: true, rating: 4.5 },
      { supermarket: 'glomark', price: 265.00, available: true, rating: 4.1 },
    ],
  },
];