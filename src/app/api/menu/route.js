import axiosInstance from '@/utils/axiosInstance';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const response = await axiosInstance.post('menu', data);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const response = await axiosInstance.get('menu');
    const menus = response.data.map(menu => ({
      id: menu.id,
      name: menu.name
    }));
    return NextResponse.json(menus, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}