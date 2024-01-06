import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

// set up an Express router with routes for interacting with movie reviews
const router = express.Router();

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews); //For routing a GET request to the endpoint /movie/:id, use the apiGetReviews method from the ReviewsCtrl controller
router.route("/new").post(ReviewsCtrl.apiPostReview);
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview);

export default router;