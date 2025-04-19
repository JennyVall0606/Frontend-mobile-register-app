export const cattleData = [
  {
    chip: "001",
    breed: "Brahman",
    birthDate: "2023-01-15",
    weight: "250",
    father: "Toro Max",
    mother: "Vaca Luna",
    disease: "brucelosis",
    observations: "Sin observaciones.",
  },
  // ... (otros datos)
];

/// En cattleData.js
export const findCattleByChip = (chip) => {
  return cattleData.filter(cattle => cattle.chip === chip);
};


  
  