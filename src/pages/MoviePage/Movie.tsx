import MovieCard, { MovieCardSkeleton } from '@/components/movie/MovieCard';
import { fetcher, itemsPerPage, tmdbAPI } from '@/config';
import useDebounce from '@/hooks/useDebounce';
import useScrollToTop from '@/hooks/useScrollToTop';
import { IMovie } from '@/interfaces/movie.interface';
import { IPopular } from '@/interfaces/popular.interface';
import { ChevronLeft, ChevronRight, Ellipsis, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';

const Movie = () => {
  const [nextpage, setNextPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [url, setUrl] = useState(`${tmdbAPI.getMoviesList('popular', `page=${nextpage}`)}`);

  useScrollToTop(nextpage);

  const filterDebounce = useDebounce(filter, 500);
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const { data, error }: { data: IPopular; error: any } = useSWR(url, fetcher);
  const loading = !data && !error;

  useEffect(() => {
    if (filterDebounce) {
      setUrl(`${tmdbAPI.getSearchMovies(`query=${filterDebounce}&page=${nextpage}`)}`);
    } else {
      setUrl(`${tmdbAPI.getMoviesList('popular', `page=${nextpage}`)}`);
    }
  }, [filterDebounce, nextpage]);

  const movies = data?.results || [];

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data]);

  const handlePageClick = (event: { selected: number }) => {
    setNextPage(event.selected + 1);
  };

  return (
    <div className='py-10 page-container'>
      <div className='flex mb-10'>
        <div className='flex-1'>
          <input
            type='text'
            className='text-white w-full p-4 outline-none bg-slate-800'
            placeholder='Type here to search...'
            onChange={handleFilter}
          />
        </div>
        <button className='p-4 bg-primary text-white'>
          <Search />
        </button>
      </div>
      <div className='grid xl:grid-cols-4 gap-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
        {!loading ? movies.map((movie: IMovie) => <MovieCard key={movie.id} item={movie} />) : <MovieSkeleton />}
      </div>
      {movies.length > 0 && (
        <div className='mt-10'>
          <ReactPaginate
            breakLabel={<Ellipsis className='w-5 h-5' />}
            nextLabel={<ChevronRight className='w-5 h-5' />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ChevronLeft className='w-5 h-5' />}
            renderOnZeroPageCount={null}
            className='pagination'
          />
        </div>
      )}
    </div>
  );
};

export const MovieSkeleton = () => {
  return (
    <>
      {new Array(20).fill(0).map(() => (
        <MovieCardSkeleton key={uuidv4()} />
      ))}
    </>
  );
};

export default Movie;
