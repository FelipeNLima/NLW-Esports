import { GameController } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  id: string; 
  name: string; 
  hoursEnd: string; 
  hoursStart: string; 
  useVoiceChannel: boolean; 
  weekDays: string[]; 
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnected: () => void;
}

export function DuoCard({ data, onConnected }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo 
        label="Nome"
        value={data.name}
      />
      <DuoInfo 
        label="Tempo de jogo"
        value={`${data.yearsPlaying} anos`}
      />
      <DuoInfo 
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hoursStart} - ${data.hoursEnd}`}
      />
      <DuoInfo 
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={onConnected}
      >
        <GameController 
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}