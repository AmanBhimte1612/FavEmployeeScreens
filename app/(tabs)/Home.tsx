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

const Home = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<User[]>([]);

  
  useFocusEffect(
      useCallback(() => {
    loadFavorites().then(setFavorites);
      }, [])
    );

  const toggleFavorite = (user: User) => {
    let updatedFavorites: User[];
    if (favorites.some(fav => fav.id === user.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== user.id);
    } else {
      updatedFavorites = [...favorites, user];
    }
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (favorites: User[]) => {
    try {
      const jsonValue = JSON.stringify(favorites);
      await AsyncStorage.setItem('favorites', jsonValue);
    } catch (e) {
      console.error('Error saving favorites', e);
    }
  };

  const loadFavorites = async (): Promise<User[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error loading favorites', e);
      return [];
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <ActivityIndicator size={30} color={'red'} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItems
              user={item}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.some(fav => fav.id === item.id)}
            />
          )}
          ListHeaderComponent={() => (
            <View className="px-4 pt-10 pb-2 bg-gray-200">
              <Text className="text-lg font-bold">User List</Text>
              <Text className="text-gray-600">Page 2 from ReqRes API</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Home;


