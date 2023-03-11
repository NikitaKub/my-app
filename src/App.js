import './App.css';
import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Body from './components/body';
import Menu from './components/menu';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      list: [
        {
          id: 1,
          name: "tomato",
          information: "Tomato from England",
          category: [0,1]
        },
        {
          id: 2,
          name: "cucumber",
          information: "So green and tasty!",
          category: [0,1]
        },
        {
          id: 3,
          name: "potato",
          information: "Special potatoes for you!",
          category: [0,0]
        },
        {
          id: 4,
          name: "corn",
          information: "Who wants popcorn?",
          category: [0,2]
        }
      ],
      currentCategory: 0
    };
  }
  categoryChange = (value) => {
    this.setState({currentCategory: value})
  }
  render(){
      return(
        <div class='App text-center'>
          <Header />
          <Menu categoryChange={this.categoryChange} />
          <Body list={this.state.list} currentCategory={this.state.currentCategory} />
          <Footer />
        </div>
      );
  }
}
export default App;
