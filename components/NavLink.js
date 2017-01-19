import React,{Props,Component} from 'react';
import {Link} from 'react-router';

class NavLink extends Component{
    render(){
        return(
            <Link {...this.props}/>
        )
    }
}

export default NavLink;