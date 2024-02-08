import memesData from '../memesData.jsx'
import React from 'react'

export default function Meme(){

    const [meme, setMeme] = React.useState({
        topText:"",
        bottomText:"",
        randomImage:""
    })

    const [allMemeImages, setAllMemeImages] = React.useState(memesData)

    function getMemeImage(){
        const memesArray = allMemeImages.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        setMeme(prevMeme => ({...prevMeme, randomImage: memesArray[randomNumber].url}))
    }

    return(
        <>
            <main>
                <div  className="form">
                    <div>
                        <label className="form--label">Top text</label>
                        <input type="text" placeholder="Shut up" className="form--input"></input>
                    </div>

                    <div>
                        <label className="form--label">Bottom text</label>
                        <input type="text" placeholder="and take my money" className="form--input"></input>
                    </div>
                    
                    <button className="form--button" onClick={getMemeImage}>Get a new meme image🏞️</button>
                </div> 

                <img src={meme.randomImage}  className="meme--image" />           
            </main>
        </>
    )
}