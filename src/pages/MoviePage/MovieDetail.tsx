import MovieMeta from '@/components/movie/MovieMeta';
import { fetcher, tmdbAPI } from '@/config';
import { IMovieDetail } from '@/interfaces/movie.interface';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data }: { data: IMovieDetail } = useSWR(`${tmdbAPI.getMovieDetails(movieId as string)}`, fetcher);
  if (!data) return null;
  return (
    <div className='py-10'>
      <div className='w-full h-[600px] relative'>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div
          className='w-full h-full bg-cover bg-no-repeat'
          style={{ backgroundImage: `url(${tmdbAPI.imageOriginal(data?.backdrop_path)})` }}
        />
      </div>
      <div className='w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10'>
        <img
          src={`${tmdbAPI.imageOriginal(data?.poster_path)}`}
          className='w-full h-full object-cover rounded-lg'
          alt=''
        />
      </div>
      <h1 className='text-4xl font-bold text-center text-white mb-10'>{data.title}</h1>
      <div className='flex items-center justify-center gap-x-5 mb-10'>
        {data.genres.length > 0 &&
          data.genres.map((genre) => (
            <span className='py-2 px-4 border border-primary text-primary rounded' key={genre.id}>
              {genre.name}
            </span>
          ))}
      </div>
      <p className='text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10'>{data.overview}</p>
      <MovieMeta type='credits'></MovieMeta>
      <MovieMeta type='videos'></MovieMeta>
      <MovieMeta type='similar'></MovieMeta>
    </div>
  );
};

export default MovieDetail;
