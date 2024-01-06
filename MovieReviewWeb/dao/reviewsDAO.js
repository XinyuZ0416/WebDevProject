import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews){
            return;
        }
        try{ //initialize the reviews collection if it hasn't been initialized yet
            reviews = await conn.db("reviews").collection("reviews"); 
        }catch(e){
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async addReview(movieId, review, user){
        try{
            const reviewDoc = {
                movieId: movieId,
                review: review,
                user: user
            };
            return await reviews.insertOne(reviewDoc);
        }catch(e){
            console.error(`Unable to post review: ${e}`);
            return {error:e};
        }
    }

    static async getReview(reviewId){
        try{
            return await reviews.findOne({_id: new ObjectId(reviewId)});
        }catch(e){
            console.error(`Unable to get review: ${e}`);
            return {error:e};
        }
    }

    static async getReviewsByMovieId(movieId){
        try{
            const cursor = await reviews.find({movieId: parseInt(movieId)});
            return cursor.toArray();
        }catch(e){
            console.error(`Unable to get review: ${e}`);
            return {error: e};
        }
    }

    static async updateReview(reviewId, user, review){
        try{
            const updateResponse = await reviews.updateOne(
                {_id: new ObjectId(reviewId)}, {$set: {user: user, review: review}}
            );
            return updateResponse.modifiedCount; // Return the modifiedCount directly
        }catch(e){
            console.error(`Unable to update review: ${e}`);
            return null; // Return null for error cases
        }
    }    

    static async deleteReview(reviewId){
        try{
            const deleteResponse = await reviews.deleteOne({_id: new ObjectId(reviewId)});
            return deleteResponse;
        }catch(e){
            console.error(`Unable to delete post: ${e}`);
            return {error: e};
        }
    }
}