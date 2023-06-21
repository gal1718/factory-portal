import { legacy_createStore as createStore } from 'redux';
import rootReducer from '../../Redux/RootReducer'
import { Provider } from 'react-redux';
import Home from '../Home/Home';

const HomeWrapper = ({ user, setUser}) => { // Homewrapper creates the store

    const store = createStore(rootReducer);



    return (
        <Provider store={store}>
            <div className="HomeWrapper">
                <Home user={user} setUser={setUser}/>

            </div>

        </Provider>

    )
}

export default HomeWrapper;