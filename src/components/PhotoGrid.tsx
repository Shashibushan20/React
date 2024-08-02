import React, { useEffect, useState } from 'react';
import { Photo } from '../types/types';
import { getPhotos } from '../services/api';

const PhotoGrid: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching photos...');
        const newPhotos = await getPhotos(9);
        console.log('Received photos:', newPhotos);
        setPhotos(newPhotos);
      } catch (err) {
        setError('Failed to fetch photos');
        console.error('Error fetching photos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
    const interval = setInterval(fetchPhotos, 10000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div>Loading photos...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log('Rendering photos:', photos);

  return (
    <div className="photo-grid">
      {photos.length === 0 ? (
        <div>No photos available</div>
      ) : (
        photos.map((photo) => (
          <img 
            key={photo.id} 
            src={photo.urls.small} 
            alt={photo.alt_description || 'Unsplash photo'} 
          />
        ))
      )}
    </div>
  );
};

export default React.memo(PhotoGrid);