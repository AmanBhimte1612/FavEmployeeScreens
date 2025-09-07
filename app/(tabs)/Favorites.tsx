import ListItems from '@/components/ListItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, FlatList, Text } from 'react-native';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      setFavorites(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.error('Error loading favorites', e);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (user: User) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav.id !== user.id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (e) {
      console.error('Error removing favorite', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );


  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <ActivityIndicator size={30} color="red" />
      ) : favorites.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No favorites saved</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItems
              user={item}
              onToggleFavorite={removeFavorite}
              isFavorite={true}
            />
          )}
          ListHeaderComponent={() => (
            <View className="px-4 pt-10 pb-2 bg-gray-200">
              <Text className="text-lg font-bold">Favorite List</Text>
              <Text className="text-gray-600">Stored Locally</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Favorites;
