import React from 'react';
import { withRouter } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import Callback from './auth/Callback';
import Header from './nav/Header';
import CreateInvite from './pages/CreateInvite';
import Home from './pages/Home';
import Invitation from './pages/Invitation';
import Landing from './pages/Landing';
import InvitationList from './pages/InvitationList';

class App extends React.Component {

  render() {
    const { auth } = this.props;
    return (
      <React.Fragment>
        <Header auth={auth} />
        <Route path='/callback' render={(props) => {
          this.handleAuthentication(props);
          return <Callback {...props} />;
        }} />
        {auth.isAuthenticated()
         ?
         <Switch>
           <Route exact path='/' render={(props) => <Home auth={auth} {...props} />} />
           <Route exact path='/list' render={(props) => <InvitationList auth={auth} {...props} />} />
           <Route exact path='/invitation' render={(props) => <Invitation auth={auth} {...props} />} />
           <Route exact path='/create-invite' render={(props) => <CreateInvite auth={auth} {...props} />} />
           <Redirect to='/' />
         </Switch>
         :
         <Switch>
           <Route exact path='/' render={() => <Landing auth={auth} />} />
           <Redirect to='/' />
         </Switch>
        }
      </React.Fragment>
    );
  }

  handleAuthentication({ location }) {
    if (/access_token|id_token|error/.test(location.hash)) {
      this.props.auth.handleAuthentication();
    }
  }

  componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.props.auth.renewSession();
    }
  }
}

export default withRouter(App);
