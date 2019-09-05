import React, { useState, useCallback } from 'react'
import Card from './Card'
import update from 'immutability-helper'

const style = {
    width: 400,
}

const Container = (props) => {
    {
        const cards = props.items;
        
        const moveCard = useCallback(
            (dragIndex, hoverIndex) => {
                const dragCard = cards[dragIndex];
                const newCards = update(cards, {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                });

                props.updateList(newCards);
            },
            [cards],
        );

        const remove = (index) => {
            const newList = [...cards];
            newList.splice(index, 1);

            props.updateList(newList);
        }

        const renderCard = (card, index) => {
            return (
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    text={card.text}
                    moveCard={moveCard}
                    remove={remove.bind(null, index)}
                />
            )
        }

        return (
            <>
                <div style={style}>
                    {cards.map((card, i) => renderCard(card, i))}
                </div>
            </>
        )
    }
}
export default Container
