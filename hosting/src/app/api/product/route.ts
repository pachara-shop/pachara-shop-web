import { handleError, handleSuccess } from '@/utils/api/handler';
import { NextRequest } from 'next/server';

const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtVeq-JGK_hT8zrYCeEvo4qWndUMqKNrM9Q&s',
  'https://inwfile.com/s-e/1adzqz.jpg',
  'https://www.eef.or.th/wp-content/uploads/2022/12/Heart-Knit-%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%9B%E0%B8%B1%E0%B8%81%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B9%83%E0%B8%88-03.jpg',
];

const productNames = [
  'Classic Tote Bag',
  'Urban Backpack',
  'Leather Belt Bag',
  'Canvas Tote',
  'Travel Backpack',
  'Mini Belt Bag',
  'Shopping Tote',
  'Business Backpack',
  'Crossbody Belt Bag',
  'Weekend Tote',
  'Student Backpack',
  'Fashion Belt Bag',
];
const getRandomPrice = () => Math.floor(Math.random() * (2000 - 500 + 1) + 500);
const getRandomLength = () => Math.floor(Math.random() * (7 - 3 + 1) + 5);

const getProduct = async () => {
  try {
    const randomLength = getRandomLength();

    const data = Array.from({ length: randomLength }, (_, index) => ({
      id: index + 1,
      name: productNames[Math.floor(Math.random() * productNames.length)],
      price: getRandomPrice(),
      image: images[Math.floor(Math.random() * images.length)],
    }));

    return handleSuccess({ data });
  } catch (err) {
    return handleError(500, err);
  }
};

const createProduct = async (req: NextRequest) => {
  try {
    const body = await req.json();
    return handleSuccess({ data: body });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getProduct;
export const POST = createProduct;
