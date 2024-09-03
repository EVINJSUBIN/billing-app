import fs from 'fs';
import path from 'path';

const filePath = path.resolve('public/products.json');

export async function GET(req) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error reading products:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const newProduct = await req.json();
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);

    products.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error adding product:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
