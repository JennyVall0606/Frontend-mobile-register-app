import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
  Platform,
  Animated,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Button,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/ControlH_styles";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFocusEffect } from "@react-navigation/native";

export default function ControlH_Screen({ navigation, route }) {
  const API_URL = "https://webmobileregister-production.up.railway.app";
  const { chip } = route.params || {};
  const { width, height } = Dimensions.get("window");
  const [animalInfo, setAnimalInfo] = useState(null);
  const [historicoPesaje, setHistoricoPesaje] = useState([]);
  const [historicoVacunas, setHistoricoVacunas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVacuna, setSelectedVacuna] = useState(null);
  const [modalVacunaVisible, setModalVacunaVisible] = useState(false);
  const [nuevaFechaVacuna, setNuevaFechaVacuna] = useState("");
  const [nuevaDosisVacuna, setNuevaDosisVacuna] = useState("");
  const [nuevaObsVacuna, setNuevaObsVacuna] = useState("");
  const [selectedPeso, setSelectedPeso] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoPeso, setNuevoPeso] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [itemsTipoVacuna, setItemsTipoVacuna] = useState([]);
  const [itemsVacunaNombre, setItemsVacunaNombre] = useState([]);
  const [tipoVacuna, setTipoVacuna] = useState(null);
  const [nombreVacuna, setNombreVacuna] = useState(null);
  const [openTipoVacuna, setOpenTipoVacuna] = useState(false);
  const [openNombreVacuna, setOpenNombreVacuna] = useState(false);
  const [showPesoDatePicker, setShowPesoDatePicker] = useState(false);
  const [fechaVacuna, setFechaVacuna] = useState("");
  const [precioKgCompra, setPrecioKgCompra] = useState("");
  const [precioKgVenta, setPrecioKgVenta] = useState("");

  //============================================================================
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
    navigation.navigate("CattleScreen");
  };

  const [openUnidad, setOpenUnidad] = useState(false);
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const [showAllPesos, setShowAllPesos] = useState(false);
  const [showAllVacunas, setShowAllVacunas] = useState(false);

  const [items, setItems] = useState([
    { label: "ml", value: "ml" },
    { label: "cc", value: "cc" },
    { label: "mg", value: "mg" },
    { label: "mg/kg", value: "mg_kg" },
    { label: "ml/kg", value: "ml_kg" },
  ]);

  const scrollViewRef = useRef(null);
  const sectionNuevoControlRef = useRef(null);

  const [showVacunaDatePicker, setShowVacunaDatePicker] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const formatWeight = (weight) => {
    if (!weight) return "";
    const weightNum = parseFloat(weight);
    return weightNum % 1 === 0 ? weightNum.toString() : weightNum.toFixed(2);
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toISOString().substring(0, 10);
  };

  useEffect(() => {
    if (chip) {
      console.log("Chip enviado:", chip);
      axios
        .get(`${API_URL}/register/animal/${encodeURIComponent(chip)}`)
        .then((response) => {
          setAnimalInfo(response.data);
          console.log("Datos del animal recibidos:", response.data);
        })
        .catch((error) => {
          console.error("Error al obtener el animal:", error);
          setAnimalInfo(null);
        });
    }
  }, [chip]);

 useEffect(() => {
  if (selectedPeso) {
    setPrecioKgCompra(selectedPeso.precio_kg_compra || "");
    setPrecioKgVenta(selectedPeso.precio_kg_venta || "");
  }
}, [selectedPeso]);


  useFocusEffect(
    useCallback(() => {
      if (chip) {
        axios
          .get(`${API_URL}/register/animal/${chip}`)
          .then((response) => {
            setAnimalInfo(response.data);
          })
          .catch((error) => {
            console.error("Error al obtener el animal:", error);
            setAnimalInfo(null);
          });
      }
    }, [chip])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const [pesosRes, vacunasRes] = await Promise.all([
            axios.get(`${API_URL}/weighing/historico-pesaje`),

            axios.get(`${API_URL}/vaccines/historico-vacunas`),
          ]);

          console.log("Datos de pesos:", pesosRes.data);

          const pesosFiltrados = pesosRes.data
            .filter((item) => item.chip === chip)
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

          const vacunasFiltradas = vacunasRes.data
            .filter((item) => item.chip === chip)
            .sort(
              (a, b) => new Date(b.fecha_vacuna) - new Date(a.fecha_vacuna)
            );

          setHistoricoPesaje(pesosFiltrados);
          setHistoricoVacunas(vacunasFiltradas);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [chip])
  );

  const registrosPesajeVisibles = showAllPesos
    ? historicoPesaje
    : historicoPesaje.slice(0, 4);
  const registrosVacunasVisibles = showAllVacunas
    ? historicoVacunas
    : historicoVacunas.slice(0, 4);

  const mostrarBotonPesos = historicoPesaje.length > 4;
  const mostrarBotonVacunas = historicoVacunas.length > 4;

  const toggleMostrarPesos = () => setShowAllPesos(!showAllPesos);
  const toggleMostrarVacunas = () => setShowAllVacunas(!showAllVacunas);

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

