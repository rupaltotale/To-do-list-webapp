import { Button, InputGroup } from "react-bootstrap";
import {
  FaAt,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaPortrait,
} from "react-icons/fa";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import React from "react";
import CustomNavBar from "./components/Nav/Nav";
import CustomForm from "./components/CustomComponents/CustomForm";
import { render } from "react-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import { getUser, updateUser } from "./API";
import globalStylesheet from "./globalStylesheet";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.container = document.getElementById("app");
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      id: null,
      theme: "",
      loggedIn: localStorage.getItem("token") ? true : false,
      isPasswordShowing: false,
      backgroundColor: "#ffffff",
      primaryColor: "black",
    };
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      console.log("JWT", localStorage.getItem("token"));
      getUser(
        (response) => {
          this.setState({
            username: response.data.username,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            id: response.data.id,
            theme: response.data.theme,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.primaryColor !== this.state.primaryColor ||
      prevState.backgroundColor !== this.state.backgroundColor
    ) {
      this.container.style.color = this.state.primaryColor;
      this.container.style.backgroundColor = this.state.backgroundColor;
    }
  }

  setUsername = (username, isLoggedIn, id) => {
    this.setState({
      username: username,
      loggedIn: isLoggedIn,
      id: id,
    });
  };

  updateUser = (responseFunc, rejectFunc, properties) => {
    updateUser(
      (response) => {
        responseFunc(response);
        this.setState(response.data);
      },
      (error) => {
        rejectFunc(error);
      },
      { ...this.state, ...properties }
    );
  };

  showPassword = () => {
    this.setState({
      isPasswordShowing: !this.state.isPasswordShowing,
    });
  };

  renderNav() {
    return (
      <CustomNavBar
        username={this.state.username}
        theme={this.state.theme}
        setUsername={this.setUsername}
        updateUser={this.updateUser}
      />
    );
  }

  renderSignUpForm = () => {
    return (
      <CustomForm
        setUsername={this.setUsername}
        pageTitle={"Sign Up"}
        formFields={[
          {
            fieldName: "first_name",
            type: "text",
            leftIcon: () => {
              return <FaPortrait size={20} />;
            },
          },
          {
            fieldName: "last_name",
            type: "text",
            leftIcon: () => {
              return <FaPortrait size={20} />;
            },
          },
          {
            fieldName: "email",
            type: "text",
            leftIcon: () => {
              return <FaEnvelope size={20} />;
            },
          },
          {
            fieldName: "username",
            type: "text",
            leftIcon: () => {
              return <FaAt size={20} />;
            },
          },
          {
            fieldName: "password",
            type: this.state.isPasswordShowing ? "text" : "password",
            leftIcon: () => {
              return <FaKey size={20} />;
            },
            rightIcon: () => {
              return (
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    onClick={this.showPassword}
                  >
                    {this.state.isPasswordShowing ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </Button>
                </InputGroup.Append>
              );
            },
          },
        ]}
        postUrl={"http://localhost:8000/users/"}
      />
    );
  };

  renderLoginForm = () => {
    return (
      <CustomForm
        setUsername={this.setUsername}
        pageTitle={"Log In"}
        formFields={[
          {
            fieldName: "username",
            type: "text",
            leftIcon: () => {
              return <FaAt size={20} />;
            },
          },
          {
            fieldName: "password",
            type: this.state.isPasswordShowing ? "text" : "password",
            leftIcon: () => {
              return <FaKey size={20} />;
            },
            rightIcon: () => {
              return (
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    onClick={this.showPassword}
                  >
                    {this.state.isPasswordShowing ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </Button>
                </InputGroup.Append>
              );
            },
          },
        ]}
        postUrl={"http://localhost:8000/token-auth/"}
      />
    );
  };

  renderHomePage = () => {
    return (
      <Home
        username={this.state.username}
        loggedIn={this.state.loggedIn}
        theme={this.state.theme}
      />
    );
  };

  renderProfilePage = () => {
    return <Profile />;
  };

  render() {
    return (
      <Router>
        {this.renderNav()}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            {!this.state.loggedIn && this.renderLoginForm()}
            {this.state.loggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/signup">
            {!this.state.loggedIn && this.renderSignUpForm()}
            {this.state.loggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/about">
            <div>About</div>
          </Route>
          <Route path="/terms">
            <div>Lol, no terms and services</div>
          </Route>
          <Route path="/profile">
            {this.state.loggedIn && this.renderProfilePage()}
            {!this.state.loggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/">{this.renderHomePage()}</Route>
        </Switch>
      </Router>
    );
  }
}

let container = document.getElementById("app");
render(<App />, container);
