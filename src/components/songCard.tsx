import React from 'react';
import '../styles/card.scss';

interface Props {
  img: string,
  singer: string,
  songName: string
}

const SongCard: React.FC<Props> = ({
  img,
  singer,
  songName
}) => (
  <div className='card'>
    <img src={img} alt={songName} className='card-image' />
    <div className='card-info'>
      <span className='card-info-header'>{singer}</span>
      <span className='card-info-text'>{songName}</span>
    </div>
  </div>
);

export default SongCard;