const handleEditPeso = (id) => {
  const pesoSeleccionado = historicoPesaje.find((item) => item.id === id);

  if (pesoSeleccionado) {
    setSelectedPeso(pesoSeleccionado);
    setNuevoPeso(pesoSeleccionado.peso?.toString() || "");
    setNuevaFecha(pesoSeleccionado.fecha?.substring(0, 10) || "");

    // 👇 Importante: si no existen, dejar vacío
    setPrecioKgCompra(pesoSeleccionado.precio_kg_compra?.toString() || "");
    setPrecioKgVenta(pesoSeleccionado.precio_kg_venta?.toString() || "");

    setModalVisible(true);
  }
};



const handleGuardarCambiosPeso = async () => {
  try {
    const pesoNum = parseFloat(nuevoPeso) || 0;
    const compraNum = precioKgCompra ? parseFloat(precioKgCompra) : null;
    const ventaNum = precioKgVenta ? parseFloat(precioKgVenta) : null;

    const payload = {
      fecha_pesaje: nuevaFecha.split("T")[0],
      peso_kg: pesoNum,
      precio_kg_compra: compraNum,
      precio_kg_venta: ventaNum,
      costo_compra: compraNum !== null ? pesoNum * compraNum : null,
      costo_venta: ventaNum !== null ? pesoNum * ventaNum : null,
    };

    await axios.put(`${API_URL}/weighing/${selectedPeso.id}`, payload);

    // 🔧 CORRECCIÓN: Actualizar TODOS los campos en el estado local
    const updatedPesos = historicoPesaje.map((p) =>
      p.id === selectedPeso.id
        ? {
            ...p,
            peso: payload.peso_kg,
            fecha: payload.fecha_pesaje,
            precio_kg_compra: payload.precio_kg_compra, // ← Agregar estos campos
            precio_kg_venta: payload.precio_kg_venta,   // ← Agregar estos campos
            costo_compra: payload.costo_compra,
            costo_venta: payload.costo_venta,
          }
        : p
    );

    setHistoricoPesaje(updatedPesos);
    setModalVisible(false);
    alert("Peso actualizado");
  } catch (error) {
    if (error.response) {
      console.log("Detalles del error:", error.response.data);
      alert(`Error: ${error.response.data.error || "Datos inválidos"}`);
    } else {
      console.error("Error de red:", error);
      alert("Error de conexión");
    }
  }
};

  const handleEditVacuna = (id) => {
    const vac = historicoVacunas.find((item) => item.id === id);
    if (!vac) return;

    setSelectedVacuna(vac);
    setNuevaFechaVacuna(vac.fecha.slice(0, 10));

    setNuevaObsVacuna(vac.obs || "");

    const dosisParts = vac.dosis.split(" ");
    setNuevaDosisVacuna(dosisParts[0]);
    setUnidad(dosisParts[1] || "");

    const tipoItem = itemsTipoVacuna.find((i) => i.label === vac.tipo);
    if (tipoItem) setTipoVacuna(tipoItem.value);

    const nombreItem = itemsVacunaNombre.find((i) => i.label === vac.nombre);
    if (nombreItem) setNombreVacuna(nombreItem.value);

    setModalVacunaVisible(true);
  };

  const handleGuardarCambiosVacuna = async () => {
    const dosisFinal = `${nuevaDosisVacuna} ${unidad}`;

    const datosParaApi = {
      fecha_vacuna: nuevaFechaVacuna.split("T")[0],
      tipo_vacunas_id_tipo_vacuna: tipoVacuna,
      nombre_vacunas_id_vacuna: nombreVacuna,
      dosis_administrada: dosisFinal,
      observaciones: nuevaObsVacuna,
    };

    await axios.put(`${API_URL}/vaccines/${selectedVacuna.id}`, datosParaApi);

    setHistoricoVacunas(
      historicoVacunas.map((v) => {
        if (v.id !== selectedVacuna.id) return v;
        const tipoLabel = itemsTipoVacuna.find(
          (i) => i.value === tipoVacuna
        )?.label;
        const nombreLabel = itemsVacunaNombre.find(
          (i) => i.value === nombreVacuna
        )?.label;
        return {
          ...v,
          fecha: datosParaApi.fecha_vacuna,
          tipo: tipoLabel || v.tipo,
          nombre: nombreLabel || v.nombre,
          dosis: dosisFinal,
          observaciones: datosParaApi.observaciones,
          obs: datosParaApi.observaciones,
        };
      })
    );

    setModalVacunaVisible(false);
    alert("Vacuna actualizada");
  };

  const handleFechaConfirm = (date, type) => {
    const today = new Date().toISOString().split("T")[0];
    const selectedDate = date.toISOString().split("T")[0];

    if (selectedDate > today) {
      Alert.alert("Fecha inválida", "No puedes seleccionar una fecha futura.");
      return;
    }

    if (type === "peso") {
      setNuevaFecha(selectedDate);
    } else if (type === "vacuna") {
      setNuevaFechaVacuna(selectedDate);
    }
    setShowPesoDatePicker(false);
    setShowVacunaDatePicker(false);
  };

  if (loading) {
    return (
      <View style={styles.containerloading}>
        <ActivityIndicator size="large" color="rgb(52, 112, 24)" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/acuarela.Home.png")}
      style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
    >
      <View>
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
              { zIndex: 1 },
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
        <View style={styles.buttonsContainer}></View>

        {animalInfo && animalInfo.foto && (
          <Image
            source={require("../assets/Imagen_Control_De_Chip.png")}
            style={styles.image}
          />
        )}

        <Text style={styles.title}>CONTROL</Text>
        <Text style={styles.title1}>DE CHIP</Text>

        <View style={styles.card}>
          <View style={styles.tableRow}>
            <Image source={require("../assets/Chip.png")} style={styles.logo} />
            <Text style={styles.tableCellChip}>Chip:</Text>
            <Text style={styles.tableCellDatoChip}>
              {animalInfo?.chip_animal ||
                "No se encontró información del animal"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Image source={require("../assets/Raza.png")} style={styles.logo} />
            <Text style={styles.tableCellChip}>Raza:</Text>
            <Text style={styles.tableCellDatoChip}>
              {animalInfo?.raza || "No especificado"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Image
              source={require("../assets/FechaDeNacimieto.png")}
              style={styles.logo}
            />
            <Text style={styles.tableCellChip}>Fecha Nacimiento:</Text>
            <Text style={styles.tableCellDatoChip}>
              {animalInfo?.fecha_nacimiento
                ? formatDate(animalInfo.fecha_nacimiento)
                : ""}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Image source={require("../assets/Peso.png")} style={styles.logo} />
            <Text style={styles.tableCellChip}>Peso Nacimiento:</Text>
            <Text style={styles.tableCellDatoChip}>
              {animalInfo?.peso_nacimiento
                ? formatWeight(animalInfo.peso_nacimiento)
                : ""}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Image
              source={require("../assets/Enfermedades.png")}
              style={styles.logo}
            />
            <Text style={styles.tableCellChip}>Enfermedades:</Text>
            <Text style={styles.tableCellDatoChip}>
              {Array.isArray(animalInfo?.enfermedades)
                ? animalInfo.enfermedades.join(", ")
                : animalInfo?.enfermedades}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Image
              source={require("../assets/procedencia.png")}
              style={styles.logo}
            />
            <Text style={styles.tableCellChip}>Procedencia:</Text>
            <Text style={styles.tableCellDatoChip}>
              {animalInfo?.procedencia || "No disponible"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Image
              source={require("../assets/hierro.png")}
              style={styles.logo}
            />
            <Text style={styles.tableCellChip}>Hierro del propietario:</Text>
            <Text style={styles.tableCellDatoChip}>
              {animalInfo?.hierro || "No disponible"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Image
              source={require("../assets/hierro.png")}
              style={styles.logo}
            />
            <Text style={styles.tableCellChip}>Categoría:</Text>
            <Text style={styles.tableCellDatoChip}>
              {animalInfo?.categoria || "No disponible"}
            </Text>
          </View>
          {animalInfo?.categoria === "cria" && (
            <>
              <View style={styles.tableRow}>
                <Image
                  source={require("../assets/hierro.png")}
                  style={styles.logo}
                />

                <Text style={styles.tableCellChip}>Número de Parto:</Text>
                <Text style={styles.tableCellDatoChip}>
                  {animalInfo?.numero_parto || "No disponible"}
                </Text>
              </View>

              <View style={styles.tableRow}>
                <Image
                  source={require("../assets/hierro.png")}
                  style={styles.logo}
                />
                <Text style={styles.tableCellChip}>Precocidad:</Text>
                <Text style={styles.tableCellDatoChip}>
                  {animalInfo?.precocidad || "No disponible"}
                </Text>
              </View>

              <View style={styles.tableRow}>
                <Image
                  source={require("../assets/hierro.png")}
                  style={styles.logo}
                />
                <Text style={styles.tableCellChip}>Tipo de monta:</Text>
                <Text style={styles.tableCellDatoChip}>
                  {animalInfo?.tipo_monta || "No disponible"}
                </Text>
              </View>
            </>
          )}

          <View style={styles.tableRow}>
            <Image
              source={require("../assets/Id_Madre.png")}
              style={styles.logoId}
            />
            <Text style={styles.tableCellChip}>ID Madre:</Text>
            <Text style={styles.tableCellDatoChip}>{animalInfo?.id_madre}</Text>
          </View>
          <View style={styles.tableRow}>
            <Image
              source={require("../assets/Id_Padre.png")}
              style={styles.logoId}
            />
            <Text style={styles.tableCellChip}>ID Padre:</Text>
            <Text style={styles.tableCellDatoChip}>{animalInfo?.id_padre}</Text>
          </View>
          <View style={styles.tableRow}>
            <Image
              source={require("../assets/Observaciones.png")}
              style={styles.logoObs}
            />
            <Text style={styles.tableCellChip}>Observaciones:</Text>
            <Text style={styles.tableCellDatoChip}>
              {animalInfo?.observaciones}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Image
              source={require("../assets/Estado.png")}
              style={styles.logo}
            />
            <Text style={styles.tableCellChip}>Estado:</Text>
            <Text style={styles.tableCellDatoChip}>{animalInfo?.estado}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              console.log("Pasando razaId:", animalInfo.raza);
              navigation.navigate("RegisterCattle", {
                chip: animalInfo.chip_animal,
                razaId: animalInfo.raza,
                isEditing: true,
              });
            }}
          >
            <View style={styles.containerEditChip}>
              <Image
                source={require("../assets/Editar_Chip.png")}
                style={styles.logoEditarChip}
              />
              <Text style={styles.editTextEditar}>EDITAR CHIP</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* TABLA DE PESO */}

        <View style={styles.containerPesos}>
          <Image
            source={require("../assets/Imagen_Pesos_Registrados.png")}
            style={styles.imagePesoVacuna}
          />
          <View style={styles.section}>
            <Text style={styles.subtitle1}>PESOS</Text>
            <Text style={styles.subtitle2}>REGISTRADOS</Text>
          </View>
        </View>

        {registrosPesajeVisibles.length > 0 ? (
          <View style={styles.tablePesoVacuna}>
            <View style={styles.tableHeaderPesoVacuna}>
              <Text style={styles.tableHeaderTextPeso}>Fecha</Text>
              <Text style={styles.tableHeaderTextPeso}>Peso</Text>
              <Text style={styles.tableHeaderTextPeso}>Costo Compra</Text>
              <Text style={styles.tableHeaderTextPeso}>Costo Venta</Text>
              <Image
                source={require("../assets/Peso.png")}
                style={styles.editButtonImagePeso1}
              />
            </View>

            {registrosPesajeVisibles.map((peso, index) => (
              <View key={index} style={styles.tableRowPeso}>
                <Text style={styles.tableCellPeso}>
                  {peso.fecha ? peso.fecha.substring(0, 10) : ""}
                </Text>
                <Text style={styles.tableCellPeso}>
                  {peso.peso ? parseInt(peso.peso) : "No disponible"}
                </Text>

                <Text style={styles.tableCellPeso}>
                  {peso.costo_compra
                    ? `$${parseFloat(peso.costo_compra).toLocaleString(
                        "es-CO",
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }
                      )}`
                    : "No disponible"}
                </Text>

                <Text style={styles.tableCellPeso}>
                  {peso.costo_venta
                    ? `$${parseFloat(peso.costo_venta).toLocaleString("es-CO", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}`
                    : "No disponible"}
                </Text>

                <TouchableOpacity
                  onPress={() => handleEditPeso(peso.id)}
                  style={styles.editCell}
                >
                  <Image
                    source={require("../assets/Editar_Peso.png")}
                    style={styles.editButtonImagePeso2}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noRecordsText}>
            No se encontraron registros de peso.
          </Text>
        )}
        {mostrarBotonPesos && (
          <TouchableOpacity onPress={toggleMostrarPesos} style={styles.button}>
            <Text style={styles.link}>
              {showAllPesos ? "-  Ver menos" : "+  Ver más"}
            </Text>
          </TouchableOpacity>
        )}

        {/* EDITAR PESO */}

<Modal visible={modalVisible} transparent animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Image
        source={require("../assets/Editar_Peso.png")}
        style={styles.modalImagePeso}
      />
      <Text style={styles.modalTitle1}>Editar</Text>
      <Text style={styles.modalTitle2}>Peso</Text>

      {/* Peso */}
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/Peso.png")}
          style={styles.inputLogo}
        />
    <TextInput
  value={nuevoPeso ? String(parseInt(nuevoPeso)) : ""}
  onChangeText={(text) => setNuevoPeso(text.replace(/[^0-9]/g, ""))}
  placeholder="Peso"
  keyboardType="numeric"
  style={styles.input}
/>
      </View>

      {/* Fecha */}
      <Pressable
        onPress={() => setShowPesoDatePicker(true)}
        style={styles.inputContainer}
      >
        <Image
          source={require("../assets/FechaDeNacimieto.png")}
          style={styles.inputLogo}
        />
        <TextInput
          value={formatDateDisplay(nuevaFecha)}
          placeholder="Fecha (YYYY-MM-DD)"
          style={styles.input}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>

      {/* Precio Kg Compra */}
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/Obs.png")}
          style={styles.inputLogo}
        />
        <TextInput
  placeholder="Precio Kg Compra"
  placeholderTextColor="#000"
  keyboardType="numeric"
  value={precioKgCompra ? parseInt(precioKgCompra).toLocaleString("es-CO") : ""}
  onChangeText={(text) => {
    const numericValue = text.replace(/\D/g, ""); // elimina todo lo que no sea número
    setPrecioKgCompra(numericValue);
  }}
  style={styles.input}
/>
      </View>

      {/* Mostrar costo compra */}
   <Text style={styles.textcosto}>
  Costo del ganado Compra: $
  {nuevoPeso && precioKgCompra
    ? (parseFloat(nuevoPeso) * parseFloat(precioKgCompra)).toLocaleString("es-CO")
    : 0}
</Text>

      {/* Precio Kg Venta */}
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/Obs.png")}
          style={styles.inputLogo}
        />
      <TextInput
  placeholder="Precio Kg Venta"
  placeholderTextColor="#000"
  keyboardType="numeric"
  value={precioKgVenta ? parseInt(precioKgVenta).toLocaleString("es-CO") : ""}
  onChangeText={(text) => {
    const numericValue = text.replace(/\D/g, ""); // elimina caracteres no numéricos
    setPrecioKgVenta(numericValue);
  }}
  style={styles.input}
/>
      </View>

      {/* Mostrar costo venta */}
<Text style={styles.textcosto}>
  Costo del ganado Venta: $
  {nuevoPeso && precioKgVenta
    ? (parseFloat(nuevoPeso) * parseFloat(precioKgVenta)).toLocaleString("es-CO")
    : 0}
</Text>

      {/* DatePicker */}
      <DateTimePickerModal
        isVisible={showPesoDatePicker}
        mode="date"
        date={nuevaFecha ? new Date(nuevaFecha) : new Date()}
        onConfirm={(date) => handleFechaConfirm(date, "peso")}
        themeVariant="light"
        onCancel={() => setShowPesoDatePicker(false)}
        maximumDate={new Date()}
      />

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonCancelarPeso}
          onPress={() => setModalVisible(false)}
        >
          <Image
            source={require("../assets/FechaDeNacimieto.png")}
            style={styles.buttonLogo}
          />
          <Text style={styles.buttonText}>CANCELAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonGuardarPeso}
          onPress={() =>
            handleGuardarCambiosPeso({
              nuevoPeso,
              nuevaFecha,
              precioKgCompra,
              precioKgVenta,
            })
          }
        >
          <Image
            source={require("../assets/FechaDeNacimieto.png")}
            style={styles.buttonLogo}
          />
          <Text style={styles.buttonText}>GUARDAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>


        {/* TABLA DE VACUNAS */}

        <View style={styles.container}>
          <Image
            source={require("../assets/Imagen_Vacunas_Registradas.png")}
            style={styles.imagePesoVacuna}
          />
          <View style={styles.section}>
            <Text style={styles.subtitle1}>VACUNAS</Text>
            <Text style={styles.subtitle2}>REGISTRADAS</Text>
          </View>
        </View>

        {registrosVacunasVisibles.length > 0 ? (
          <View style={styles.tablePesoVacuna}>
            <View style={styles.tableHeaderPesoVacuna}>
              <Text style={styles.tableHeaderTextVacuna}>Fecha</Text>
              <Text style={styles.tableHeaderTextVacuna}>Nombre</Text>
              <Text style={styles.tableHeaderTextVacuna}>Tipo</Text>
              <Text style={styles.tableHeaderTextVacuna}>Dosis</Text>
              <Text style={styles.tableHeaderTextVacuna}>Obs</Text>

              <Image
                source={require("../assets/Vacuna.png")}
                style={styles.editButtonImageVacuna1}
              />
            </View>
            {registrosVacunasVisibles.map((vacuna, index) => (
              <View key={index} style={styles.tableRowVacuna}>
                <Text style={styles.tableCellFechaVacuna}>
                  {vacuna.fecha ? vacuna.fecha.substring(0, 10) : ""}
                </Text>
                <Text style={styles.tableCellDatosVacunaNombre}>
                  {vacuna.nombre}
                </Text>
                <Text style={styles.tableCellDatosVacunaTipo}>
                  {vacuna.tipo}
                </Text>
                <Text style={styles.tableCellDatosVacunaDosis}>
                  {vacuna.dosis}
                </Text>
                <Text style={styles.tableCellDatosVacunaObs}>
                  {vacuna.obs || "No disponible"}
                </Text>
                <TouchableOpacity
                  onPress={() => handleEditVacuna(vacuna.id)}
                  style={styles.editCellVacuna}
                >
                  <Image
                    source={require("../assets/Editar_Vacunas.png")}
                    style={styles.editButtonImageVacuna2}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noRecordsText}>
            No se encontraron registros de vacunas.
          </Text>
        )}

        {mostrarBotonVacunas && (
          <TouchableOpacity
            onPress={toggleMostrarVacunas}
            style={styles.button}
          >
            <Text style={styles.link}>
              {showAllVacunas ? "-  Ver menos" : "+  Ver más"}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.newControlButton}
          onPress={() => navigation.navigate("FormScreen", { chip })}
        >
          <View ref={sectionNuevoControlRef} style={styles.section}>
            <Text style={styles.newControlButtonText}>REALIZA UN </Text>
            <Text style={styles.newControlButtonText}>NUEVO CONTROL</Text>
          </View>
        </TouchableOpacity>

        {/* EDITAR VACUNAS */}

        <Modal visible={modalVacunaVisible} transparent animationType="slide">
          <View style={styles.modalContainerVacuna}>
            <View style={styles.modalContentVacuna}>
              {/* Imagen del encabezado */}
              <Image
                source={require("../assets/Editar_Vacunas.png")}
                style={styles.modalImageVacuna}
              />
              <Text style={styles.modalTitle1}>EDITAR</Text>
              <Text style={styles.modalTitle2}>VACUNA</Text>
              {/* Selección de tipo de vacuna */}
              <View style={styles.datePickerWrapper}>
                <Image
                  source={require("../assets/CC.png")}
                  style={styles.datePickerLogoCC}
                />
                <DropDownPicker
                  open={openTipoVacuna}
                  value={tipoVacuna}
                  items={itemsTipoVacuna}
                  setOpen={setOpenTipoVacuna}
                  setValue={setTipoVacuna}
                  placeholder="Tipo de vacuna"
                  containerStyle={[
                    styles.dropdownContainerVacuna,
                    openTipoVacuna && styles.dropdownBelowVacuna,
                  ]}
                  listMode="SCROLLVIEW"
                  style={styles.dropdownStyle}
                  dropDownStyle={[styles.dropDownStyle, { maxHeight: 50 }]}
                  dropDownContainerStyle={{
                    width: "90%",
                    marginLeft: "1%",
                    marginTop: "-25",
                    zIndex: 9999,
                    elevation: 20,
                    maxHeight: 152,
                    minHeight: 100,
                    borderWidth: 1,
                    borderColor: "#060606ff",
                  }}
                  arrowIconStyle={styles.arrowIconStyle}
                  textStyle={styles.textStyle}
                />
              </View>

              <Pressable
                onPress={() => setShowVacunaDatePicker(true)}
                style={styles.inputContainerVacuna}
              >
                <Image
                  source={require("../assets/FechaDeNacimieto.png")}
                  style={styles.datePickerLogo}
                />
                <TextInput
                  value={formatDateDisplay(nuevaFechaVacuna)}
                  placeholder="YYYY-MM-DD"
                  style={styles.inputVacunaFecha}
                  editable={false}
                  pointerEvents="none"
                />
              </Pressable>

              {/* Selección de nombre de vacuna */}
              <View style={styles.datePickerWrapper}>
                <Image
                  source={require("../assets/Nombre.png")}
                  style={styles.datePickerLogo}
                />
                <DropDownPicker
                  open={openNombreVacuna}
                  value={nombreVacuna}
                  items={itemsVacunaNombre}
                  setOpen={setOpenNombreVacuna}
                  setValue={setNombreVacuna}
                  placeholder="Nombre de vacuna"
                  containerStyle={[
                    styles.dropdownContainerVacuna,
                    openNombreVacuna && styles.dropdownBelowVacuna,
                  ]}
                  listMode="SCROLLVIEW"
                  style={styles.dropdownStyle}
                  dropDownStyle={styles.dropdownStyle}
                  dropDownContainerStyle={{
                    width: "90%",
                    marginLeft: "1%",
                    marginTop: "-25",
                    zIndex: 9999,
                    elevation: 20,
                    maxHeight: 132,
                    minHeight: 100,
                    borderWidth: 1,
                    borderColor: "#060606ff",
                  }}
                  arrowIconStyle={styles.arrowIconStyle}
                  textStyle={styles.textStyle}
                />
              </View>

              {/* Dosis */}
              <View style={styles.row}>
                <View style={[styles.inputDosisContainer]}>
                  <Image
                    source={require("../assets/Vacuna.png")}
                    style={styles.dropdownLogo}
                  />
                  <TextInput
                    style={[styles.inputDosis]}
                    value={nuevaDosisVacuna}
                    onChangeText={setNuevaDosisVacuna}
                    placeholder="Dosis*"
                    placeholderTextColor="#000"
                    keyboardType="numeric"
                  />
                </View>

                {/* Unidad */}
                <DropDownPicker
                  open={openUnidad}
                  value={unidad}
                  items={items}
                  setOpen={setOpenUnidad}
                  setValue={setUnidad}
                  setItems={setItems}
                  placeholder="Unidad*"
                  containerStyle={[
                    styles.dropdownContainerUnidad,
                    openUnidad && styles.dropdownBelowUnidad,
                    { zIndex: 10001 },
                  ]}
                  listMode="SCROLLVIEW"
                  arrowIconStyle={styles.arrowIconStyle}
                  onChangeValue={() => setOpenUnidad(false)}
                  dropDownStyle={{
                    borderWidth: 0,
                    padding: 0,
                    position: "absolute",
                    zIndex: 100010,
                    top: 0,
                  }}
                  style={{
                    borderWidth: 0,
                  }}
                />
              </View>

              {/* Campo Observaciones */}
              <View style={styles.inputContainerVacuna}>
                <Image
                  source={require("../assets/Obs.png")}
                  style={styles.datePickerLogo}
                />
                <TextInput
                  value={nuevaObsVacuna}
                  onChangeText={setNuevaObsVacuna}
                  placeholder="Observaciones"
                  style={styles.inputVacuna}
                />
              </View>

              {/* Botones para cancelar y guardar */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.buttonCancelarVacuna}
                  onPress={() => setModalVacunaVisible(false)}
                >
                  <Image
                    source={require("../assets/FechaDeNacimieto.png")}
                    style={styles.buttonLogo}
                  />
                  <Text style={styles.buttonText}>CANCELAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonGuardarVacuna}
                  onPress={handleGuardarCambiosVacuna}
                >
                  <Image
                    source={require("../assets/FechaDeNacimieto.png")}
                    style={styles.buttonLogo}
                  />
                  <Text style={styles.buttonText}>GUARDAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>

      {/* Barra inferior */}
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
