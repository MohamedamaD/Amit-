const Cars = require("../model/cars.model.sql");
const User = require("../model/user.model.sql");

const selectOptions = ["cars", "posts", "profile"];

const getUserCarsSQL = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const cars = await user.getCars();
    return res.json({ data: user, cars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserProfileSQL = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const profile = await user.getProfile();
    return res.json({ data: user, profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserUsingSelectSQL = async (req, res) => {
  try {
    const { select } = req.query;
    if (!selectOptions.includes(select)) {
      return res.status(400).json({ message: "Invalid select option" });
    }
    const { id } = req.params;
    const data = await User.findByPk(id, { include: select });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UserHasCar = async (req, res) => {
  try {
    const user_id = req.user.id;
    const car_id = req.params.id;
    const user = await User.findByPk(user_id);
    const car = await Cars.findByPk(car_id);
    const isExist = await user.hasCar(car);
    res.json({ isExist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const UserSetCars = async (req, res) => {
  try {
    const user_id = req.user.id;
    const car_id = req.params.id;
    const user = await User.findByPk(user_id);
    const car = await Cars.findByPk(car_id);
    const isExist = await user.hasCar(car);
    res.json({ isExist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
