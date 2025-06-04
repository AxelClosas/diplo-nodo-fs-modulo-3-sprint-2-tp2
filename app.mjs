import mongoose from "mongoose"

// Esto se debería trabajar con una variable de entorno si no me equivoco
const URL_CLUSTER = "URL de conexión"

// Se realiza la conexión al cluster de la Base de Datos
mongoose
  .connect(URL_CLUSTER)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.log("Error al conectar con MongoDB:", error))

// Se define el Schema (estructura) de los datos que se trabajaran en la Colección
const superheroSchema = new mongoose.Schema(
  {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: "Desconocido" },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String,
  },
  { collection: "Grupo-04" }
)

// Se crea el modelo SuperHero que representa la colección (en este caso Grupo-04) siguiendo la estructura presentada en superheroSchema. Esto nos permitirá realizar las operaciones CRUD
const SuperHero = mongoose.model("SuperHero", superheroSchema) // El código me funcionó sin problemas usando Grupo-04, sin embargo, lo dejaré tal cual se presenta en la guía. La duda de porqué se llama así y no Grupo-04 me la saqué con ChatGPT.

// Metodo 1: Insertar un documento (C - Create => CRUD)
async function insertSuperHero() {
  const hero = new SuperHero({
    nombreSuperHeroe: "Spiderman",
    nombreReal: "Peter Parker",
    edad: 25,
    planetaOrigen: "Tierra",
    debilidad: "Radioactiva",
    poderes: ["Trepar paredes", "Sentido arácnido", "Super fuerza", "Agilidad"],
    aliados: ["Ironman"],
    enemigos: ["Duende Verde"],
    creador: "Axel",
  })

  await hero.save()
  console.log("Superhéroe insertado:", hero)
}

// Llamado de la función asíncrona insertSuperHero
insertSuperHero()

// Método 2: Actualizar un Document (U - Update => CRUD)
async function updateSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.updateOne(
    { nombreSuperHeroe: nombreSuperHeroe }, // Filtro
    { $set: { edad: 26} } // Modificación
  )
  console.log('Resultado de la actualización:', result)
}

// Llamado de la función asíncrona updateSuperHero
updateSuperHero('Spiderman')

// Método 3: Eliminar un Documento (D - Delete => CRUD)
async function deleteSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.deleteOne( { nombreSuperHeroe: nombreSuperHeroe}) // El objeto que recibe trabaja como filtro para encontrar el documento a eliminar
  console.log('Superhéroe eliminado:', result)
}

// Llamado de la función asíncronca deleteSuperHero
deleteSuperHero('Spiderman')

// Método 4: Buscar Documentos (R - Read => CRUD)
async function findSuperHeroes() {
  const heroes = await SuperHero.find( {planetaOrigen: 'Tierra'}) // El objeto que recibe es el filtro para buscar todos los heroes que coincidan en su llave planetaOrigen con la Tierra
  console.log('Superhéroes encontrados:', heroes)
}

findSuperHeroes()