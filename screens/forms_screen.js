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
    tipoSeguimiento: false,
  });

  const [pesoChecked, setPesoChecked] = useState(false);
  const [vacunaChecked, setVacunaChecked] = useState(false);
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const [dosisFinal, setDosisFinal] = useState("");
  const [precioKgCompra, setPrecioKgCompra] = useState('');
  const [precioKgVenta, setPrecioKgVenta] = useState('');
  const [costoGanadoCompra, setCostoGanadoCompra] = useState('');
  const [costoGanadoVenta, setCostoGanadoVenta] = useState('');

  // Nuevos estados para cálculo de ganancia
  const [datosCompra, setDatosCompra] = useState(null);
  const [gananciaKg, setGananciaKg] = useState(null);
  const [gananciaValor, setGananciaValor] = useState(null);
  const [periodoMeses, setPeriodoMeses] = useState(null);

  const [openTipoVacuna, setOpenTipoVacuna] = useState(false);
  const [openVacunaNombre, setOpenVacunaNombre] = useState(false);
  const [openTipoSeguimiento, setOpenTipoSeguimiento] = useState(false);
  const [tipoVacuna, setTipoVacuna] = useState(null);
  const [nombreVacuna, setNombreVacuna] = useState(null);
  const [tipoSeguimiento, setTipoSeguimiento] = useState(null);
  const [itemsTipoVacuna, setItemsTipoVacuna] = useState([]);
  const [itemsVacunaNombre, setItemsVacunaNombre] = useState([]);
  const [cattlePeso, setCattlePeso] = useState(null);
  const [cattleVacuna, setCattleVacuna] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDateType, setCurrentDateType] = useState("");
  const [filteredCattle, setFilteredCattle] = useState([]);
  const [observacion, setObservacion] = useState("");
  const [fechaVacuna, setFechaVacuna] = useState("");
 
  const [observations, setObservations] = useState("");
  const [chipPeso, setChipPeso] = useState("");
  const [peso, setPeso] = useState("");
  const [fechaPeso, setFechaPeso] = useState("");
  
  const [chipVacuna, setChipVacuna] = useState("");
  const API_URL = "https://webmobileregister-production.up.railway.app";

  const menuAnim = useState(new Animated.Value(-250))[0]; 
  const userMenuAnim = useState(new Animated.Value(-250))[0]; 

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
    setShowUserMenu(false); 
  };

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
    navigation.goBack(); 
  };

  const formatearNumero = (texto) => {
    const numeroLimpio = texto.replace(/[^0-9]/g, '');
    if (numeroLimpio === '') return '';
    return parseInt(numeroLimpio).toLocaleString('es-CO');
  };

  const manejarCambioPrecioCompra = (texto) => {
    setPrecioKgCompra(formatearNumero(texto));
  };

  const manejarCambioPrecioVenta = (texto) => {
    setPrecioKgVenta(formatearNumero(texto));
  };

  useEffect(() => {
    if (peso && precioKgCompra) {
      const pesoNumerico = parseFloat(peso);
      const precioNumerico = parseFloat(precioKgCompra.replace(/\./g, ''));
      setCostoGanadoCompra((pesoNumerico * precioNumerico).toFixed(2));
    }
  }, [peso, precioKgCompra]);

  useEffect(() => {
    if (peso && precioKgVenta) {
      const pesoNumerico = parseFloat(peso);
      const precioNumerico = parseFloat(precioKgVenta.replace(/\./g, ''));
      setCostoGanadoVenta((pesoNumerico * precioNumerico).toFixed(2));
    }
  }, [peso, precioKgVenta]);

  // Función para obtener datos de compra del animal
  const obtenerDatosCompra = async (chipAnimal) => {
    try {
      const response = await axios.get(`${API_URL}/weighing/compra/${chipAnimal}`);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo datos de compra:", error);
      return null;
    }
  };

  // Calcular meses entre dos fechas
  const calcularMesesEntreFechas = (fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    
    let meses = (fin.getFullYear() - inicio.getFullYear()) * 12;
    meses += fin.getMonth() - inicio.getMonth();
    
    return meses;
  };

  // ✅ EFECTO CORREGIDO: Calcular ganancia en tiempo real cuando es venta
  useEffect(() => {
    const calcularGanancia = async () => {
      if (tipoSeguimiento === 'venta' && chipPeso && peso && precioKgVenta && fechaPeso) {
        const compra = await obtenerDatosCompra(chipPeso);
        
        if (compra) {
          setDatosCompra(compra);
          
          // Calcular ganancia en kilos
          const pesoVenta = parseFloat(peso);
          const pesoCompra = parseFloat(compra.peso_kg);
          const gananciaPeso = pesoVenta - pesoCompra;
          setGananciaKg(gananciaPeso);
          
          // ✅ CORRECCIÓN: Calcular ganancia en valor usando costo_compra directamente
          const precioVentaNum = parseFloat(precioKgVenta.replace(/\./g, ''));
          const valorVenta = pesoVenta * precioVentaNum;
          const valorCompra = parseFloat(compra.costo_compra); // 👈 USAR COSTO_COMPRA DEL BACKEND
          const gananciaEconomica = valorVenta - valorCompra;
          setGananciaValor(gananciaEconomica);
          
          // Calcular periodo en meses
          const meses = calcularMesesEntreFechas(compra.fecha_pesaje, fechaPeso);
          setPeriodoMeses(meses);
        } else {
          setDatosCompra(null);
          setGananciaKg(null);
          setGananciaValor(null);
          setPeriodoMeses(null);
        }
      } else {
        setDatosCompra(null);
        setGananciaKg(null);
        setGananciaValor(null);
        setPeriodoMeses(null);
      }
    };
    
    calcularGanancia();
  }, [tipoSeguimiento, chipPeso, peso, precioKgVenta, fechaPeso]);

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
    const colombiaDate = new Date(date.getTime() - 5 * 60 * 60 * 1000);
    const formattedDate = colombiaDate.toISOString().split("T")[0];

    const today = new Date(new Date().getTime() - 5 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    if (formattedDate > today) {
      Alert.alert(
        "Fecha inválida",
        "No puedes seleccionar una fecha futura.",
        [{ text: "Aceptar" }],
        { cancelable: false }
      );
      return;
    }

    if (currentDateType === "peso") {
      setFechaPeso(formattedDate);
    } else {
      setFechaVacuna(formattedDate);
    }

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
    setTipoSeguimiento(null);
    setPrecioKgCompra('');
    setPrecioKgVenta('');
    setCostoGanadoCompra('');
    setCostoGanadoVenta('');
    setDatosCompra(null);
    setGananciaKg(null);
    setGananciaValor(null);
    setPeriodoMeses(null);
  };

  const guardarPeso = async () => {
    const erroresNuevos = {
      tipoSeguimiento: !tipoSeguimiento,
      fechaPeso: !fechaPeso,
      peso: !peso,
    };

    if (erroresNuevos.tipoSeguimiento || erroresNuevos.fechaPeso || erroresNuevos.peso) {
      setErrors({ ...errors, ...erroresNuevos });
      Alert.alert(
        "⚠️ Campos obligatorios",
        "Por favor, completa todos los campos obligatorios en el Control de Peso."
      );
      return;
    }

    if (tipoSeguimiento === 'compra' && !precioKgCompra) {
      Alert.alert(
        "⚠️ Campo requerido",
        "Por favor, ingresa el precio por kg de compra."
      );
      return;
    }

    if (tipoSeguimiento === 'venta' && !precioKgVenta) {
      Alert.alert(
        "⚠️ Campo requerido",
        "Por favor, ingresa el precio por kg de venta."
      );
      return;
    }

    // Validación para venta sin compra previa
    if (tipoSeguimiento === 'venta' && !datosCompra) {
      Alert.alert(
        "⚠️ Registro de compra requerido",
        "Debe registrar primero el valor de compra para poder calcular la ganancia económica, la ganancia en kilos y el periodo de ganancia.",
        [{ text: "Aceptar" }],
        { cancelable: false }
      );
      return;
    }

    try {
      const precioCompraNumerico = precioKgCompra ? parseFloat(precioKgCompra.replace(/\./g, '')) : null;
      const precioVentaNumerico = precioKgVenta ? parseFloat(precioKgVenta.replace(/\./g, '')) : null;

      const datosGuardar = {
        chip_animal: chipPeso,
        fecha_pesaje: fechaPeso,
        peso_kg: parseFloat(peso),
        tipo_seguimiento: tipoSeguimiento,
        precio_kg_compra: precioCompraNumerico,
        precio_kg_venta: precioVentaNumerico, 
        costo_compra: parseFloat(costoGanadoCompra) || null, 
        costo_venta: parseFloat(costoGanadoVenta) || null,
      };

      // Si es venta, agregar datos de ganancia
      if (tipoSeguimiento === 'venta' && datosCompra) {
        datosGuardar.ganancia_peso = gananciaKg;        // ✅ Usar ganancia_peso para el backend
        datosGuardar.ganancia_valor = gananciaValor;
        datosGuardar.tiempo_meses = periodoMeses;       // ✅ Usar tiempo_meses para el backend
      }

      const response = await axios.post(`${API_URL}/weighing/add`, datosGuardar);

      // Mensaje de éxito personalizado
      let mensajeExito = "Pesaje guardado exitosamente";
      if (tipoSeguimiento === 'venta' && periodoMeses !== null && gananciaKg !== null && gananciaValor !== null) {
        mensajeExito += `\n\nEn ${periodoMeses} ${periodoMeses === 1 ? 'mes' : 'meses'}, su ganancia de peso fue de ${gananciaKg.toFixed(2)} kg y economica de $${gananciaValor.toFixed(0).toLocaleString('es-CO')}.`;
      }

      Alert.alert("✅ Éxito", mensajeExito);
      resetPesoFields();
      navigation.navigate("ControlScreen", {
        chip,
        shouldRefresh: true,
        nuevoPeso: response.data,
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo guardar el pesaje. Intenta de nuevo.");
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
      if (error.response && error.response.data) {
        Alert.alert(
          "Error",
          error.response.data.error || JSON.stringify(error.response.data)
        );
      } else {
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
      source={require('../assets/acuarela.Home.png')} 
      style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
    >
      <View>
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

        {showMenu && (
          <Animated.View
            style={[
              styles.dropdownMenuLeft,
              { transform: [{ translateX: menuAnim }] },
              { zIndex: 1 },
            ]}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.dropdownItem}>Inicio</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {showUserMenu && (
          <Animated.View
            style={[
              styles.dropdownMenuLeftuser,
              { transform: [{ translateX: userMenuAnim }] },
              { zIndex: 1 },
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
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Image
          source={require("../assets/Imagen_Formulario_Registro_Ganado.png")} 
          style={styles.image}
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

            <DropDownPicker
              open={openTipoSeguimiento}
              setOpen={(open) => {
                setOpenTipoSeguimiento(open);
              }}
              value={tipoSeguimiento}
              items={[
                { label: 'Compra', value: 'compra' },
                { label: 'Venta', value: 'venta' },
                { label: 'Seguimiento', value: 'seguimiento' }
              ]}
              setValue={setTipoSeguimiento}
              placeholder="Tipo de seguimiento*"
              containerStyle={[styles.dropdownContainerPicker, { zIndex: 5000 }]}
              style={styles.dropdownListStyle}
              listMode="SCROLLVIEW"
              dropDownContainerStyle={{ zIndex: 5000 }}
              maxHeight={200}
              onChangeValue={(value) => {
                if (value === 'compra') {
                  setPrecioKgVenta('');
                  setCostoGanadoVenta('');
                } else if (value === 'venta') {
                  setPrecioKgCompra('');
                  setCostoGanadoCompra('');
                } else if (value === 'seguimiento') {
                  setPrecioKgCompra('');
                  setPrecioKgVenta('');
                  setCostoGanadoCompra('');
                  setCostoGanadoVenta('');
                }
              }}
              arrowIconStyle={styles.arrowIconStyle}
            />

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
                source={require("../assets/Peso.png")} 
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

            {tipoSeguimiento === 'compra' && (
              <>
                <View style={styles.inputprecio}>
                  <Image
                    source={require("../assets/precio.png")}
                    style={styles.logo}
                  />
                  <TextInput
                    style={styles.weightInput}
                    placeholder="Precio del Kg Compra*"
                    placeholderTextColor="#000"
                    keyboardType="numeric"
                    value={precioKgCompra}
                    onChangeText={manejarCambioPrecioCompra}
                  />
                </View>

                <Text style={styles.textcosto}>
                  Costo del Ganado Compra: ${precioKgCompra && precioKgCompra !== "" ? 
                    parseInt(costoGanadoCompra).toLocaleString('es-CO') : "0"}
                </Text>
              </>
            )}

            {tipoSeguimiento === 'venta' && (
              <>
                <View style={styles.inputprecio}>
                  <Image
                    source={require("../assets/precio.png")}
                    style={styles.logo}
                  />
                  <TextInput
                    style={styles.weightInput}
                    placeholder="Precio del Kg Venta*"
                    placeholderTextColor="#000"
                    keyboardType="numeric"
                    value={precioKgVenta}
                    onChangeText={manejarCambioPrecioVenta}
                  />
                </View>

                <Text style={styles.textcosto}>
                  Costo del Ganado Venta: ${precioKgVenta && precioKgVenta !== "" ? 
                    parseInt(costoGanadoVenta).toLocaleString('es-CO') : "0"}
                </Text>

                {/* Mostrar cálculos de ganancia en tiempo real */}
                {datosCompra && gananciaKg !== null && gananciaValor !== null && periodoMeses !== null && (
                  <View style={styles.gananciaContainer}>
                    <Text style={styles.gananciaTitle}>📊 Resumen de Ganancia</Text>
                    <Text style={styles.gananciaText}>
                      En {periodoMeses} {periodoMeses === 1 ? 'mes' : 'meses'}, su ganancia fue de {gananciaKg.toFixed(2)} kg y ${gananciaValor.toFixed(0).toLocaleString('es-CO')}.
                    </Text>
                  </View>
                )}

                {/* Advertencia si no hay datos de compra */}
                {!datosCompra && peso && precioKgVenta && fechaPeso && (
                  <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>
                      ⚠️ No se encontró registro de compra. Se requiere un registro previo de compra para calcular la ganancia.
                    </Text>
                  </View>
                )}
              </>
            )}

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
              maxHeight={200} 
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
              maxHeight={200} 
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
                  styles.dropdownContainerUnidad, 
                  open && styles.dropdownBelowUnidad, 
                  errors.unidad && styles.inputError, 
                  { zIndex: 9999 },
                ]}
                listMode="SCROLLVIEW"
                arrowIconStyle={styles.arrowIconStyle}
                onChangeValue={() => setOpen(false)}
                dropDownStyle={{
                  borderWidth: 0, 
                  padding: 0, 
                }}
                style={{
                  borderWidth: 0, 
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
                maxLength={500} 
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
          maximumDate={new Date()} 
        />
      </ScrollView>

      <View style={styles.greenBar}>
        <View style={styles.bottomImageContainer}>
          <TouchableOpacity onPress={navigateToHome}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/Inicio.png")}
                style={styles.imageStyleG}
              />
              <Text style={styles.imageText}>Inicio</Text>
            </View>
          </TouchableOpacity>

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