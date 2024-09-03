import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();

  // Path to the JSON file
  const filePath = path.join(process.cwd(),'public','users.json');
  
  // Read the JSON file
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const usersArray = JSON.parse(fileContent)[0]; // Assuming the structure you provided

  // Find the user in the JSON file
  const user = usersArray.find((user) => user.username === username && user.password === password);

  if (user) {
    return NextResponse.json(
      { message: 'Login successful', role: user.role },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: 'Invalid username or password' },
      { status: 401 }
    );
  }
}
