import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css"
import Image from '../Assets/img/picture.svg';
import { createBox } from '@tensorflow-models/blazeface/dist/box';
import * as tfjs from '@tensorflow/tfjs';
import Clipper from 'image-clipper';
import '@tensorflow/tfjs-backend-webgl';
const blazeface = require('@tensorflow-models/blazeface');

export default function ImageDetect() {

    let model, context, imageWidth, imageHeight, context2, start, end, size,
    imgData, canvas, imgOutput, predictions, imgExtract, canvas2, outputImg;

    const [picture, setPicture] = useState(null);
    // const [crop, setCrop] = useState([]);

    //Upload and Display image
    const onImageChange = e =>{
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            
            reader.addEventListener("load", () => {
                imgData = document.getElementById("image-preview");
                imgData.src = reader.result;
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // run prediction
    const modelFace = async () =>{
        
        console.log("Height : ", imageHeight);
        console.log("Width : ", imageWidth);
        
        const returnTensors = false;
        predictions = await model.estimateFaces(imgData, returnTensors);

        if (predictions.length > 0) {
            console.log(predictions);
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < predictions.length; i++) {
                start = predictions[i].topLeft;
                console.log(start);
                end = predictions[i].bottomRight;
                console.log(end);
                size = [end[0] - start[0], end[1] - start[1]];
                console.log("Dimension : ", size);

                context.beginPath();
                context.strokeStyle = "green";
                context.lineWidth = "2";
                context.rect(start[0], start[1], size[0], size[1]);
                context.stroke();

                extrOutput();
            }   
        }
    };

    const extrOutput = async () =>{
        imgExtract = document.getElementById('output-extraction');
 
        const clipper = new Clipper(imgData);
        const cl2 = clipper.crop(start[0], start[1], size[0], size[1]).toDataURL();
        const img = document.createElement('img');
        img.classList.add('mr-2');
        img.src = cl2;
        imgExtract.appendChild(img);
        console.log("Clipper : ", clipper);
        console.log("Cl 2 : ", cl2);
    }


    //run the model and detect image
    const finalSetup = async () =>{
        imgData = document.querySelector("#image-preview");
        imageWidth = imgData.clientWidth;
        imageHeight = imgData.clientHeight;
        imgData.width = imageWidth;
        imgData.height = imageHeight;

        imgOutput = document.getElementById("image-output-detect")
        imgOutput.src = imgData.src;
        
        canvas = document.getElementById('myCanvas');
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        context = canvas.getContext('2d');
        console.log("Properties : ", canvas);
        
        model = await blazeface.load();
        
        modelFace();
        
    };
    
    return(
        <div className="center main" >
            <div>
                <img src={Image} alt="image-preview" id="image-preview" className="image-preview center" /> 
            </div>
            <div className="mt-2" >
                <div className="custom-file" >
                    <input type="file" className="custom-file-input btn btn-outline-secondary" id="customFile" onChange={onImageChange} />
                    <label className="custom-file-label" htmlFor="customFile" >Choose file</label>
                </div>
            </div>
            <div className="mt-2" >
                <button type="button" className="btn btn-success" onClick={finalSetup} >Detect</button>
            </div>
            <div className="mt-2 main" >
                <img src={imgData} id="image-output-detect" className="image-preview" />
                <canvas id="myCanvas" />
                <canvas id="canvasOutput" className="mt-2" />
            </div>
            <div className="mt-2 mb-2" id="output-extraction" >
                {/* <img src={imgExtract} id="output-extract" /> */}
            </div>
        </div>
        
    );
}