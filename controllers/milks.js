const getMilks = require("../getMilksScraper");

const getMilkData = async (req, res) => {
  const { login, password } = req.body;
  try {
    const milks = await getMilks(login, password);
    if (milks.slice(0, 5) === "error") {
      return res.json({ error: milks.slice(7) });
    }
    res.status(200).json(milks);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

module.exports = {
  getMilkData,
};
