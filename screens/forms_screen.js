import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  scrollViewRef,
  Image,
  Animated,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/forms_styles";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import formsStyles from "../styles/forms_styles";

export default function FormsScreen({ route }) {
  const navigation = useNavigation();
  const { chip } = route.params || {};
  const { width, height } = Dimensions.get("window");

  const [errors, setErrors] = useState({
    fechaPeso: false,
    peso: false,
    dosis: false,
    unidad: false,
    fechaVacuna: false,
  });

  const [pesoChecked, setPesoChecked] = useState(false);
  const [vacunaChecked, setVacunaChecked] = useState(false);
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const [dosisFinal, setDosisFinal] = useState("");

  // DropDownPicker estados
  const [openTipoVacuna, setOpenTipoVacuna] = useState(false);
  const [openVacunaNombre, setOpenVacunaNombre] = useState(false);
  const [tipoVacuna, setTipoVacuna] = useState(null);
  const [nombreVacuna, setNombreVacuna] = useState(null);
  const [itemsTipoVacuna, setItemsTipoVacuna] = useState([]);
  const [itemsVacunaNombre, setItemsVacunaNombre] = useState([]);
  const [cattlePeso, setCattlePeso] = useState(null);
  const [cattleVacuna, setCattleVacuna] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDateType, setCurrentDateType] = useState("");
  const [filteredCattle, setFilteredCattle] = useState([]);
  const [observacion, setObservacion] = useState("");
  const [fechaVacuna, setFechaVacuna] = useState("");
  // Estados para formulario de peso
  const [observations, setObservations] = useState("");
  const [chipPeso, setChipPeso] = useState("");
  const [peso, setPeso] = useState("");
  const [fechaPeso, setFechaPeso] = useState("");
  // Estados para formulario de vacunas
  const [chipVacuna, setChipVacuna] = useState("");
  const API_URL = "https://webmobileregister-production.up.railway.app";


  //============================================================================
  const menuAnim = useState(new Animated.Value(-250))[0]; // Para el menú lateral
    const userMenuAnim = useState(new Animated.Value(-250))[0]; // Para el menú de usuario
  
    const [showMenu, setShowMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
  
    const toggleMenu = () => {
      if (showMenu) {
        Animated.spring(menuAnim, {
          toValue: -250,
          bounciness: 10,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(menuAnim, {
          toValue: 0,
          bounciness: 10,
          useNativeDriver: true,
        }).start();
      }
      setShowMenu(!showMenu);
      setShowUserMenu(false); // Cerrar el menú de usuario si se abre el otro
    };
  
      // Función para abrir el menú de usuario
      const toggleUserMenu = () => {
        if (showUserMenu) {
          Animated.spring(userMenuAnim, {
            toValue: -250,
            bounciness: 10,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(userMenuAnim, {
            toValue: 0,
            bounciness: 10,
            useNativeDriver: true,
          }).start();
        }
        setShowUserMenu(!showUserMenu);
        setShowMenu(false); 
      };
  
     const navigateToHome = () => {
      navigation.navigate("Home");
    };
   
   const handleGoBack = () => {
  // Navega directamente a la pantalla CattleListScreen
  navigation.navigate("ControlScreen");
};
    //========================================================================
  
  useEffect(() => {
    axios
      .get(`${API_URL}/vaccines/tipos-vacuna`)
      .then((res) => setItemsTipoVacuna(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`${API_URL}/vaccines/nombres-vacuna`)
      .then((res) => setItemsVacunaNombre(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleConfirmDate = (date) => {
    // Ajustar manualmente a UTC-5 (hora Colombia)
    const colombiaDate = new Date(date.getTime() - 5 * 60 * 60 * 1000);
    const formattedDate = colombiaDate.toISOString().split("T")[0];

    const today = new Date(new Date().getTime() - 5 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    // Si la fecha es futura, mostrar la alerta
    if (formattedDate > today) {
      Alert.alert(
        "Fecha inválida",
        "No puedes seleccionar una fecha futura.",
        [{ text: "Aceptar" }],
        { cancelable: false }
      );
    }

    // Si la fecha es válida, asignarla
    if (currentDateType === "peso") {
      setFechaPeso(formattedDate);
    } else {
      setFechaVacuna(formattedDate);
    }

    // Solo cerrar el modal si la fecha es válida
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    if (chip) {
      setChipPeso(chip);
      setChipVacuna(chip);
    }
  }, [chip]);

  const resetPesoFields = () => {
    setCattlePeso(null);
    setPeso("");
    setFechaPeso("");
  };

 const guardarPeso = async () => {
  if (!fechaPeso || !peso) {
    setErrors({ ...errors, fechaPeso: !fechaPeso, peso: !peso });
    Alert.alert(
      "⚠️ Campos obligatorios",
      "Por favor, completa todos los campos obligatorios en el Control de Peso."
    );
    return;
  }

  try {
    const response = await axios.post(`${API_URL}/weighing/add`, {
      chip_animal: chipPeso,
      fecha_pesaje: fechaPeso,
      peso_kg: parseFloat(peso),
    });

  Alert.alert("Éxito", "Pesaje guardado");
      resetPesoFields();
      navigation.navigate("ControlScreen", {
        chip,
        shouldRefresh: true,
        nuevoPeso: response.data,
      });

    
     
    } catch (error) {
      console.error(error);
    }
  };




  const resetVacunaFields = () => {
    setCattleVacuna(null);
    setTipoVacuna(null);
    setNombreVacuna(null);
    setDosisFinal("");
    setObservations("");
    setFechaVacuna("");
    setUnidad("");
    setCantidad("");
  };

  useEffect(() => {
    if (cantidad && unidad) {
      setDosisFinal(`${cantidad} ${unidad}`);
    } else {
      setDosisFinal("");
    }
  }, [cantidad, unidad]);

  const guardarVacuna = async () => {
    if (!fechaVacuna || !cantidad || !unidad || !tipoVacuna || !nombreVacuna) {
      setErrors({
        ...errors,
        fechaVacuna: !fechaVacuna,
        dosis: !cantidad || !unidad,
        unidad: !unidad,
      });
      Alert.alert(
        "⚠️ Campos obligatorios",
        "Por favor, completa todos los campos obligatorios en el Control de Vacunas."
      );
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/vaccines/add`, {
        chip_animal: chipVacuna,
        fecha_vacuna: fechaVacuna,
        tipo_vacunas_id_tipo_vacuna: tipoVacuna,
        nombre_vacunas_id_vacuna: nombreVacuna,
        dosis_administrada: dosisFinal,
        observaciones: observations,
      });
      Alert.alert("Éxito", "Vacuna guardada");
      resetVacunaFields();
      navigation.replace("ControlScreen", {
        chip,
        shouldRefresh: true,
        nuevaVacuna: response.data,
      });
    } catch (error) {
      // Mostrar mensaje claro al usuario
      if (error.response && error.response.data) {
        // Si el backend envía un mensaje de error específico
        Alert.alert(
          "Error",
          error.response.data.error || JSON.stringify(error.response.data)
        );
      } else {
        // Error de red u otro error desconocido
        Alert.alert("Error", "No se pudo guardar la vacuna. Intenta de nuevo.");
      }
      console.error(error);
    }
  };


  const handleSelectCattle = (cattle) => {
    if (pesoChecked) {
      setChipPeso(cattle.chip);
      setCattlePeso(cattle);
      setPeso(cattle.peso?.toString() || "");
      setFechaPeso(cattle.fechaNacimiento || "");
    } else if (vacunaChecked) {
      setChipVacuna(cattle.chip);
      setCattleVacuna(cattle);
      setTipoVacuna(cattle.tipoVacuna || null);
      setNombreVacuna(cattle.nombreVacuna || null);

      // Asignar dosisFinal directamente desde cattle.dosis (si existe)
      setDosisFinal(cattle.dosis || "");

      setObservacion(cattle.observacion || null);
      setFechaVacuna(cattle.fechaNacimiento || "");
    }
    setFilteredCattle([]);
  };

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: "ml", value: "ml" },
    { label: "cc", value: "cc" },
    { label: "mg", value: "mg" },
    { label: "mg/kg", value: "mg_kg" },
    { label: "ml/kg", value: "ml_kg" },
  ]);

  return (
<ImageBackground
  source={require('../assets/acuarela.Home.png')} // Usa la ruta relativa correcta
  style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
>
         
               <View >
                 {/* Header */}
                 <View style={[styles.topBar, styles.topBarContainer]}>
                   <View style={styles.topBarGreen}>
                     <TouchableOpacity onPress={toggleMenu}>
                       <Image
                         source={require("../assets/Menu.png")}
                         style={styles.icon}
                       />
                     </TouchableOpacity>
         
                     <TouchableOpacity onPress={toggleUserMenu}>
                       <Image
                         source={require("../assets/user.png")}
                         style={styles.iconUser}
                       />
                     </TouchableOpacity>
                   </View>
                 </View>
         
                 {/* Menú lateral */}
                 {showMenu && (
                   <Animated.View
                     style={[
                       styles.dropdownMenuLeft,
                       { transform: [{ translateX: menuAnim }] },
                       { zIndex: 1 }, // Asegura que el menú esté encima
                     ]}
                   >
                     <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                       <Text style={styles.dropdownItem}>Inicio</Text>
                     </TouchableOpacity>
                    
                   </Animated.View>
                 )}
         
                 {/* Menú de usuario */}
                 {showUserMenu && (
                   <Animated.View
                     style={[
                       styles.dropdownMenuLeftuser,
                       { transform: [{ translateX: userMenuAnim }] },
                       { zIndex: 1 }, // Asegura que el menú esté encima
                     ]}
                   >
                     <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                       <Text style={styles.dropdownItem}>Cerrar sesión</Text>
                     </TouchableOpacity>
                   </Animated.View>
                 )}
         
               </View>
     <ScrollView
             ref={scrollViewRef}
             style={{ flex: 1 }} // Hace que el ScrollView ocupe todo el espacio disponible
             contentContainerStyle={{ paddingBottom: 20 }} // Espacio extra al final del ScrollView
           >
        <Image
          source={require("../assets/Imagen_Formulario_Registro_Ganado.png")} // Ruta de la imagen
          style={styles.image} // Estilo único para la imagen
        />

        <Text style={styles.title1}>Formularios </Text>
        <Text style={styles.title2}>de control</Text>

        <View style={styles.switchRow}>
          <TouchableOpacity
            style={[styles.switchButton]}
            onPress={() => {
              setPesoChecked(true);
              setVacunaChecked(false);
            }}
          >
            <Ionicons
              name={pesoChecked ? "checkbox" : "square-outline"}
              style={
                pesoChecked
                  ? formsStyles.iconChecked
                  : formsStyles.iconUnchecked
              }
            />
            <Text style={styles.switchText}>Control de Peso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.switchButton]}
            onPress={() => {
              setVacunaChecked(true);
              setPesoChecked(false);
            }}
          >
            <Ionicons
              name={vacunaChecked ? "checkbox" : "square-outline"}
              style={
                vacunaChecked
                  ? formsStyles.iconChecked
                  : formsStyles.iconUnchecked
              }
            />
            <Text style={styles.switchText}>Control de Vacunas</Text>
          </TouchableOpacity>
        </View>

        {/* FORMULARIO DE PESO */}
        {pesoChecked && (
          <View style={styles.formSection}>
            <Image
              source={require("../assets/Peso.png")}
              style={styles.imagePeso}
            />
            <Text style={styles.subtitle1}>Formulario </Text>
            <Text style={styles.subtitle2}>Control de Peso</Text>

            <View style={styles.inputContainer}>
              <Image
                source={require("../assets/Chip.png")}
                style={styles.logo}
              />

              <TextInput
                style={styles.inputChip}
                value={chipPeso}
                editable={false}
              />
            </View>

            {filteredCattle.length > 0 && (
              <ScrollView vertical style={styles.cattleList}>
                {filteredCattle.map((item) => (
                  <TouchableOpacity
                    key={item.chip}
                    style={styles.cattleItem}
                    onPress={() => handleSelectCattle(item)}
                  >
                    <Text>{item.nombre}</Text>
                    <Text>{item.chip}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity
              style={[styles.dateButton, errors.fechaPeso && styles.inputError]}
              onPress={() => {
                setCurrentDateType("peso");
                setDatePickerVisibility(true);
              }}
            >
              <Image
                source={require("../assets/FechaDeNacimieto.png")}
                style={styles.logo}
              />
              <Text style={styles.dateButtonText}>
                {fechaPeso || "Fecha de pesaje*"}
              </Text>
            </TouchableOpacity>

            <View
              style={[styles.weightContainer, errors.peso && styles.inputError]}
            >
              <Image
                source={require("../assets/Peso.png")} // Ruta de la imagen local
                style={styles.iconStylePeso}
              />
              <TextInput
                style={[styles.weightInput]}
                placeholder="Peso*"
                placeholderTextColor="#000"
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
              />
              <Text style={styles.weightUnit}>(Kg)</Text>
            </View>

            <TouchableOpacity
              style={styles.buttonGuardar}
              onPress={guardarPeso}
            >
              <Text style={styles.buttonTextGuardar}>Guardar</Text>
            </TouchableOpacity>
          </View>
        )}

        {vacunaChecked && (
          <View style={styles.formSection}>
            <Image
              source={require("../assets/Vacunas.png")}
              style={styles.imagePeso}
            />
            <Text style={styles.subtitle1}>Formulario </Text>
            <Text style={styles.subtitle2}>Control de Vacunas</Text>

            <View style={styles.inputContainer}>
              <Image
                source={require("../assets/Chip.png")}
                style={styles.logo}
              />

              <TextInput
                style={styles.inputChip}
                value={chipVacuna}
                editable={false}
              />
            </View>

            {filteredCattle.length > 0 && (
              <ScrollView vertical style={styles.cattleList}>
                {filteredCattle.map((item) => (
                  <TouchableOpacity
                    key={item.chip}
                    style={styles.cattleItem}
                    onPress={() => handleSelectCattle(item)}
                  >
                    <Text>{item.nombre}</Text>
                    <Text>{item.chip}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {/* DropDownPicker */}
            <DropDownPicker
              open={openTipoVacuna}
              setOpen={() => {
                setOpenVacunaNombre(false);
                setOpenTipoVacuna(true);
                setOpen(false);
              }}
              value={tipoVacuna}
              items={itemsTipoVacuna}
              setValue={setTipoVacuna}
              placeholder="Tipo de vacuna"
              containerStyle={[styles.dropdownContainerPicker]}
              style={styles.dropdownListStyle}
              listMode="SCROLLVIEW"
              maxHeight={200} // Ajusta la altura máxima del dropdown
              onChangeValue={() => setOpenTipoVacuna(false)}
              arrowIconStyle={styles.arrowIconStyle}
            />

            <DropDownPicker
              open={openVacunaNombre}
              setOpen={() => {
                setOpenTipoVacuna(false);
                setOpenVacunaNombre(true);
                setOpen(false);
              }}
              value={nombreVacuna}
              items={itemsVacunaNombre}
              setValue={setNombreVacuna}
              placeholder="Nombre de vacuna"
              containerStyle={[
                styles.dropdownContainerPicker,
                openTipoVacuna && styles.dropdownBelow,
              ]}
              style={styles.dropdownListStyle}
              listMode="SCROLLVIEW"
              maxHeight={200} // Ajusta la altura máxima del dropdown
              onChangeValue={() => setOpenVacunaNombre(false)}
              arrowIconStyle={styles.arrowIconStyle}
            />

            <View style={styles.row}>
              <View
                style={[
                  styles.inputDosisContainer,
                  errors.dosis && styles.inputError,
                ]}
              >
                <Image
                  source={require("../assets/Vacuna.png")}
                  style={styles.dropdownLogo}
                />
                <TextInput
                  style={[
                    styles.inputDosis,
                    errors.dosis && styles.inputError1,
                  ]}
                  value={cantidad}
                  onChangeText={setCantidad}
                  placeholder="Dosis*"
                  placeholderTextColor="#000"
                  keyboardType="numeric"
                />
              </View>

              <DropDownPicker
                open={open}
                value={unidad}
                items={items}
                setOpen={() => {
                  setOpenTipoVacuna(false);
                  setOpenVacunaNombre(false);
                  setOpen(true);
                }}
                setValue={setUnidad}
                setItems={setItems}
                placeholder="Unidad*"
                containerStyle={[
                  styles.dropdownContainerUnidad, // Estilo base
                  open && styles.dropdownBelowUnidad, // Estilo cuando está abierto

                  errors.unidad && styles.inputError, // Aplica el estilo de error si hay un error
                  { zIndex: 9999 },
                ]}
                listMode="SCROLLVIEW"
                arrowIconStyle={styles.arrowIconStyle}
                onChangeValue={() => setOpen(false)}
                // Eliminar el borde extra dentro del dropdown
                dropDownStyle={{
                  borderWidth: 0, // Elimina el borde dentro del dropdown
                  padding: 0, // Asegura que no haya relleno adicional
                }}
                style={{
                  borderWidth: 0, // Elimina el borde interno adicional
                }}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.dateButton,
                errors.fechaVacuna && styles.inputError,
              ]}
              onPress={() => {
                setCurrentDateType("vacuna");
                setDatePickerVisibility(true);
              }}
            >
              <Image
                source={require("../assets/Vacunas.png")}
                style={styles.logo}
              />
              <Text style={styles.dateButtonText}>
                {fechaVacuna || "Fecha de vacunación*"}
              </Text>
            </TouchableOpacity>

            <View style={styles.inputWrapper}>
              <Image
                source={require("../assets/Obs.png")}
                style={styles.iconStyleO}
              />
              <TextInput
                style={styles.inputobs}
                placeholder="Observaciones"
                value={observations}
                onChangeText={setObservations}
                multiline
                textAlignVertical="top"
                maxLength={500} // Puedes ajustar el límite según necesidad
              />
            </View>

            <TouchableOpacity
              style={styles.buttonGuardar}
              onPress={guardarVacuna}
            >
              <Text style={styles.buttonTextGuardar}>Guardar</Text>
            </TouchableOpacity>
          </View>
        )}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          themeVariant="light"
          onCancel={() => setDatePickerVisibility(false)}
          maximumDate={new Date()} // Establece el día de hoy como la fecha máxima (deshabilita fechas futuras)
        />
      </ScrollView>
        {/* Barra inferior */}
                <View style={styles.greenBar}>
                  <View style={styles.bottomImageContainer}>
                    {/* Imagen Inicio */}
                    <TouchableOpacity onPress={navigateToHome}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={require("../assets/Inicio.png")}
                          style={styles.imageStyleG}
                        />
                        <Text style={styles.imageText}>Inicio</Text>
                      </View>
                    </TouchableOpacity>
          
                    {/* Imagen Regresar */}
                    <TouchableOpacity onPress={handleGoBack}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={require("../assets/Regresar.png")}
                          style={styles.imageStyleG}
                        />
                        <Text style={styles.imageText}>Regresar</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View> 
          
          
              </ImageBackground>
  );
}
