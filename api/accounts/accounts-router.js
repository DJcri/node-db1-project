const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Accounts.getAll();
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.status(200).json(req.account);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const account = req.body;
      Accounts.create(account);
      res.status(201).json(account);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const { id } = req.params;
      const account = await Accounts.updateById(id, req.body);
      res.status(200).json(account);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const { id } = req.params;
    const account = await Accounts.deleteById(id);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
