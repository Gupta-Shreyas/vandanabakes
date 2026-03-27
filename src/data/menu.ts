export interface ProductVariant {
  size: string;
  price: number;
}

export interface BakeryItem {
  id: string;
  category: 'Cake' | 'Premium Cake' | 'Cup Cake' | 'Jar Cake';
  name: string;
  variants: ProductVariant[];
  image: string;
  isEggless: boolean;
}

const generateId = (name: string, category: string) => {
  return `${category.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/\s+/g, '-')}`;
};

export const menuItems: BakeryItem[] = [
  // Cakes
  ...[
    { name: 'Pineapple', prices: [300, 600] },
    { name: 'Black Forest', prices: [320, 630] },
    { name: 'Strawberry', prices: [330, 680] },
    { name: 'Mango', prices: [380, 750] },
    { name: 'Butter Scotch', prices: [330, 650] },
    { name: 'White Forest', prices: [360, 730] },
    { name: 'Chocolate Truffle', prices: [350, 700] },
    { name: 'Choco Vanilla', prices: [350, 680] },
    { name: 'Choco Chips', prices: [350, 700] },
    { name: 'Mix Fruit', prices: [360, 720] },
    { name: 'Caramel Mix Fruit', prices: [380, 780] },
    { name: 'Swiss Chocolate', prices: [360, 700] },
    { name: 'Dutch Exotic', prices: [400, 800] },
  ].map((cake): BakeryItem => {
    const id = generateId(cake.name, 'Cake');
    return {
      id,
      category: 'Cake',
      name: cake.name,
      variants: [
        { size: '1/2 Kg', price: cake.prices[0] },
        { size: '1 Kg', price: cake.prices[1] },
      ],
      image: `/cakes/${id}.png`,
      isEggless: true,
    };
  }),

  // Premium Cakes
  ...[
    { name: 'Exotic Black Forest', prices: [360, 700] },
    { name: 'Pineapple Delight', prices: [350, 700] },
    { name: 'Royal Mix Fruit', prices: [380, 750] },
    { name: 'Premium Mix Fruit', prices: [425, 800] },
    { name: 'Rasmalai Cake', prices: [500, 1000] },
    { name: 'Strawberry Premium', prices: [400, 750] },
    { name: 'Mango Premium', prices: [400, 800] },
  ].map((cake): BakeryItem => {
    const id = generateId(cake.name, 'Premium Cake');
    return {
      id,
      category: 'Premium Cake',
      name: cake.name,
      variants: [
        { size: '1/2 Kg', price: cake.prices[0] },
        { size: '1 Kg', price: cake.prices[1] },
      ],
      image: `/cakes/${id}.png`,
      isEggless: true,
    };
  }),

  // Cupcakes
  ...[
    { name: 'Chocolate', price: 79 },
    { name: 'Vanilla', price: 79 },
    { name: 'Blueberry', price: 79 },
    { name: 'Pineapple', price: 79 },
    { name: 'Red Velvet', price: 79 },
    { name: 'Oreo', price: 79 },
    { name: 'Coffee', price: 79 },
    { name: 'Choco Chip', price: 89 },
  ].map((cupcake): BakeryItem => {
    const id = generateId(cupcake.name, 'Cup Cake');
    return {
      id,
      category: 'Cup Cake',
      name: cupcake.name,
      variants: [{ size: 'Piece', price: cupcake.price }],
      image: `/cakes/${id}.png`,
      isEggless: true,
    };
  }),

  // Jar Cakes
  ...[
    'Chocolate', 'Blueberry', 'Red Velvet', 'Butterscotch', 'Strawberry',
    'Mango', 'Choco Gems', 'Chocolate Butterscotch', 'Choco Mud', 'Oreo'
  ].map((jarName): BakeryItem => {
    const id = generateId(jarName, 'Jar Cake');
    return {
      id,
      category: 'Jar Cake',
      name: jarName,
      variants: [{ size: 'Jar', price: 149 }],
      image: `/cakes/${id}.png`,
      isEggless: true,
    };
  }),
];
