import Cards from '../../components/Cards/Cards';
import { getCountries } from '../../redux/actions'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    return (
        <div>
            <h3>Hola, esta es la ruta Home</h3>
            <Cards/>
        </div>
    )
};

export default Home;