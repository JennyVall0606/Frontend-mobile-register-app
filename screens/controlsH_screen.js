import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Platform,
  Pressable,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../components/layout";
import { styles } from "../styles/ControlH_styles";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFocusEffect } from "@react-navigation/native";

export default function ControlH_Screen({ navigation, route }) {
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
  const [showVacunaDatePicker, setShowVacunaDatePicker] = useState(false);
  const API_URL = "http://192.168.1.10:3000";

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
    if (route.params?.nuevaVacuna) {
      setHistoricoVacunas((prev) => [route.params.nuevaVacuna, ...prev]);
    }
  }, [route.params]);

  useEffect(() => {
    if (chip) {
      axios
        .get(`${API_URL}/register/animal/${chip}`)
        .then((response) => {
          setAnimalInfo(response.data);
          console.log("Datos del animal recibidos:", response.data); // Aquí verificamos los datos del animal

          // Aseguramos que raza_id_raza se pase correctamente
          if (response.data.raza_id_raza) {
            console.log("raza_id_raza:", response.data.raza_id_raza); // Verificamos el valor de raza_id_raza
          }
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
    setNuevaDosisVacuna(vac.dosis);
    setNuevaObsVacuna(vac.obs || "");

    const tipoItem = itemsTipoVacuna.find((i) => i.label === vac.tipo);
    if (tipoItem) setTipoVacuna(tipoItem.value);

    const nombreItem = itemsVacunaNombre.find((i) => i.label === vac.nombre);
    if (nombreItem) setNombreVacuna(nombreItem.value);

    setModalVacunaVisible(true);
  };

  const handleGuardarCambiosVacuna = async () => {
    const datosParaApi = {
      fecha_vacuna: nuevaFechaVacuna.split("T")[0],
      tipo_vacunas_id_tipo_vacuna: tipoVacuna,
      nombre_vacunas_id_vacuna: nombreVacuna,
      dosis_administrada: nuevaDosisVacuna,
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
          dosis: datosParaApi.dosis_administrada,
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

  return (
    <Layout>
      <ScrollView style={[styles.container, { width, height }]}>
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
         
            <Image
              source={require("../assets/Chip.png")} 
              style={styles.logo}
            />
            <Text style={styles.tableCellChip}>Chip:</Text>
            <Text style={styles.tableCellDatoChip}>
              {animalInfo?.chip_animal ||
                "No se encontró información del animal"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Image
              source={require("../assets/Raza.png")} 
              style={styles.logo}
            />
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
            <Image
              source={require("../assets/Peso.png")} 
              style={styles.logo}
            />
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


        <View style={styles.container}>
  
          <Image
            source={require("../assets/Imagen_Pesos_Registrados.png")} 
            style={styles.imagePesoVacuna}
          />
          <Text style={styles.subtitle1}>PESOS</Text>
          <Text style={styles.subtitle2}>REGISTRADOS</Text>
        </View>

        {historicoPesaje.length > 0 ? (
          <View style={styles.tablePesoVacuna}>
            <View style={styles.tableHeaderPesoVacuna}>
              
              <Text style={styles.tableHeaderTextPeso}>Fecha</Text>
              <Text style={styles.tableHeaderTextPeso}>Peso</Text>
             <Image 
  source={require('../assets/Peso.png')} 
  style={styles.editButtonImagePeso1}
/>
            </View>

            {historicoPesaje.map((peso, index) => (
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
  source={require('../assets/Editar_Peso.png')} 
  style={styles.editButtonImagePeso2}
/>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noRecordsText}>No se encontraron registros de peso.</Text>
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
          <Text style={styles.subtitle1}>VACUNAS</Text>
          <Text style={styles.subtitle2}>REGISTRADAS</Text>
        </View>






        {historicoVacunas.length > 0 ? (
          <View style={styles.tablePesoVacuna}>
            <View style={styles.tableHeaderPesoVacuna}>


              <Text style={styles.tableHeaderTextVacuna}>Fecha</Text>
              <Text style={styles.tableHeaderTextVacuna}>Nombre</Text>
              <Text style={styles.tableHeaderTextVacuna}>Tipo</Text>
              <Text style={styles.tableHeaderTextVacuna}>Dosis</Text>
              <Text style={styles.tableHeaderTextVacuna}>Obs</Text>

             <Image 
  source={require('../assets/Vacuna.png')} // Ajusta la ruta de tu imagen de lápiz
  style={styles.editButtonImageVacuna1}
/>

            </View>
            {historicoVacunas.map((vacuna, index) => (
              <View key={index} style={styles.tableRowVacuna}>
                <Text style={styles.tableCellFechaVacuna}>
                  {vacuna.fecha ? vacuna.fecha.substring(0, 10) : ""}
                </Text>
                <Text style={styles.tableCellDatosVacunaNombre}>{vacuna.nombre}</Text>
                <Text style={styles.tableCellDatosVacunaTipo}>{vacuna.tipo}</Text>
                <Text style={styles.tableCellDatosVacunaDosis}>{vacuna.dosis}</Text>
                <Text style={styles.tableCellDatosVacunaObs}>
                  {vacuna.obs || "No disponible"}
                </Text>
                <TouchableOpacity
                  onPress={() => handleEditVacuna(vacuna.id)}
                  style={styles.editCellVacuna}
                >
                               <Image 
  source={require('../assets/Editar_Vacunas.png')} // Ajusta la ruta de tu imagen de lápiz
  style={styles.editButtonImageVacuna2}
/>
                </TouchableOpacity>
              </View>
            ))}
          </View>












        ) : (
           <Text style={styles.noRecordsText}>No se encontraron registros de vacunas.</Text>
        )}

{/* EDITAR VACUNAS */}

        <Modal visible={modalVacunaVisible} transparent animationType="slide">
          <View style={styles.modalContainerVacuna}>
            <View style={styles.modalContentVacuna}>
              <Image
                source={require("../assets/Editar_Vacunas.png")}
                style={styles.modalImageVacuna}
              />

              <Text style={styles.modalTitle1}>EDITAR </Text>
              <Text style={styles.modalTitle2}>VACUNA</Text>

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

              <DateTimePickerModal
                isVisible={showVacunaDatePicker}
                mode="date"
                date={
                  nuevaFechaVacuna ? new Date(nuevaFechaVacuna) : new Date()
                }
                onConfirm={(date) => handleFechaConfirm(date, "vacuna")}
                themeVariant="light"
                onCancel={() => setShowVacunaDatePicker(false)}
                maximumDate={new Date()} // Deshabilita fechas futuras
              />

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
                  style={styles.dropdownStyle} // Estilo personalizado para eliminar la línea negra
                  dropDownStyle={styles.dropDownStyle} // Estilo para la lista desplegable
                  arrowIconStyle={styles.arrowIconStyle} // Estilo para la flecha hacia abajo
                  textStyle={styles.textStyle} // Estilo para el tamaño de la letra
                />
              </View>

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
                    { zIndex: openNombreVacuna ? 10 : 1 },
                  ]}
                  listMode="SCROLLVIEW"
                  style={styles.dropdownStyle} // Estilo personalizado para eliminar la línea negra
                  dropDownStyle={styles.dropdownStyle} // Estilo para la lista desplegable
                  arrowIconStyle={styles.arrowIconStyle} // Estilo para la flecha hacia abajo
                  textStyle={styles.textStyle} // Estilo para el tamaño de la letra
                />
              </View>

              <View style={styles.inputContainerVacuna}>
                <Image
                  source={require("../assets/Vacuna.png")} // Ajusta la ruta del logo
                  style={styles.datePickerLogo}
                />
                <TextInput
                  value={nuevaDosisVacuna}
                  onChangeText={setNuevaDosisVacuna}
                  placeholder="Dosis"
                  style={styles.inputVacuna}
                />
              </View>

              <View style={styles.inputContainerVacuna}>
                <Image
                  source={require("../assets/Obs.png")} // Ajusta la ruta del logo
                  style={styles.datePickerLogo}
                />
                <TextInput
                  value={nuevaObsVacuna}
                  onChangeText={setNuevaObsVacuna}
                  placeholder="Observaciones"
                  style={styles.inputVacuna}
                />
              </View>

              <View style={styles.buttonsContainer}>
                {/* Botón Guardar Cambios */}
                <TouchableOpacity
                  style={styles.buttonGuardarVacuna}
                  onPress={handleGuardarCambiosVacuna}
                >
                  <Image
                    source={require("../assets/FechaDeNacimieto.png")} // Reemplaza con la ruta de tu logo
                    style={styles.buttonLogo}
                  />
                  <Text style={styles.buttonText}>GUARDAR</Text>
                </TouchableOpacity>

                {/* Botón Cancelar */}
                <TouchableOpacity
                  style={styles.buttonCancelarVacuna}
                  onPress={() => setModalVacunaVisible(false)}
                >
                  <Image
                    source={require("../assets/FechaDeNacimieto.png")} // Reemplaza con la ruta de tu logo
                    style={styles.buttonLogo}
                  />
                  <Text style={styles.buttonText}>CANCELAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.newControlButton}
          onPress={() => navigation.navigate("FormScreen", { chip })}
        >
          <Text style={styles.newControlButtonText}>
            REALIZA UN NUEVO CONTROL
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
}
