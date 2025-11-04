import axios from "axios";

const API_URL = "http://localhost:4000/library";

export async function getLibraryItems() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function getLibraryItemById(id: number) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

export async function createLibraryItem(data: {
  title: string;
  description: string;
  content: string;
  icon?: string;
}) {
  const res = await axios.post(API_URL, data);
  return res.data;
}
