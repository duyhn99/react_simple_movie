import { fetcher, tmdbAPI } from '@/config';
import { IMovie } from '@/interfaces/movie.interface';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import MovieCard, { MovieCardSkeleton } from './MovieCard';
import { v4 as uuidv4 } from 'uuid';

function MovieList({ type }: { type: string }) {
  const { data, error } = useSWR(`${tmdbAPI.getMoviesList(type)}`, fetcher);
  const loading = !data && !error;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data) {
      setMovies(data.results);
    }
  }, [data]);

  return (
    <div className='movie-list'>
      <Swiper grabCursor spaceBetween={40} slidesPerView={'auto'}>
        {loading ? (
          <>
            {Array(5)
              .fill(0)
              .map(() => (
                <SwiperSlide key={uuidv4()}>
                  <MovieCardSkeleton />
                </SwiperSlide>
              ))}
          </>
        ) : (
          <>
            {movies.length > 0 &&
              movies.map((item: IMovie) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item} />
                </SwiperSlide>
              ))}
          </>
        )}
      </Swiper>
    </div>
  );
}

export default MovieList;
