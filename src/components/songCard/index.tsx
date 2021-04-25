import React from 'react';

interface Props {
  image_url: string,
  artist: string,
  title: string
}

const SongCard: React.FC<Props> = ({
  image_url,
  artist,
  title
}) => (
  <div className='card'>
    <img src={image_url} alt={title} className='card-image' />
    <div className='card-info'>
      <span className='card-info-header'>{artist}</span>
      <span className='card-info-text'>{title}</span>
    </div>
  </div>
);

export default SongCard;