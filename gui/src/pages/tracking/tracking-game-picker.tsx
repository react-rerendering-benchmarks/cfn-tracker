import { memo } from "react";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/ui/button';
import * as Page from '@/ui/page';
import { cn } from '@/helpers/cn';
import sfv from './games/sfv.png';
import sf6 from './games/sf6.png';
type GameCode = 'sfv' | 'sf6';
const GAMES = ([{
  logo: sfv,
  code: 'sfv',
  alt: 'Street Fighter V'
}, {
  logo: sf6,
  code: 'sf6',
  alt: 'Street Fighter 6'
}] as const);
export const TrackingGamePicker = memo(function TrackingGamePicker(props: {
  onSubmit: (game: GameCode) => void;
}) {
  const {
    t
  } = useTranslation();
  const [selectedGame, setSelectedGame] = React.useState<GameCode | undefined>();
  return <Page.Root>
      <Page.Header>
        <Page.Title>{t('pickGame')}</Page.Title>
      </Page.Header>
      <div className='flex flex-col items-center justify-center gap-10 justify-self-center'>
        <motion.ul initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.125
      }} className='flex w-full justify-center gap-8'>
          {GAMES.map(game => <li key={game.code}>
              <button type='button' className={cn('w-52 rounded-lg p-3', 'transition-colors hover:bg-slate-50 hover:bg-opacity-5')} {...game.code === selectedGame && {
            style: {
              outline: '1px solid lightblue',
              background: 'rgb(248 250 252 / 0.05)'
            }
          }} onClick={() => setSelectedGame(game.code)}>
                <img src={game.logo} alt={game.alt} className='pointer-events-none select-none' />
              </button>
            </li>)}
        </motion.ul>
        <Button onClick={() => {
        selectedGame && props.onSubmit(selectedGame);
      }} disabled={!selectedGame}>
          {t('continueStep')}
        </Button>
      </div>
    </Page.Root>;
});