import { useCallback } from 'react';
import { FlatList, Image, View } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../Components/GameCard';
import { Heading } from '../../Components/Heading';
import { GAMES } from '../../utils/games';
import { styles } from './styles';

export function Home() {

  const renderItem = useCallback(({ item }: any) => (
    <GameCard 
      data={item}
    />
  ), []);

  return (
    <View style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}
      />

      <Heading 
        title='Encontre seu duo!'
        subtitle='Selecione o game que deseja jogar...'
      />

      <FlatList 
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />

    </View>
  );
}