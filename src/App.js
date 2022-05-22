import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlashCard from './FlashCard';
import { Container, Stack , Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import AddCardModal from './AddCardModal';
import { useCards} from './Contexts';
import DeleteCardModal from './DeleteCardModal';
import { DragDropContext , Droppable,  Draggable } from 'react-beautiful-dnd';



function App() {

  const [showAddCardModal, setShowAddCardModal] = useState(false)
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false)

  const {Cards,changeCardOrder } = useCards()

  function handleOnDragEnd(result) {

    const items = Array.from(Cards); // creating copy of Cards called items
    const [reorderedItem] = items.splice(result.source.index, 1); // card object that was at the starting index of drag is spliced out, so reorderedItem is the item that is being spliced out 
    items.splice(result.destination.index, 0, reorderedItem); // dragged item is placed back into item array in new position 
    changeCardOrder(items)

  }

  

  return (
    <div className="App">
      <Container className='modal-button-container' style={{margin : "1%"}}>
        <Stack direction = "horizontal" gap = "2" className="">
        <h1 className='app-title'>FlashCard Maker</h1>
        <Button
              variant = "primary" onClick = { () => setShowAddCardModal(true)} >Add Card  
        </Button>
        <Button
              variant = "outline-primary" onClick = { () => setShowDeleteCardModal(true)} >Delete Card 
        </Button>
        </Stack>
      </Container>

      <DragDropContext onDragEnd={handleOnDragEnd}>

      <Droppable droppableId="flashcards">
      
      {(provided) => (<div className='flashcards' {...provided.droppableProps} ref={provided.innerRef}>

          
        
          { Cards && Cards.map(
            (Card,index) =>{
              return (
                  <Draggable key = {Card.id} draggableId={Card.id} index = {index}>
                    {(provided) =>(
                      <div ref = {provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flashcard-div">
                        <FlashCard imgSrc = {Card.imgSrc} title = {Card.title} desc = {Card.desc} />
                      </div>
                    )}
                  </Draggable>
              )
            }
          )}
        {provided.placeholder}

        </div>
        
      )}

      </Droppable>

      </DragDropContext>


      <AddCardModal show = {showAddCardModal} handleClose ={() =>{
        setShowAddCardModal(false)
      }} />

      <DeleteCardModal
        show = {showDeleteCardModal}
        handleClose ={() =>{
          setShowDeleteCardModal(false)
        }}
      />

    </div>
  );
}

export default App;
