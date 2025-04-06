import { CirclePlay, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { tmdbAPI } from '../../config';
import { IMovie } from '../../interfaces/movie.interface';
import Button from '../button/Button';
import noPicture from '@/assets/no-pictures.png';

const MovieCard = ({ item }: { item: IMovie }) => {
  const { title, poster_path, vote_average, release_date, id } = item;
  const navigate = useNavigate();
  return (
    <div className='movie-card flex flex-col rounded-lg bg-slate-800 p-3 text-white h-full select-none'>
      <img
        src={poster_path ? `${tmdbAPI.imageOriginal(poster_path)}` : noPicture}
        alt='movie-img'
        loading='lazy'
        className='w-full h-[250px] object-cover rounded-lg mb-5 hover:scale-105 transition-all duration-300'
      />
      <div className='flex flex-col flex-1'>
        <h3 className='text-xl font-bold mb-3'>{title}</h3>
        <div className='flex items-center justify-between text-sm opacity-50 mb-10'>
          <span>{new Date(release_date).getFullYear()}</span>
          <span className='flex items-center'>
            {vote_average}
            <Star fill='#edae29' strokeWidth={0} className='w-5 h-5 inline-block ml-1' />
          </span>
        </div>
        <Button
          icon={<CirclePlay className='w-5 h-5 inline-block ml-2' />}
          onClick={() => navigate(`/movies/${id}`)}
          bgColor='primary'
        >
          Watch now
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;

export const MovieCardSkeleton = () => {
  return (
    <div className='bg-slate-800 p-3 rounded-lg flex flex-col h-full animate-pulse'>
      <div className='w-full h-[250px] bg-gray-300 rounded-lg mb-5'></div>
      <div className='flex flex-col flex-1'>
        <div className='h-6 bg-gray-300 rounded mb-3'></div>
        <div className='flex items-center justify-between text-sm opacity-50 mb-10'>
          <div className='h-4 bg-gray-300 rounded w-1/4'></div>
          <div className='flex items-center'>
            <div className='h-4 bg-gray-300 rounded w-10'></div>
            <div className='w-5 h-5 bg-gray-300 rounded ml-1'></div>
          </div>
        </div>
        <button className='w-full h-10 bg-gray-300 rounded'></button>
      </div>
    </div>
  );
};
