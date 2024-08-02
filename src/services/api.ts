import { createApi } from 'unsplash-js';
import { Customer, Photo } from '../types/types';

// const UNSPLA = process.env.UNSPLASH_ACCESS_KEY;

// const unsplash = createApi({
//   accessKey: UNSPLA!,
// });
// Directly hardcode your Unsplash Access Key
const UNSPLASH_ACCESS_KEY = '4bLrT3TQdxUcDUhOjkUowGPvETygtU9Td0s8ZInkqD8';

// Create Unsplash API instance with the hardcoded key
const unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY,
});

const CUSTOMER_API_URL = 'https://jsonplaceholder.typicode.com';

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(`${CUSTOMER_API_URL}/users`);
    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map((user: any) => ({
      id: user.id,
      name: user.name,
      title: user.company.catchPhrase,
      address: `${user.address.street}, ${user.address.city}`,
    }));
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getPhotos = async (count: number): Promise<Photo[]> => {
  console.log('Fetching photos from Unsplash...');
  try {
    const result = await unsplash.photos.getRandom({
      count,
      orientation: 'squarish',
    });

    console.log('Unsplash API response:', result);

    if (result.errors) {
      console.error('Error fetching photos:', result.errors);
      throw new Error(result.errors.join(', '));
    }

    if (!result.response) {
      console.error('No response from Unsplash API');
      throw new Error('No response from Unsplash API');
    }

    const photos = Array.isArray(result.response) ? result.response : [result.response];
    console.log('Processed photos:', photos);

    return photos as Photo[];
  } catch (error) {
    console.error('Error in getPhotos:', error);
    throw error;
  }
};
