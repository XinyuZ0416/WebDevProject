import ReviewsDAO from "../dao/reviewsDAO.js"; 

// handle CRUD operations in the context of movie reviews 
// and interact with ReviewsDAO that is responsible for communication with the database
export default class ReviewsController{
    // Create: POST - apiPostReview
    static async apiPostReview(req, res, next){
        try{
            const movieId = parseInt(req.body.movieId);
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.addReview(movieId, review, user);
            res.json({status:"Success"});
        }catch(e){
            res.status(500).json({error:e.message});
        }
    }

    // Read: GET - apiGetReview
    static async apiGetReview(req, res, next){
        try{
            let id = req.params.id || {};
            let review = await ReviewsDAO.getReview(id);
            if(!review){
                res.status(404).json({error:"Not Found"});
                return;
            }
            res.json(review);
        }catch(e){
            res.status(500).json({error:e});
        }
    }

    // Read (plural): GET - apiGetReviews
    static async apiGetReviews(req, res, next){
        try{
            let id = req.params.id || {};
            let reviews = await ReviewsDAO.getReviewsByMovieId(id);
            if(!reviews){
                res.status(404).json({error:"Not Found"});
                return;
            }
            res.json(reviews);
        }catch(e){
            res.status(500).json({error:e});
        }
    }

    // Update: PUT - apiUpdateReview
    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.params.id;
            const user = req.body.user;
            const review = req.body.review;
            
            const modifiedCount = await ReviewsDAO.updateReview(reviewId, user, review);
    
            if(modifiedCount === null){ // Check for error
                res.status(400).json({error: "Unable to update review"});
            } else if(modifiedCount === 0){ // Check for modification count
                res.status(404).json({error: "Review not found or not modified"});
            } else {
                res.json({status: "Success"});
            }
        }catch(e){
            res.status(500).json({error:e.message});
        }
    }
    
    // Delete: DELETE - apiDeleteReview
    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
            res.json({status:"Success"});
        }catch(e){
            res.status(500).json({error:e.message});
        }
    }
}
