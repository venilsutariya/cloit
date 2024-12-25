import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const response = await axiosInstance.post("menu/item", data);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const { id } = request.params;
  const data = await request.json();
  try {
    const response = await axiosInstance.put(`menu/item/${id}`, data);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { id } = request.params;
  try {
    await axiosInstance.delete(`menu/item/${id}`);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
