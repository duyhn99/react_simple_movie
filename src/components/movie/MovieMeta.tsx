import { fetcher, tmdbAPI } from '@/config';
import { ICredits } from '@/interfaces/credits.interface';
import { ISimilar } from '@/interfaces/similar.interface';
import { IVideos } from '@/interfaces/videos.interface';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import MovieCard from './MovieCard';

const MovieMeta = ({ type }: { type: string }) => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data }: { data: IVideos | ISimilar | ICredits } = useSWR(
    `${tmdbAPI.getMovieMeta(movieId as string, type)}`,
    fetcher
  );
  if (!data) return null;
  if (type === 'credits') {
    const { cast } = data as ICredits;
    if (!cast || cast.length === 0) return null;
    return (
      <div className='py-10'>
        <h2 className='text-3xl text-center mb-10'>Casts</h2>
        <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
          {cast.length > 0 &&
            cast.splice(0, 4).map((item) => (
              <div className='cast-item' key={item.id}>
                <img
                  src={`${tmdbAPI.imageOriginal(item.profile_path)}`}
                  className='w-full h-[350px] object-cover rounded-lg mb-3'
                  alt={item.name}
                  loading='lazy'
                />
                <h3 className='text-xl font-semibold'>{item.name}</h3>
                <p className='text-sm opacity-50'>{item.character}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
  if (type === 'videos') {
    const { results } = data as IVideos;
    if (!results || results.length === 0) return null;
    if (type === 'videos')
      return (
        <div className='py-10'>
          <div className='flex flex-col gap-10'>
            {results.slice(0, 4).map((item) => (
              <div key={item.id}>
                <h3 className='mb-5 text-xl font-medium p-3 bg-secondary inline-block rounded-lg'>{item.name}</h3>
                <div className='w-full aspect-video mb-10'>
                  <iframe
                    width='1280'
                    height='720'
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title={item.name}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                    className='w-full h-full object-fill'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
  if (type === 'similar') {
    const { results } = data as ISimilar;
    if (!results || results.length === 0) return null;
    return (
      <div className='py-10'>
        <h2 className='text-3xl font-semibold mb-10'>Similar Movies</h2>
        <div className='movie-list'>
          <Swiper grabCursor spaceBetween={40} slidesPerView={'auto'}>
            {results.length > 0 &&
              results.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    );
  }
};

export default MovieMeta;
