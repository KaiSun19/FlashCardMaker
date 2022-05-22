import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "./useLocalStorage";
const CardsContext = React.createContext()

export function useCards(){  // allows BudgetsContext to be used outside of BudgetsContext 
    return useContext(CardsContext)
}

export const CardsProvider = ({children}) =>{ 

    const [Cards, setCards] =  useLocalStorage("Cards", [])

    const addCards = ({imgSrc, title, desc}) =>{

        setCards(prevCards =>{
            return [...prevCards,{id: uuidV4(), imgSrc, title,desc}]
        })
    }

    const deleteCard =  (id) =>{
        setCards( 
            previousCards =>{
                return previousCards.filter(card => card.id !== id)
    })}

    const changeCardOrder = (array) =>{
        setCards(array)
    }

    

    return(

        <CardsContext.Provider
            value = {{ // these values will be passed down to any component and made available under budget provider 
                addCards,
                Cards,
                deleteCard, 
                changeCardOrder
            }}>
                {children}

        </CardsContext.Provider>

    )
}

