import { Product } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function getProducts(query: string = ''): Promise<Product[]> {
  // If query is empty, fetch all. If not, search.
  const endpoint = query 
    ? `${API_BASE_URL}/products/search?q=${query}` 
    : `${API_BASE_URL}/products`;

  try {
    const response = await fetch(endpoint, {
      cache: 'no-store', // Ensures real-time data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return []; // Return empty list on error so app doesn't crash
  }
}

export async function calculateRecipe(ingredients: string[]) {
  const response = await fetch(`${API_BASE_URL}/recipes/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients }),
  });
  return response.json();
}