import React from 'react';
import ResponsiveLayout from '../responsiveLayout/index';
import SongCard from '../songCard/index';

interface Props {
  data: Array<{
    image_url: string,
    artist: string,
    title: string,
    id: number
  }>
}

const SongCards: React.FC<Props> = ({ data }) => (
  <ResponsiveLayout>
    {data.map(({
      image_url,
      artist,
      title,
      id
    }) => (
      <SongCard
        image_url={image_url}
        artist={artist}
        title={title}
        key={id}
      />
    ))}
  </ResponsiveLayout>
);

export default SongCards;
