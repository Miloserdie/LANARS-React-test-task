import './index.scss';
import {useEffect, useState} from "react";
import {shuffleArray} from "../../utils/shuffleArray";
import Card from "../Card";

const primalNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];

const Cards = () => {
    const [cards, setCards] = useState(() => shuffleArray([...primalNumbers, ...primalNumbers]));
    const [startGame, setStartGame] = useState(false);
    const [cardOnHold, setCardOnHold] = useState({});
    const [isFirstOfPair, setIsFirstOfPair] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleFirstOfPair = (item) => {
        setCardOnHold(item);

        const tempCards = cards.map((card) => {
            if (card.id === item.id) {
                return {
                    ...card,
                    isHold: true
                }
            }

            return card;
        })

        setCards(tempCards);
        setIsFirstOfPair(false);
    }

    const handleSecondOfPair = (item) => {
        const tempCards = cards.map((card) => {
            if (card.id === item.id) {
                return {
                    ...card,
                    isHold: true
                }
            }

            return card;
        })

        setCards(tempCards);

        const compareValuesTimeout = setTimeout(() => {
            if (item.value === cardOnHold.value && item.id !== cardOnHold.id) {
                const tempCards = cards.map((card) => {
                    if (card.id === item.id || card.id === cardOnHold.id) {
                        return {
                            ...card,
                            isGuessed: true,
                            isHold: false
                        }
                    }
                    return card;
                })

                setCards(tempCards);
                setIsFirstOfPair(true);
                setIsLoading(false);
            } else {
                const tempCards = cards.map((card) => {
                    if (card.id === item.id || card.id === cardOnHold.id) {
                        return {
                            ...card,
                            isHold: false,
                        }
                    }

                    return card;
                })

                setCards(tempCards);
                setIsFirstOfPair(true);
                setIsLoading(false);
            }
        }, 1000)

        return () => clearTimeout(compareValuesTimeout);
    }

    const handleClickCard = (item) => {
        if (isFirstOfPair) return handleFirstOfPair(item);

        if (isLoading) return;

        setIsLoading(true);

        handleSecondOfPair(item)
    }

    useEffect(() => {
        const setStartGameTimeout = setTimeout(() => {
            setStartGame(true);
        }, 5000);

        return () => clearTimeout(setStartGameTimeout);
    }, [])

    return (
        <div className={`cards-container ${startGame ? `hidden-cards` : ''}`}>
            {cards.map((item) => {
                return (
                    <Card onClickCard={handleClickCard}
                          item={item}
                          key={item.id}/>
                )
            })}
        </div>
    )
}

export default Cards;