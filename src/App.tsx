import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

const Home = lazy(() => import('./pages/Home'));
const Movie = lazy(() => import('./pages/MoviePage/Movie'));
const MovieDetail = lazy(() => import('./pages/MoviePage/MovieDetail'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='movies'>
            <Route index element={<Movie />} />
            <Route path=':movieId' element={<MovieDetail />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
