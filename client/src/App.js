import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AccountInfo from "./pages/AccountInfo";
import CreateSheet from "./pages/CreateSheet";
import ViewSheet from "./pages/ViewSheet";
import NoMatch from "./pages/NoMatch";

const App = () => (
<div>
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/accountinfo" component={AccountInfo} />
        <Route exact path="/createsheet" component={CreateSheet} />
        <Route path="/viewsheet/:sheetId/:userId" component={ViewSheet} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route path="/reset/:token" component={ResetPassword} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
</div>

)

export default App;