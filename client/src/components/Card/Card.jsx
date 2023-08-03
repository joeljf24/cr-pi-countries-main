import { NavLink } from "react-router-dom";
import style from "./Card.module.css"

const Card = ({ id, name, image, continent }) => {

   return (
      <div className={style.cardContainer}>

         <NavLink to={`/detail/${id}`} className={style.link}>
            <div className={style.cardImageContainer}>
               <img src={image} alt="" />
            </div>

            <div className={style.cardTextContainer}>
               <h2>{name}</h2>
               <h3>{continent}</h3>
            </div>
         </NavLink>

      </div>
   );
}

export default Card;