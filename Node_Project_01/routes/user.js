const express = require("express");

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const allDbUsers = await User.find();
    return res.json(allDbUsers);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// GET, PATCH, DELETE user by ID
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    } catch (err) {
      return res.status(404).json({ error: "Invalid ID or server error" });
    }
  })
  .patch(async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { lastName: "Changed" },
        { new: true }
      );
      if (!updatedUser) return res.status(404).json({ error: "User not found" });
      return res.json({ msg: "Updated successfully", user: updatedUser });
    } catch (err) {
      return res.status(500).json({ error: "Update failed" });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ error: "User not found" });
      return res.json({ status: "success", deleted: deletedUser });
    } catch (err) {
      return res.status(500).json({ error: "Delete failed" });
    }
  });


// POST new user
router.post("/", async (req, res) => {
  const body = req.body;

  if (
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const newUser = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle
    });

    return res.status(201).json({ msg: "User created", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create user", details: err.message });
  }
});



  module.exports = router;