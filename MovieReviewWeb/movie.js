const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = 'http://localhost:8000/api/v1/reviews/';

const main = document.getElementById('section');

const title = document.getElementById('title');
title.innerText = movieTitle;

//  create a new review
const div_new = document.createElement('div');
div_new.innerHTML = 
    `
    <div class="row">
        <div class="column">
            <div class="card">
                New Review
                <p>
                    <strong>Review: </strong>
                    <input type="text" id="new_review" value="">
                </p>
                
                <p>
                    <strong>User: </strong>
                    <input type="text" id="new_user" value="">
                </p>

                <p><a href="#" onclick="saveReview('new_review', 'new_user')">💾</a></p>
            </div>
        </div>
    </div>
    `
main.appendChild(div_new);

returnReviews(APILINK);

// get reviews
function returnReviews(url){
    fetch(url + "movie/" + movieId) //make an HTTP request to the specified URL
        .then(res => res.json()) //converting the response to JSON format
        .then(function(data){ //a callback function to processes the data obtained from the response
            console.log(data);
            data.forEach(review => { 
                const div_card = document.createElement('div');
                div_card.innerHTML = 
                    `
                    <div class="row">
                        <div class="column">
                            <div class="card" id="${review._id}">
                                <p><strong>Review: </strong>${review.review}</p>
                                <p><strong>User: </strong>${review.user}</p>
                                <p>
                                    <a href="#" onclick="editReview('${review._id}','${review.review}','${review.user}')">✏️</a>
                                    <a href="#" onclick="deleteReview('${review._id}')">🗑️</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    `

                main.appendChild(div_card);
                
            });
        });
}

// edit review
function editReview(id, review, user){ //parameters corresponds to the template literals in <a href="#" onclick="editReview('${review._id}','${review.review}','${review.user}')">✏️</a>
    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id; //考虑是否修改为 const userInputId = `user_${id}_${review.user}`;

    element.innerHTML = 
        `
        <p>
            <strong>Review: </strong>
            <input type="text" id="${reviewInputId}" value="${review}">
        </p>
        <p>
            <strong>User: </strong>
            <input type="text" id="${userInputId}" value="${user}">
        </p>
        <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">💾</a></p>
        `
}

// save review
function saveReview(reviewInputId, userInputId, id=""){ //set default value on id because creating new reviews then saving doesnt pass in the id parameter
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    if(!review || !user){
        alert("Please fill in both review and user!");
    }else{
        if(id){ //if id exists, aka while editing the review
            fetch(APILINK+id,{
                method:'PUT',
                headers:{
                    'Accept':'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user": user,
                    "review": review
                })   
            }).then(res => res.json())
            .then(res => {
                console.log(res);
                location.reload();
            });
        }else{ //if id doesn't exist, aka while creating a new review
            fetch(APILINK+"new",{
                method:'POST',
                headers:{
                    'Accept':'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user": user,
                    "review": review,
                    "movieId": movieId // because need to know what movieId we are creating a new review for
                })   
            }).then(res => res.json())
            .then(res => {
                console.log(res);
                location.reload();
            });
        }
    }
}

// delete review
function deleteReview(id){
    fetch(APILINK+id,{
        method:'DELETE',
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        location.reload();
    });
}