import style from './Cards.module.css';
import Card from '../Card/Card';

const Cards = ({ currentCountries }) => {
   return (
      <div className={style.cardList}>
         {
            currentCountries.map((country) => {
               return(
                  <Card
                  key={country?.id}
                  id={country?.id}
                  name={country?.name}
                  image={country?.image}
                  continent={country?.continent}
                  />
               )
            })
         }
      </div>
   )
};


export default Cards;