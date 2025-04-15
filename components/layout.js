// components/Layout.js
import React from 'react';
import { View, TextInput, Image, ImageBackground } from 'react-native';
import globalStyles from '../styles/global_styles';

export default function Layout({ children }) {
    return (
      <ImageBackground
        source={require('../assets/acuarela.jpg')}
        style={globalStyles.background}
      >
        <View style={globalStyles.topBar}>
          <Image source={require('../assets/menu-flat.webp')} style={globalStyles.icon} />
          <TextInput
            placeholder="Buscar..."
            placeholderTextColor="#666"
            style={globalStyles.searchInput}
          />
          <Image source={require('../assets/user.png')} style={globalStyles.icon} />
        </View>
  
        <View style={globalStyles.content}>
          {children}
        </View>
      </ImageBackground>
    );
  }

