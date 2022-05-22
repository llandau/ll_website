import './App.css';
import { Component } from "react";
import logo from './images/ll_logo.png';
import MatterComponent from './MatterComponent.js';
import SelectedPageComponent from './SelectedPageComponent.js';
import { Page, PageCategories, PageSizes } from './page';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPage: new Page(
        "Hello", 
        PageSizes.Normal, 
        PageCategories.Personal, 
        "Click on an object to learn more. Feel free to bounce the objects."),
    };
  }

  updateSelectedPage = (page) => {
    this.setState({selectedPage: page});
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="ll logo" />
      </header>
      <SelectedPageComponent selectedPage={this.state.selectedPage} />
      <MatterComponent onPageSelected={this.updateSelectedPage} />
    </div>
    )
  }
}

export default App;
