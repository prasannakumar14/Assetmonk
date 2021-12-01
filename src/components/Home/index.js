import { Component } from "react";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Home extends Component {
  state = { todoList: "", apiStatus: apiStatusConstants.initial };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const Url = "https://jsonplaceholder.typicode.com/todos";
    const options = {
      method: "GET",
    };
    const response = await fetch(Url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      this.setState({ todoList: data, apiStatus: apiStatusConstants.success });
    }
  };

  renderTodos = () => {
    const { todoList } = this.state;
    return (
      <div className="todo-container">
        <h1 className="todo-heading">Todos</h1>
        <ul className="todo-list">
          {todoList.map((each) => (
            <li key={each.id} className="list">
              <input
                type="checkbox"
                checked={each.completed}
                className="todo-input"
              />
              <p className="todo-title">{each.title}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  onClickLogout = () => {
    const { history } = this.props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  renderAllTodos = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTodos();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home-page">
        <h1 className="home-heading">
          Welcome to Home Page{" "}
          <span onClick={this.onClickLogout} className="logout">
            Logout
          </span>
        </h1>
        {this.renderAllTodos()}
      </div>
    );
  }
}
export default Home;
