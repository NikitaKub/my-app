import React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';


// Тут був клас з оновленням життєвого циклу, доречно використати як, useEffect так і useLayoutEffect, бо ніяких візуальних проблем не повинно бути
function TimeTick(props){
    const [date, setDate] = useState(new Date());

    useLayoutEffect(()=>{
        const tick = () => {
            setDate(new Date());
        }

        setInterval(() => tick(),1000)
    }, [date]);
    
    return(
        <div class="col-12">
            <h1> Time: {date.toTimeString()}. </h1>
        </div>
    );
}

function ConverterCost(props){
    const [moneyUan, setMoneyUan] = useState("");
    const [moneyDollar, setMoneyDollar] = useState("");

    const tryConvert = (money, convert) => {
        const input = parseFloat(money);
        if(Number.isNaN(input)){
            return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }

    const toUan = (dollar) => {
        return dollar * 36.5686;
    }

    const toDollar = (uan) => {
        return uan / 36.5686;
    }

    const handleUanChange = (e) => {
        setMoneyUan(e.target.value);
        setMoneyDollar(tryConvert(e.target.value, toDollar));
    }

    const handleDollarChange = (e) => {
        setMoneyDollar(e.target.value);
        setMoneyUan(tryConvert(e.target.value, toUan));
    }
    
    return(
        <div class="offset-6 col-4 mt-2">
            <div class="input-group input-group-sm text-end">
                <input type="text" aria-label="First name" value={moneyUan} onChange={handleUanChange} class="form-control bg-warning-subtle"/>
                <span class="input-group-text colorMidleInput">₴</span>
                <input type="text" aria-label="Last name" value={moneyDollar} onChange={handleDollarChange} class="form-control bg-warning-subtle"/>
                <span class="input-group-text colorMidleInput">$</span>
            </div>
        </div>
    );
}

function ProductsList(props){
    const [comment, setComment] = useState("");
    const logAlertComment = (event) => {
        if(comment !== ""){
            alert("Thanks for your comment");
            console.log(comment);
        }
        else{
            alert("Please write your comment before submitting it");
        }
        event.preventDefault();
    }
    return(
        <div class='col-12'>
            {
                props.list.map((element) => (
                    <div class="offset-3 col-6 card colorCard text-start me-auto">
                        <div class="card-body">
                            <div class="input-group mb-3 center" key={element.id}>
                                <div class="input-group-text bg-warning-subtle">
                                    <input class="form-check-input mt-0" type="checkbox" value="" onChange={(e) => (props.handleChangeCounterTaken(e.target.checked))} aria-label="Checkbox for following text input"/>
                                </div>
                                <input type="text" class="form-control bg-warning-subtle" value={element.name} disabled aria-label="Text input with checkbox"/>
                            </div>
                            <h6 class="card-title">Description</h6>
                            <p class="card-text">{element.information}</p>
                            <form onSubmit={logAlertComment}>
                                <div class="form-floating">
                                    <textarea class="form-control bg-warning-subtle" placeholder="Leave a comment here" id="floatingTextarea" onChange={(e) => setComment(e.target.value)}></textarea>
                                    <label for="floatingTextarea">Comments</label>
                                    <div class="row">
                                        <div class="col-2">
                                            <button type="submit" class="btn btn-dark mt-1" >Send</button>
                                        </div>
                                        <ConverterCost/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

function ProductsHave(props){
    return(
        <div class='offset-3 col-2 text-start'>
            <span>Products have {props.count}</span>
        </div>
    );
}

function ProductsTaken(props){
    return(
        <div class='offset-2 col-2 me-auto text-end'>
            <span>Products taken {props.counterProdTaken}</span>
        </div>
    );
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
                <div class="container-xl body">
                    <div class='row'>
                        <div class='col-12'>
                            <span>Body</span>
                        </div>
                        <ProductsHave count={list.length} />
                        <ProductsTaken counterProdTaken={this.state.counterProdTaken} />
                        <ProductsList list={list} handleChangeCounterTaken={this.handleChangeCounterTaken} />
                        <TimeTick />
                    </div>
                </div>
            </section>
            
        );
    }
}

export default Body 