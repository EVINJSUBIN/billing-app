import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(),'public', 'users.json');

export async function POST(req) {
  try {
    const { username, password, role } = await req.json();
    const data = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data);

    const newUser = { username, password, role };
    users[0].push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error adding user:', error);
    return new Response(JSON.stringify({ error: 'Failed to add user' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
