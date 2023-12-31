/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './Redux/Store';

const AppStore = () =>{
    return(
        <Provider store={store} >
            <App/>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppStore);
