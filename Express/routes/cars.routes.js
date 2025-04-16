const router = require("express").Router();
const {
  findAllCars,
  findCarById,
  createCars,
  updateCar,
  deleteCar,
} = require("../controllers/cars.controller");
router.get("", findAllCars);
router.get("/:id", findCarById);
router.post("", createCars);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
