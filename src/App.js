import {BrowserRouter, Switch} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Dashboard from './Dashboard';
import Home from './Home';
import Signup2 from './Signup/Signup2';
import CompanyInformations from './Signup/CompanyInformations';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import EmailAuth from './pages/EmailAuth';
import React, {Suspense} from "react";
import ReactLoading from 'react-loading';

const Example = ({type, color}) => (
    <ReactLoading type={type} color={color} height={667} width={375}/>
);

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <div className='content'>
                    <Switch>
                        <PublicRoute exact path='/' component={Home}/>
                        <PublicRoute path='/signup' component={Signup2}/>
                        <PrivateRoute path='/dashboard' component={Dashboard}/>
                        <PublicRoute path='/validateToken' component={CompanyInformations}/>
                        <PublicRoute path='/validateAuthToken' component={EmailAuth}/>
                    </Switch>
                </div>
            </BrowserRouter>
            <Toaster/>
        </div>
    );
}

export default App;
