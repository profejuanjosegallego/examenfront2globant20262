const DATA_SOURCES = [
  {
    path: "../../assets/data/electronics/computers.json",
    category: "Computadores",
  },
  {
    path: "../../assets/data/electronics/peripherals.json",
    category: "Perifericos",
  },
  {
    path: "../../assets/data/electronics/mobilePhones.json",
    category: "Celulares",
  },
  {
    path: "../../assets/data/electronics/accesories.json",
    category: "Accesorios",
  },
  {
    path: "../../assets/data/electronics/components.json",
    category: "Componentes",
  },
  {
    path: "../../assets/data/electronics/storage.json",
    category: "Almacenamiento",
  },
  {
    path: "../../assets/data/electrodomestics/fridges.json",
    category: "Neveras",
  },
  { path: "../../assets/data/electrodomestics/ovens.json", category: "Hornos" },
  {
    path: "../../assets/data/electrodomestics/roombas.json",
    category: "Robots de Limpieza",
  },
  {
    path: "../../assets/data/electrodomestics/vaccumCleaners.json",
    category: "Aspiradoras",
  },
  {
    path: "../../assets/data/electrodomestics/washerMachines.json",
    category: "Lavadoras",
  },
  {
    path: "../../assets/data/electrodomestics/misc.json",
    category: "Otros Electrodomesticos",
  },
];

const UI_TEXT = {
  loading: "Cargando productos desde archivos JSON...",
  emptyData:
    "No hay productos cargados. Verifica los archivos JSON del catalogo.",
  noResults: "No se encontraron productos con los filtros actuales.",
  error:
    "No se pudo cargar el catalogo. Revisa la estructura de los JSON y vuelve a intentarlo.",
};

export { DATA_SOURCES, UI_TEXT };
