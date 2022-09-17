interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsAccount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href='#' className='relative rounded-lg overflow-hidden'>
      <img src={props.bannerUrl} alt={props.title} className='' />

      <div className='w-full pt-16 pb-4 px-4 bg-gradient-game absolute bottom-0 left-0 right-0'>
        <strong className='font-bold text-white block'>{props.title}</strong>
        <strong className='text-zinc-300 text-sm block'>{props.adsAccount} anúnci(s)</strong>
      </div>
    </a>
  );
}
