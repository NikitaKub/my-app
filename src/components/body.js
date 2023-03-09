import React from 'react';

class TimeTick extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }
  
    componentDidMount(){
        this.timer = setInterval(()=>this.tick(),1000);
    
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
  
    tick(){
        this.setState({date: new Date()});
    }
  
    render(){
        return(
            <div className='Time'>
                <h1> Time: {this.state.date.toTimeString()}. </h1>
            </div>
        );
    }
}

class ProductsList extends React.Component{
    render(){
        return(
            <div class='col-12'>
                {
                    this.props.list.map((element) => (
                        <div class="input-group mb-3 center" key={element.id}>
                            <div class="input-group-text bg-warning-subtle">
                                <input class="form-check-input mt-0" type="checkbox" value="" onChange={(e)=>(this.props.changeCounterTaken(e.target.checked))} aria-label="Checkbox for following text input"/>
                            </div>
                            <input type="text" class="form-control bg-warning-subtle" value={element.name} disabled aria-label="Text input with checkbox"/>
                        </div>
                    ))
                }
            </div>
        );
    }
}              

class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            counterProdTaken: 0,
            counterProdHave: 0
        };
    }
    changeCounterTaken = (value) => {
        if(value===true){
            this.setState({counterProdTaken: (this.state.counterProdTaken + 1)});
        }
        else{
            this.setState({counterProdTaken: (this.state.counterProdTaken - 1)});
        }
    }
    changeCounterHave = (value) => {
        this.setState({counterProdHave: value});
    }
    render(){
        let list = this.props.list.filter(({category}) => category[0] == this.props.currentCategory || category[1] == this.props.currentCategory);
        
        return(
            <div class='row flex-fill d-flex h-100 justify-content-start'>
                <div class='col-12'>
                    <span>Body</span>
                </div>
                <div class='col-12'>
                    <span>Products taken {this.state.counterProdTaken}</span>
                </div>
                <div class='col-12'>
                    <span>Products have {list.length}</span>
                </div>
                <ProductsList list={list} changeCounterTaken={this.changeCounterTaken} />
                <div class='col-12'>
                    <TimeTick />
                </div>
            </div>
        );
    }
}

export default Body 