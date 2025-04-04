import Banner from '@/components/banner/Banner';
import MovieList from '@/components/movie/MovieList';

const Home = () => {
  return (
    <>
      <Banner />
      <section className='movies-layout page-container pb-10'>
        <h2 className='capitalize text-3xl text-white font-bold mb-10'>Now playing</h2>
        <MovieList type='now_playing' />
      </section>
      <section className='movies-layout page-container pb-10'>
        <h2 className='capitalize text-3xl text-white font-bold mb-10'>Top rated</h2>
        <MovieList type='top_rated' />
      </section>
      <section className='movies-layout page-container pb-10'>
        <h2 className='capitalize text-3xl text-white font-bold mb-10'>popular</h2>
        <MovieList type='popular' />
      </section>
    </>
  );
};

export default Home;
