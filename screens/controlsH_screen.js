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
  const [fechaVacuna, setFechaVacuna] = useState(""); // Aquí declaras el estado y la función para actualizarlo

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
    navigation.navigate("CattleScreen");
  };
  //========================================================================

  const [openUnidad, setOpenUnidad] = useState(false);
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState(""); // Para almacenar la unidad seleccionada
  const [showAllPesos, setShowAllPesos] = useState(false); // Estado para mostrar más/menos pesos
  const [showAllVacunas, setShowAllVacunas] = useState(false); // Estado para mostrar más/menos vacunas

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

  // Función para formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  // Función para formatear peso
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
      console.log("Chip enviado:", chip); // Verificar el valor del chip
      axios
        .get(`${API_URL}/register/animal/${encodeURIComponent(chip)}`)
        .then((response) => {
          setAnimalInfo(response.data);
          console.log("Datos del animal recibidos:", response.data); // Aquí verificamos los datos del animal
        })
        .catch((error) => {
          console.error("Error al obtener el animal:", error);
          setAnimalInfo(null);
        });
    }
  }, [chip]);

  useFocusEffect(
    useCallback(() => {
      if (chip) {
        axios
          .get(`${API_URL}/register/animal/${chip}`)
          .then((response) => {
            setAnimalInfo(response.data);
            // ...otros logs si quieres
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
      setNuevoPeso(pesoSeleccionado.peso.toString());
      setNuevaFecha(pesoSeleccionado.fecha.substring(0, 10));
      setModalVisible(true);
    }
  };

  const handleGuardarCambiosPeso = async () => {
    try {
      const payload = {
        fecha_pesaje: nuevaFecha.split("T")[0],
        peso_kg: parseFloat(nuevoPeso),
      };

      await axios.put(`${API_URL}/weighing/${selectedPeso.id}`, payload);

      const updatedPesos = historicoPesaje.map((p) =>
        p.id === selectedPeso.id
          ? {
              ...p,
              peso: payload.peso_kg,
              fecha: payload.fecha_pesaje,
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
    setNuevaDosisVacuna(dosisParts[0]); // Set the dosis value separately
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
          observaciones: datosParaApi.observaciones, // <- El campo correcto
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
      source={require("../assets/acuarela.Home.png")} // Usa la ruta relativa correcta
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
        <View style={styles.buttonsContainer}></View>

        {animalInfo && animalInfo.foto && (
          <Image
            source={require("../assets/Imagen_Control_De_Chip.png")} // Ruta de tu logo
            style={styles.image}
          />
        )}

        {/* {animalInfo && animalInfo.foto && (
          <Image
  source={{
    uri: `${API_URL}/uploads/${animalInfo.foto}`,
  }}
  style={styles.image}
/>
        )} */}

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
                <Text style={styles.tableCellPeso}>{peso.peso}</Text>
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
                source={require("../assets/Editar_Peso.png")} // Reemplaza con la ruta de tu imagen
                style={styles.modalImagePeso} // Aplica estilos para ajustar el tamaño de la imagen
              />
              <Text style={styles.modalTitle1}>Editar</Text>
              <Text style={styles.modalTitle2}>Peso</Text>
              <View style={styles.inputContainer}>
                <Image
                  source={require("../assets/Peso.png")} // Reemplaza con la ruta de tu logo
                  style={styles.inputLogo} // Aplica estilo para el logo
                />
                <TextInput
                  value={nuevoPeso}
                  onChangeText={setNuevoPeso}
                  placeholder="Peso"
                  keyboardType="numeric"
                  style={styles.input} // Estilo para el TextInput
                />
              </View>
              <Pressable
                onPress={() => setShowPesoDatePicker(true)}
                style={styles.inputContainer}
              >
                <Image
                  source={require("../assets/FechaDeNacimieto.png")} // Reemplaza con la ruta de tu logo
                  style={styles.inputLogo} // Aplica estilo para el logo
                />
                <TextInput
                  value={formatDateDisplay(nuevaFecha)}
                  placeholder="Fecha (YYYY-MM-DD)"
                  style={styles.input} // Estilo para el TextInput
                  editable={false}
                  pointerEvents="none"
                />
              </Pressable>

              <DateTimePickerModal
                isVisible={showPesoDatePicker}
                mode="date"
                date={nuevaFecha ? new Date(nuevaFecha) : new Date()}
                onConfirm={(date) => handleFechaConfirm(date, "peso")}
                themeVariant="light"
                onCancel={() => setShowPesoDatePicker(false)}
                maximumDate={new Date()} // Deshabilita fechas futuras
              />
              <View style={styles.buttonsContainer}>
                {/* Botón Cancelar */}
                <TouchableOpacity
                  style={styles.buttonCancelarPeso}
                  onPress={() => setModalVisible(false)}
                >
                  <Image
                    source={require("../assets/FechaDeNacimieto.png")} // Reemplaza con la ruta de tu logo
                    style={styles.buttonLogo}
                  />
                  <Text style={styles.buttonText}>CANCELAR</Text>
                </TouchableOpacity>

                {/* Botón Guardar Cambios */}
                <TouchableOpacity
                  style={styles.buttonGuardarPeso}
                  onPress={handleGuardarCambiosPeso}
                >
                  <Image
                    source={require("../assets/FechaDeNacimieto.png")} // Reemplaza con la ruta de tu logo
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
          {/* Imagen encima del texto */}
          <Image
            source={require("../assets/Imagen_Vacunas_Registradas.png")} // Reemplaza con la ruta de tu imagen
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
                source={require("../assets/Vacuna.png")} // Ajusta la ruta de tu imagen de lápiz
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
                    source={require("../assets/Editar_Vacunas.png")} // Ajusta la ruta de tu imagen de lápiz
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
                    width: "90%", // Aplica el mismo ancho al contenedor de las opciones
                    marginLeft: "1%", 
                     marginTop: "-25",// Asegura que el contenedor no llegue al borde
                    zIndex: 9999, // Asegura que el dropdown se muestre por encima de otros elementos
                    elevation: 20, // Eleva el dropdown
                    maxHeight: 152, // Limita la altura del listado (aplica scroll si la lista es mayor a esta altura)
                    minHeight: 100,
                     borderWidth: 1,  // Define el grosor del borde
    borderColor: '#060606ff',
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
                  source={require("../assets/FechaDeNacimieto.png")} // Reemplaza con la ruta de tu logo
                  style={styles.datePickerLogo} // Aplica estilo para el logo
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
                    width: "90%", // Aplica el mismo ancho al contenedor de las opciones
                    marginLeft: "1%", 
                     marginTop: "-25",// Asegura que el contenedor no llegue al borde
                    zIndex: 9999, // Asegura que el dropdown se muestre por encima de otros elementos
                    elevation: 20, // Eleva el dropdown
                    maxHeight: 132, // Limita la altura del listado (aplica scroll si la lista es mayor a esta altura)
                    minHeight: 100,
                     borderWidth: 1,  // Define el grosor del borde
    borderColor: '#060606ff',
                  }}
                  arrowIconStyle={styles.arrowIconStyle}
                  textStyle={styles.textStyle}
                />
              </View>

  {/* Dosis */}
             <View style={styles.row}>
                {/* Dosis */}
                <View style={[styles.inputDosisContainer]}>
                  <Image
                    source={require("../assets/Vacuna.png")}
                    style={styles.dropdownLogo}
                  />
                  <TextInput
                    style={[styles.inputDosis]}
                    value={nuevaDosisVacuna} // Mostramos la dosis aquí
                    onChangeText={setNuevaDosisVacuna}
                    placeholder="Dosis*"
                    placeholderTextColor="#000"
                    keyboardType="numeric"
                  />
                </View>

                {/* Unidad */}
                <DropDownPicker
                  open={openUnidad}
                  value={unidad} // Mostramos la unidad aquí
                  items={items} // Las opciones disponibles para la unidad
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
                    position: "absolute", // Coloca el dropdown encima de los demás elementos
                    zIndex: 100010,
                    top: 0, // Establece un zIndex más alto para asegurarse de que quede encima
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
                {/* Botón Cancelar */}
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

                {/* Botón Guardar Cambios */}
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
