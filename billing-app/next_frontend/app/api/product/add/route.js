// app/api/product/add/route.js

import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'public', 'products.json');

export async function POST(request) {
  try {
    const { name, company, price, stockNumber } = await request.json();
    const fileContent = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(fileContent);

    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name,
      company,
      price,
      stockNumber,
    };

    products.push(newProduct);

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error adding product', { status: 500 });
  }
}
