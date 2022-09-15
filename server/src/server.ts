import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

import { convertHoursStringToMinutes } from './utils/convert-hours-string-to-minute';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: { 
        select: {
          ads: true
        }
      }
    }
  });

  return res.json(games);
});

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return res.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesToHourString(ad.hoursStart),
      hoursEnd: convertMinutesToHourString(ad.hoursEnd),
    }
  }));
});

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId,
    }
  })

  return res.json(ad);
});

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body: any = req.body;

  const dados = {
    id: undefined,
    gameId,         
    name: body.name,           
    yearsPlaying: body.yearsPlaying,    
    discord  : body.discord,      
    weekDays: body.weekDays.join(','),       
    hoursStart: convertHoursStringToMinutes(body.hoursStart),      
    hoursEnd: convertHoursStringToMinutes(body.hoursEnd),       
    useVoiceChannel: body.useVoiceChannel, 
    createdAt: body.createdAt,       
  };

  const ad = await prisma.ad.create({ data: dados });

  return res.status(201).json(ad);

});



app.listen(3333);
