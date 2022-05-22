import { Modal, Form , Button} from 'react-bootstrap'
import React, { useEffect, useRef, useState } from 'react'
import { useCards } from './Contexts';

function AddCardModal({show, handleClose}) {


    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, displayErrorMessage] = useState(false)

    const titleRef = useRef()
    const descRef = useRef()

    const {addCards, Cards} = useCards()

    const handleSubmit = (e) =>{

        e.preventDefault()
        handleClose()

        addCards({
            imgSrc : selectedImage,
            title : titleRef.current.value,
            desc : descRef.current.value
        })

        console.log(Cards)

        
    }

    function getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
      }

      function isImage(filename) {
        var ext = getExtension(filename).toLowerCase();
        if(ext === "png"){
            return true
        }
        else{
            return false
        }
      }
    
      function customErrorMessage(cond){
          cond ? displayErrorMessage(false) : displayErrorMessage(true)
      }



  return (

    <Modal show = {show} onHide = {handleClose}>

        <Form onSubmit = {handleSubmit}>

            <Modal.Header closeButton> 
                
                <Modal.Title>Add a Card</Modal.Title>
            
            </Modal.Header>

            <Modal.Body>

                            <input
                        type="file"
                        name="myImage"
                        id = "img-file"
                        onChange={(event) => {
                            console.log(event.target.files[0]);
                            console.log(isImage(event.target.files[0].name))
                            const showImage = isImage(event.target.files[0].name)
                            customErrorMessage(showImage)
                            setSelectedImage( URL.createObjectURL(event.target.files[0]))
                        }}
                    />

                    {errorMessage && (
                        <p style = {{color: "#F93154"}}>Please upload PNG files only</p>
                    )}

                <Form.Group controlId = "description" className = "mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type = "text" required ref = {descRef}/>
                </Form.Group>

                <Form.Group controlId = "title" className = "mb-3">
                    <Form.Label>Card Title</Form.Label>
                    <Form.Control type = "text" required ref = {titleRef}/>
                </Form.Group>

                <div className='d-flex justify-content-end mt-3 mb-1'>
                    <Button className = "primary" type = "submit" > Add </Button>
                </div>

            </Modal.Body>

        </Form>



    </Modal>
  )
}

export default AddCardModal