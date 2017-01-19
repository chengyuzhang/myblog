import { combineReducers } from 'redux';
import {LOADING} from '../actions/actions';

function init(state={},action){
    switch(action.type){
        case LOADING:
        console.log(action.content);
            return action.content;
        default:
            return state;
    }
}

const App=combineReducers({
    init
});

export default init;