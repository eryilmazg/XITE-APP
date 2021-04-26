import axios from 'axios';
import { SongResponse } from '../types/index';

export const getSongInfo = () => (
  axios.get<SongResponse>('https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json')
);
