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

class ConverterCost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            moneyUan: '',
            moneyDollar: ''
        }
    }

    handleUanChange = (e) => {
        this.setState({moneyUan: e.target.value});
        this.setState({moneyDollar: tryConvert(e.target.value, toDollar)});
    }

    handleDollarChange = (e) => {
        this.setState({moneyDollar: e.target.value});
        this.setState({moneyUan: tryConvert(e.target.value, toUan)});
    }
    
    render(){
        return(
            <div class="offset-9 col-3">
                <div class="input-group input-group-sm text-end">
                    <input type="text" aria-label="First name" value={this.state.moneyUan} onChange={this.handleUanChange} class="form-control bg-warning-subtle"/>
                    <span class="input-group-text colorMidleInput">₴</span>
                    <input type="text" aria-label="Last name" value={this.state.moneyDollar} onChange={this.handleDollarChange} class="form-control bg-warning-subtle"/>
                    <span class="input-group-text colorMidleInput">$</span>
                </div>
            </div>
        );
    }
}

function tryConvert(money, convert){
    const input = parseFloat(money);
    if(Number.isNaN(input)){
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function toUan(dollar){
    return dollar * 36.5686;
}

function toDollar(uan){
    return uan / 36.5686;
}

class ProductsList extends React.Component{
    constructor(){
        super();
        this.state = {
            comment: ""
        }
    }
    logAlertComment = (event) => {
        if(this.state.comment !== ""){
            alert("Thanks for your comment");
            console.log(this.state.comment);
        }
        else{
            alert("Please write your comment before submitting it");
        }
        event.preventDefault();
    }
    render(){
        return(
            <div class='col-12'>
                {
                    this.props.list.map((element) => (
                        <div class="offset-3 col-6 card colorCard text-start me-auto">
                            <div class="card-body">
                                <div class="input-group mb-3 center" key={element.id}>
                                    <div class="input-group-text bg-warning-subtle">
                                        <input class="form-check-input mt-0" type="checkbox" value="" onChange={(e) => (this.props.handleChangeCounterTaken(e.target.checked))} aria-label="Checkbox for following text input"/>
                                    </div>
                                    <input type="text" class="form-control bg-warning-subtle" value={element.name} disabled aria-label="Text input with checkbox"/>
                                </div>
                                <h6 class="card-title">Description</h6>
                                <p class="card-text">{element.information}</p>
                                <form onSubmit={this.logAlertComment}>
                                    <div class="form-floating">
                                        <textarea class="form-control bg-warning-subtle" placeholder="Leave a comment here" id="floatingTextarea" onChange={(e) => this.setState({comment: e.target.value})}></textarea>
                                        <label for="floatingTextarea">Comments</label>
                                        <button type="submit" class="btn btn-dark mt-1" >Send</button>
                                    </div>
                                </form>
                                <ConverterCost/>
                            </div>
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
    handleChangeCounterTaken = (value) => {
        if(value===true){
            this.setState({counterProdTaken: (this.state.counterProdTaken + 1)});
        }
        else{
            this.setState({counterProdTaken: (this.state.counterProdTaken - 1)});
        }
    }
    handleChangeCounterHave = (value) => {
        this.setState({counterProdHave: value});
    }
    render(){
        let list = this.props.list.filter(({category}) => category[0] == this.props.currentCategory || category[1] == this.props.currentCategory);
        
        return(
            <section id="body">
                <div class="container-fluid body">
                    <div class='row'>
                        <div class='col-12'>
                            <span>Body</span>
                        </div>
                        <div class='offset-3 col-2 text-start'>
                            <span>Products have {list.length}</span>
                        </div>
                        <div class='offset-2 col-2 me-auto text-end'>
                            <span>Products taken {this.state.counterProdTaken}</span>
                        </div>
                        <ProductsList list={list} handleChangeCounterTaken={this.handleChangeCounterTaken} />
                        <div class='col-12'>
                            <TimeTick />
                        </div>
                    </div>
                </div>
            </section>
            
        );
    }
}

export default Body 