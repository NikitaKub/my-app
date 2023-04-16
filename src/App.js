import './App.css';
import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Body from './components/body';
import Menu from './components/menu';
import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom';

export const CheckContext = React.createContext();
export const ProvisionContext = React.createContext(); 


class BodyLayout extends React.Component {
  constructor(){
    super();
    this.state = {
      check: false,
      provision: 0
    };
  }
  render(){
    return (
      <CheckContext.Provider value={this.state.check}>
          <ProvisionContext.Provider value={this.state.provision}>
            <Body currentCategory={this.props.currentCategory}/>
          </ProvisionContext.Provider>
      </CheckContext.Provider>
    )
  }
}


function App(props){
  return(
      <div class='App text-center'>
        <Header />
        <Menu/>

        <Routes>
            <Route exact path='/*' element={<BodyLayout currentCategory={0}/>}></Route>
            <Route path='/popular/*' element={<BodyLayout currentCategory={1}/>}></Route>
            <Route path='/promotion/*' element={<BodyLayout currentCategory={2}/>}></Route>
        </Routes>

        <Footer />
      </div>
  );
}

export default App;
