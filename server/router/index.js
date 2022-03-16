import express from "express";

// import movie from './movie/index'
// import logout from './logout/index'
// router.use('/movie', movie)
// router.use('/logout', logout)

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

export default router;
