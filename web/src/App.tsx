import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import logoImg from './assets/Logo.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { GameBanner } from './components/GameBanner';
import './styles/main.css';

interface AdsProps {
  ads: number;
}

interface GamerProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: AdsProps;
}

function App() {
  const [games, setGames] = useState<GamerProps[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then((res) => setGames(res.data));
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt='Logo' />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsAccount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
