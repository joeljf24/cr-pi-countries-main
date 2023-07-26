import style from './Cards.module.css';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';

const Cards = () => {
   const countries = useSelector(state => state.countries);
   console.log('Countries--->', countries)
   return (
      <div className={style.cardList}>
         {
            countries.map((countries) => {
               return(
                  <Card
                  key={countries?.id}
                  id={countries?.id}
                  name={countries?.name}
                  image={countries?.image}
                  continent={countries?.continent}
                  />
               )
            })
         }
      </div>
   )
};


export default Cards;