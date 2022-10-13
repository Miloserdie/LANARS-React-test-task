import './index.scss';

const Card = ({item, onClickCard}) => {
    const isActive = item.isHold ? 'card hold' : item.isGuessed ? 'card guessed' : 'card';

    return (
        <button disabled={item.isHold || item.isGuessed} onClick={() => onClickCard(item)} className={isActive}>
            <p className={`card-number`}>{item.value}</p>
        </button>
    )
}

export default Card