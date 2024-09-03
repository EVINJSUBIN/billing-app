import fs from 'fs';
import path from 'path';

const filePath = path.resolve('public/users.json');

export async function GET(req) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data);
    return new Response(JSON.stringify(users[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error reading users:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const data = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data);

    const user = users[0].find(user => user.username === username && user.password === password);
    if (user) {
      return new Response(JSON.stringify({ message: 'Login successful', role: user.role }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.error('Error processing login:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST_ADD_USER(req) {
  try {
    const newUser = await req.json();
    const data = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data);

    users[0].push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error adding user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
