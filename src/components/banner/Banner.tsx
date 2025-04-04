import { fetcher, tmdbAPI } from '@/config';
import { IMovie } from '@/interfaces/movie.interface';
import { CirclePlay } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import Button from '../button/Button';

const Banner = () => {
  const { data } = useSWR(`${tmdbAPI.getMoviesList('upcoming')}`, fetcher);

  const movies = data?.results || [];

  return (
    <section className='banner h-[500px] page-container mb-20 overflow-hidden'>
      <Swiper grabCursor spaceBetween={40} slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map((item: IMovie) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ item }: { item: IMovie }) => {
  const { title, poster_path, id } = item;
  const navigate = useNavigate();

  return (
    <div className='w-full h-full rounded-lg relative'>
      <div className='overlay absolute inset-0 bg-[rgba(0,0,0,0.5)]'></div>
      <img
        src={`${tmdbAPI.imageOriginal(poster_path)}`}
        alt='banner-img'
        className='w-full h-full object-cover rounded-lg'
      />
      <div className='absolute bottom-5 w-full left-5'>
        <h2 className='font-bold text-3xl mb-5'>{title}</h2>
        {/* <div className='flex items-center gap-x-3 mb-8'>
          <span className='px-4 border border-white py-2 rounded-md'>Adventure</span>
          <span className='px-4 border border-white py-2 rounded-md'>Adventure</span>
          <span className='px-4 border border-white py-2 rounded-md'>Adventure</span>
        </div> */}
        <Button
          icon={<CirclePlay className='w-5 h-5 inline-block ml-2' />}
          bgColor='primary'
          className='w-auto'
          onClick={() => navigate(`/movies/${id}`)}
        >
          Watch now
        </Button>
      </div>
    </div>
  );
};

export default Banner;
