const { Videogame, Genero } = require("../db");
const axios = require("axios");
// const { Op } = require("sequelize");
const { YOU_API_KEY } = process.env;

async function allGames(req, res) {
    try {
      const gamesApi1 = await axios.get(`https://api.rawg.io/api/games?key=${YOU_API_KEY}&page_size=40&page=1`);
      const gamesApi2 = await axios.get(`https://api.rawg.io/api/games?key=${YOU_API_KEY}&page_size=40&page=2`);
      const gamesApi3 = await axios.get(`https://api.rawg.io/api/games?key=${YOU_API_KEY}&page_size=20&page=3`);
      let api1 = gamesApi1.data.results;
      let api2 = gamesApi2.data.results;
      let api3 = gamesApi3.data.results;
      const apiTotal = [...api1, ...api2, ...api3];
      const resultApi = apiTotal.map((game) => {
        return {
          id: game.id,
          name: game.name,
          fecha: game.released,
          img: game.background_image,
          rating: game.rating,
          generos: game.genres.map((e) => e.name),
          plataformas: game.parent_platforms.map(e => e.platform.name)
        };
      });
      const resultDB = await Videogame.findAll({
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
      res.status(200).json(resultApi.concat(resultDB));
    } catch (error) {
      res.send("Error en el primer Catch.");
    }
};



module.exports = {allGames};
