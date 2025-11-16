import express, { type Request, type Response } from 'express';
import cors from 'cors';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import productsJSON from './response/products.json';
import categoriesJSON from './response/categories.json';
import couponListJSON from './response/couponList.json';
import usersJSON from './response/users.json';

dotenv.config();

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const __dirname = path.resolve();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

function wait(amount = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, amount));
}

function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// 1/10 확률로 실패
const result = [...new Array<boolean>(9).fill(true), false];
function getResult(): boolean {
  return result[Math.floor(Math.random() * result.length)];
}

type Product = {
  id: number;
  title: string;
  price: number;
  category: { id: number };
  // other fields are ignored for filtering purposes
};

function getProductsByCategoryId(products: Product[], categoryId: unknown): Product[] {
  const numberCategoryId = Number(categoryId);

  return numberCategoryId > 0 && numberCategoryId < 6
    ? products.filter(item => item.category.id === numberCategoryId)
    : products;
}

function getProductsByPrice(products: Product[], price: unknown): Product[] {
  return price ? products.filter(item => item.price === Number(price)) : products;
}

function getProductsByPriceRange({
  products,
  minPrice,
  maxPrice,
}: {
  products: Product[];
  minPrice: unknown;
  maxPrice: unknown;
}): Product[] {
  const minValue = minPrice ? Number(minPrice) : Number.MIN_SAFE_INTEGER;
  const maxValue = maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER;

  return products.filter(item => item.price >= minValue && item.price <= maxValue);
}

function getProductsByTitle(products: Product[], title: unknown): Product[] {
  return title ? products.filter(item => item.title.includes(String(title))) : products;
}

function getFilteredProductsByQuery(
  products: Product[],
  query: Request['query'],
): Product[] {
  const productsFilteredByCategoryId = getProductsByCategoryId(products, query.categoryId);
  const productsFilteredByPriceRange = getProductsByPriceRange({
    products: productsFilteredByCategoryId,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
  });
  const productsFilteredByPrice = getProductsByPrice(productsFilteredByPriceRange, query.price);
  const productsFilteredByTitle = getProductsByTitle(productsFilteredByPrice, query.title);

  return productsFilteredByTitle;
}

function getSliceIndex(products: Product[], query: Request['query']): {
  startIndex: number;
  endIndex: number;
} {
  const offset = query.offset ? Number(query.offset) : 0;
  const limit = query.limit ? Number(query.limit) : products.length;
  const endIndex = offset + limit > products.length ? products.length : offset + limit;

  return {
    startIndex: offset,
    endIndex,
  };
}

// https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb 참고
const SECURITY_KEY = process.env.SECURITY_KEY;
if (!SECURITY_KEY) {
  throw new Error('SECURITY_KEY is not set');
}
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECURITY_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string): string {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift() as string, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECURITY_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

app.get('/users', (_: Request, res: Response) => {
  res.send(usersJSON);
});

app.get('/user', (req: Request, res: Response) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send('unauthorized');
  }
  const decryptedData = decrypt(authorization);
  const user = usersJSON.users.find(({ id }: { id: number }) => decryptedData === String(id));

  if (!user) {
    return res.status(404).send('not found');
  }

  res.send(user);
});

app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const result = usersJSON.users.find(
    (user: { email: string; password: string }) =>
      user.email === email && user.password === password,
  );

  if (!result) {
    return res.status(401).send({ errorCode: 401000, message: '정보가 일치하지 않습니다.' });
  }

  const cookieConfig = {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  };

  const encryptedData = encrypt(String(result.id));

  res.cookie('access_token', encryptedData, cookieConfig);
  res.send({ ...result, access_token: encryptedData });
});

app.post('/users', (req: Request, res: Response) => {
  const { email, password, name } = req.body as {
    email: string;
    password: string;
    name: string;
  };
  const { users } = usersJSON as { users: Array<{ id: number; email: string; password: string; name: string }> };

  if (!password.length) {
    return res
      .status(400)
      .send({ field: 'password', errorCode: 400001, message: '패스워드를 입력해주세요!' });
  }

  if (!name.length) {
    return res
      .status(400)
      .send({ field: 'name', errorCode: 400002, message: '이메일을 입력해주세요!' });
  }

  if (!email.length || !EMAIL_PATTERN.test(email)) {
    return res
      .status(400)
      .send({ field: 'email', errorCode: 400003, message: '잘못된 이메일 양식입니다!' });
  }

  if (users.find(user => user.email === email)) {
    return res
      .status(400)
      .send({ field: 'email', errorCode: 400004, message: '이미 존재하는 메일입니다!' });
  }

  const newUser = { id: users.length + 1, name, email, password };

  fs.writeFileSync(
    `${__dirname}/server/response/users.json`,
    JSON.stringify({
      users: [...users, newUser],
    }),
  );

  res.status(200).send(newUser);
});

// products
app.get('/products', (req: Request, res: Response) => {
  const filteredProducts = getFilteredProductsByQuery(productsJSON as Product[], req.query);
  const { startIndex, endIndex } = getSliceIndex(filteredProducts, req.query);
  const lastPage = endIndex === filteredProducts.length;

  res.send({
    products: filteredProducts.slice(startIndex, endIndex),
    lastPage,
  });
});

app.get('/products/:id', (req: Request, res: Response) => {
  const product = (productsJSON as Product[]).find(
    ({ id }) => String(id) === req.params.id,
  );
  if (product) {
    return res.send(product);
  }

  res.status(404).send('not found');
});

app.get('/categories', (_: Request, res: Response) => {
  res.send(categoriesJSON);
});

app.get('/couponList', (_: Request, res: Response) => {
  res.send(couponListJSON);
});

app.post('/purchase', async (_: Request, res: Response) => {
  const waitTime = getRandomArbitrary(100, 5000);
  await wait(waitTime);
  const success = getResult();

  if (success) {
    res.send(true);
  } else {
    res.status(500).send('internal error');
  }
});

const level = {
  INFO: 'INFO',
  ERROR: 'ERROR',
} as const;

app.post('/log', (req: Request, res: Response) => {
  const { userId, level: logLevel, message } = req.body as {
    userId?: number | string;
    level?: typeof level[keyof typeof level];
    message?: string;
  };
  if (!userId) {
    return res.status(400).send('userId가 필요합니다.');
  }

  fs.appendFileSync(
    './server/paymentResult.log',
    `LOG[${logLevel ?? 'INFO'}]: userId: ${userId} | date: ${new Date()} | message: ${message ?? ''}\n`,
    error => {
      if (error) throw error;
    },
  );

  return res.status(200).send();
});

app.listen(Number(process.env.PORT) || 3000);


