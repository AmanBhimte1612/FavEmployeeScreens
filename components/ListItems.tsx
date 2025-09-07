import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ListItems = ({ user, onToggleFavorite, isFavorite }: any) => {

    return (
        <View className="flex-row items-center p-4 bg-gray-100 rounded-lg mb-3">
            {/* Avatar */}
            <Image
                source={{ uri: user.avatar }}
                className="w-12 h-12 rounded-full mr-4"
            />

            {/* User info */}
            <View className="flex-1">
                <Text className="text-lg font-semibold">
                    {user.first_name} {user.last_name}
                </Text>
                <Text className="text-gray-600">{user.email}</Text>
            </View>

            {/* Favorite button */}
            <TouchableOpacity onPress={() => {onToggleFavorite(user)}}>
                {!isFavorite ? (
                    <MaterialIcons name='favorite-border' size={30} color={'red'} />
                ) : (
                    <MaterialIcons name='favorite' size={28} color={'red'} />

                )

                }
            </TouchableOpacity>
        </View>
    );
};

export default ListItems;
