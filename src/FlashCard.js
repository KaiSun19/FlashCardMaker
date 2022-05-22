import React, { useEffect, useState } from 'react'
import './FlashCard.css';

function FlashCard({imgSrc, desc,title}) {


    const [imgDimmensions , setImgDimmensions] = useState("");

    
    function changeDimmensions(height, width){
        setImgDimmensions({height: height + "px",width: width +"px" })
    }

    const onImgLoad = ({ target: img }) => {
            const { offsetHeight, offsetWidth } = img;
            changeDimmensions(img.naturalHeight/2,img.naturalWidth/2)
        };

        useEffect( () =>
        console.log(imgDimmensions),
        [imgDimmensions])

        //height:imgDimmensions.height, width:imgDimmensions.width

        //<Button variant="danger" onClick={deleteCard({id})}>Delete</Button>


  return (
    <div className="flip-card" style={{height: imgDimmensions.height, width: imgDimmensions.width}}>
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <img onLoad = {onImgLoad} src={imgSrc} alt="front-pic" ></img>
      </div>
      <div className="flip-card-back">
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    </div>
  </div>
  )
}

export default FlashCard
