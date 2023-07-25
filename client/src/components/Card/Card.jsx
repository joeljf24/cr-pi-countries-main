import { NavLink } from 'react-router-dom';
import style from './Card.module.css'

const Card = () => {

   return (
      <div className={style.cardContainer}>
            <h2>Esto es una Card</h2>
      </div>
   );
}

export default Card;