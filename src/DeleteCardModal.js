import { Modal, Button, Stack} from 'react-bootstrap'
import React from 'react'
import { useCards} from './Contexts';


export default function DeleteCardModal({show, handleClose}) {

    const {Cards, deleteCard} = useCards()

    function handleSubmit(e) {

        e.preventDefault()

        handleClose()
    }

  return (

    <Modal show = {show } onHide = {handleClose}>

            <Modal.Header closeButton> 

            <Stack gap = "2" direction = "horizontal" >
                
                <Modal.Title>Delete a Card</Modal.Title> {/* ? used show that it only appear is budget exists*/}

            </Stack>
            
            </Modal.Header>

            <Modal.Body>
                <Stack direction = "vertical" gap = "3">

                {Cards.map(
                    card=>{
                        return (
                            <Stack direction = "horizontal" gap = "2" key = {card.id}>

                                <div className='me-auto fs-5'>{card.title}</div>
                                <Button className = "sm" variant = "outline-danger"
                                 onClick = {() =>{
                                    deleteCard(card.id);
                                     handleClose()
                                }}>Delete</Button>

                            </Stack>
                        )
                    }
                )}

                </Stack>
            
            </Modal.Body>

    </Modal>
  )
}