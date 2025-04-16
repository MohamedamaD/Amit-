const Cars = require("../model/cars.model.sql");

const findAllCars = async (req, res) => {
  try {
    const cars = await Cars.findAll();
    res.json({ data: cars, message: "Cars fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Cars.findByPk(id);
    res.json({ data: car, message: "Car fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createCars = async (req, res) => {
  try {
    const body = req.body;
    const car = await Cars.create(body);
    res.json({ data: car, message: "car created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const car = await Cars.update(body, { where: { id } });
    res.json({ data: car, message: "car updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Cars.destroy({ where: { id } });
    res.json({ data: car, message: "car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findAllCars,
  findCarById,
  createCars,
  updateCar,
  deleteCar,
};
