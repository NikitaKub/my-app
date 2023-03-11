import React from 'react';
class Menu extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoggedIn: false
        }
    }
    buttonLogIn(){
        if(this.state.isLoggedIn == this.state.isLoggedIn){
            this.setState({isLoggedIn: !this.state.isLoggedIn});
        }
    }
    render(){
        let nameButton = "";
        if(this.state.isLoggedIn == false){
            nameButton = "Log In";
        }
        else{
            nameButton = "Log Out";
        }
        return(
            <section id="menu">
                <div class="container-fluid menu">
                    <div class='row menu'>
                        <div class='col-12'>
                            Menu
                        </div>
                        <div class='col-2 offset-10 d-grid gap-1'>
                            <button type="button" class="btn btn-dark" onClick={()=>{this.buttonLogIn()}} >{nameButton}</button>
                        </div>
                        <div class='col-4 d-grid gap-2 mx-auto'>
                            <button type="button" class="btn btn-secondary" onClick={()=>{this.props.categoryChange(0)}} >All</button>
                        </div>
                        <div class='col-4 d-grid gap-2 mx-auto'>
                            <button type="button" class="btn btn-secondary" onClick={()=>{this.props.categoryChange(1)}}>Most pupular</button>
                        </div>
                        <div class='col-4 d-grid gap-2 mx-auto'>
                            <button type="button" class="btn btn-secondary" onClick={()=>{this.props.categoryChange(2)}}>Promotion products</button>
                        </div> 
                    </div>
                </div>
            </section>
            
        );
    }
}

export default Menu