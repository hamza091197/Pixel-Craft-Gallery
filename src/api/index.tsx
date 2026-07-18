import { API_KEY, BASE_URL } from '@env';

const headers = {
  Authorization: API_KEY,
};

export const fetchTrendingWallpapers = async (page: number) => {
  try {
    const res = await fetch(`${BASE_URL}/curated?page=${page}&per_page=20`, {
      headers,
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchCategoryWallpapers = async (
  query: string,
  pageParam: number,
) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search?query=${query}&page=${pageParam}&per_page=20`,
      { headers },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
