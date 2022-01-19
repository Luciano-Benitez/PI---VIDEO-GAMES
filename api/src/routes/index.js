const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Videogame, Genero } = require("../db");
const { YOU_API_KEY } = process.env;
const { Op } = require("sequelize");

const routerGames = require('./videogames')
router.use('/videogames', routerGames);

router.get("/videogames??", async (req, res) => {
  try {
    const { name } = req.query;
    console.log('name: ',name)
    const nameApi = await axios.get(`https://api.rawg.io/api/games?key=${YOU_API_KEY}&search=${name}`);
    const resultApi = nameApi.data.results.map(e => {
        return {
            id: e.id,
            slug: e.slug,
            img: e.background_image,
            rating: e.rating,
            generos: e.genres.map(e => e.name)
          }
      });
      const nameDB = await Videogame.findAll({
          where: {
              name: {
                  [Op.iLike]: `%${name}%`,
              },
          },
      });
    const result = nameDB.concat(resultApi);
    result.length ? 
    res.status(200).json(result) : 
    res.status(200).json("¡No se encontro el VideoGame!");
  } catch (error) {
    console.log(error);
    res.send("Error en el Catch.");
  }
});

router.get("/videogames/:id", async (req, res) => {

  try {
    const { id } = req.params;
    if (id.length === 36) {
      const idDB = await Videogame.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Genero,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      res.status(200).send(idDB);
    } else {
      const idApi = await axios.get(` https://api.rawg.io/api/games/${id}?key=${YOU_API_KEY}`);
      const array = [];
      array.push(idApi.data);
      const resultId = array.map((e) => {
        return {
          id: e.id,
          name: e.name,
          descripcion: e.description,
          fecha: e.released,
          rating: e.rating,
          plataformas: e.parent_platforms.map((e) => e.platform.name),
          generos: e.genres.map((e) => e.name),
          img: e.background_image,
        };
      });
      res.status(200).json(resultId);
    }
  } catch (error) {
    res.send("Error en el Catch.");
  }
});

router.get("/genres", async (req, res) => {
  try {
    const genresDB = await Genero.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (genresDB.length > 0) res.json(genresDB);
    else {
      const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${YOU_API_KEY}`);
      const resultAPi = genresApi.data.results.map((e) => {
        return {
          id: e.id,
          name: e.name,
        };
      });
      resultAPi.map(async (e) => {
        await Genero.create({
          id: e.id,
          name: e.name,
        });
      });
      res.status(200).send(resultAPi);
    }
  } catch (error) {
    res.json("Error en el Catch.");
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name, descripcion, fecha, rating, plataformas, createdInDb, generos } = req.body;
    const createGame = await Videogame.create({
      name,
      descripcion,
      fecha,
      rating,
      plataformas,
      createdInDb,
    });
    const genres = await Genero.findAll({
      where: {
        name: {
          [Op.in]: generos,
        },
      },
    });
    genres.map((e) => {
      createGame.addGenero(e);
    });

    res.status(200).json(createGame);
  } catch (error) {
    res.json("Error en el Catch.");
  }
});

module.exports = router;
