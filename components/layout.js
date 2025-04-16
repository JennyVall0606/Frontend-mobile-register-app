import React, { useState } from 'react';
import { View, Text, TextInput, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global_styles';

export default function Layout({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/acuarela.jpg')}
      style={globalStyles.background}
    >
      <View style={globalStyles.topBar}>
        <TouchableOpacity onPress={() => {
          setShowMenu(!showMenu);
          setShowUserMenu(false);
        }}>
          <Image source={require('../assets/menu.png')} style={globalStyles.icon} />
        </TouchableOpacity>

        <TextInput
          placeholder="Buscar..."
          placeholderTextColor="#666"
          style={globalStyles.searchInput}
        />

        <TouchableOpacity onPress={() => {
          setShowUserMenu(!showUserMenu);
          setShowMenu(false);
        }}>
          <Image source={require('../assets/user.png')} style={globalStyles.icon} />
        </TouchableOpacity>
      </View>

      {showMenu && (
        <View style={globalStyles.dropdownMenuLeft}>
          <Text style={globalStyles.dropdownItem}>Home</Text>
          <Text style={globalStyles.dropdownItem}>Registro</Text>
          <Text style={globalStyles.dropdownItem}>Historiales</Text>
          <Text style={globalStyles.dropdownItem}>Formulario</Text>
        </View>
      )}

      {showUserMenu && (
  <View style={globalStyles.dropdownMenuRight}>
    <TouchableOpacity onPress={() => {
      setShowUserMenu(false);
      navigation.navigate('Welcome'); // ← Navega a la pantalla de bienvenida
    }}>
      <Text style={globalStyles.dropdownItem}>Cerrar sesión</Text>
    </TouchableOpacity>
  </View>
)}


      <View style={globalStyles.content}>
        {children}
      </View>
    </ImageBackground>
  );
}


