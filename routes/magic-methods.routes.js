const Cars = require("../model/cars.model.sql");
const User = require("../model/user.model.sql");

const router = require("express").Router();

// 1 to 1 single 1 to many can use array
router.get("/has", async (req, res) => {
  try {
    const { user_id, car_id_1, car_id_2 } = req.body;

    const user = await User.findByPk(user_id); // 6
    const car1 = await Cars.findByPk(2); // 4
    const car2 = await Cars.findByPk(4); // 4

    const isExist_1 = await user.hasCar(car); // true
    // const isExist_2 = await user.hasCars([car1, car2]); //true

    res.json({ isExist_2 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// use single and pass [only data]
router.get("/create", async (req, res) => {
  try {
    const { user_id, car_id_1, car_id_2 } = req.body;

    const user = await User.findByPk(user_id);

    // const car = new Cars({ brand: "brand1", model: "model1" });
    // await car.save();

    // const car = await Cars.create({ brand: "brand1", model: "model1" });

    const ret = await user.createCar({ brand: "brand1", model: "model1" });

    res.json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 1 to 1 single 1 to many add 's'
router.get("/get", async (req, res) => {
  try {
    const { user_id, car_id_1, car_id_2 } = req.body;

    const user = await User.findByPk(user_id);
    const cars = await user.getCars();
    res.json({ cars });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// take care ##### replace ##### 1 to 1 single 1 to many add 's'
router.get("/set", async (req, res) => {
  try {
    const { user_id, car_id_1, car_id_2 } = req.body;
    const user = await User.findByPk(user_id);

    const car1 = await Cars.findByPk(car_id_1); // 4
    const car2 = await Cars.findByPk(car_id_2); // 4

    const ret1 = await user.setCars([car1, car2]);

    res.json({ ret1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 1 to 1 single 1 to many add 's' => []
router.get("/add", async (req, res) => {
  try {
    const { user_id, car_id } = req.body;

    const user = await User.findByPk(user_id);
    const car1 = await Cars.findByPk(car_id);
    const car2 = await Cars.findByPk(2);

    // const ret1 = await user.addCar(car1);
    const ret2 = await user.addCars([car1, car2]);

    res.json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// use single
router.get("/remove", async (req, res) => {
  try {
    const { user_id, car_id } = req.body;

    const user = await User.findByPk(user_id);
    const car1 = await Cars.findByPk(car_id);

    const ret1 = await user.removeCar(car1);

    res.json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
