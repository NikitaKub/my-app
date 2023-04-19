import React from 'react';
import { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckContext, ProvisionContext } from '../App';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import styles from '../cardStyle.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import uuid from 'react-uuid';
import { createRef } from 'react';
import styled from 'styled-components';


function NeedsCheckers(props){
    return(
        <h1>{props.check == true ? 1 : props.provision}</h1>
    )
}

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
            <CheckContext>
                {check => (
                    <ProvisionContext>
                        {provision => (
                            <NeedsCheckers check={check} provision={provision}/>
                        )}
                    </ProvisionContext>
                )}
            </CheckContext>
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
                <span class={`input-group-text ${styles.colorMidleInput}`}>₴</span>
                <input type="text" aria-label="Last name" value={moneyDollar} onChange={handleDollarChange} class="form-control bg-warning-subtle"/>
                <span class={`input-group-text ${styles.colorMidleInput}`}>$</span>
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
                    <div class={`offset-3 col-6 card ${styles.colorCard} text-start me-auto`} key={element.id}>
                        <div class="card-body">
                            <h1><Link class="link-dark" to={`${element.id}`}>{element.name}</Link></h1>
                            <div class="input-group mb-3 center">
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

function ProductsAll(props){
    const {id} = useParams();
    return (
        <div class="col-12">
            <div class="row">
                <ProductsHave count={props.count} />     
                <ProductsTaken counterProdTaken={props.counterProdTaken} />
            </div>
            <ProductsList list={props.list} handleChangeCounterTaken={props.handleChangeCounterTaken} />
        </div>
    )
}
function ProductsGetOne(props){
    const {id} = useParams();
    const filterListGetById = (value, idValue) => {
        return value.filter(({id}) => id == idValue);
    }
    return (
        <div class="col-12">
            <div class="row">
                <ProductsHave count={props.count.length} />     
                <ProductsTaken counterProdTaken={props.counterProdTaken} />
            </div>
            <ProductsList list={filterListGetById(props.list, id)} handleChangeCounterTaken={props.handleChangeCounterTaken} />
        </div>
    )
}

function Diaries(props){
    const [items, setItems] = useState(() => [
        {
          id: uuid(),
          text: 'Buy tomatoes',
          nodeRef: createRef(null),
        },
        {
          id: uuid(),
          text: 'Verify all prizes',
          nodeRef: createRef(null),
        },
        {
          id: uuid(),
          text: 'Invite friends over to the site',
          nodeRef: createRef(null),
        },
    ]);
    return(
        <div class="offset-4 col-4 me-auto">
            <ul class="list-group">
                <TransitionGroup className="diaries">
                {items.map(({ id, text, nodeRef }) => (
                    <CSSTransition
                    key={id}
                    nodeRef={nodeRef}
                    timeout={500}
                    classNames="item"
                    >
                    <li ref={nodeRef} class="list-group-item text-bg-dark p-3">
                        <button className="remove-btn btn btn-danger"
                        variant="danger"
                        size="sm"
                        onClick={() =>
                            setItems((items) =>
                            items.filter((item) => item.id !== id)
                            )
                        }>&times;</button>
                        {text}
                        </li>
                    </CSSTransition>
                ))}
                </TransitionGroup>
            </ul>
            <button
                class="btn btn-success mb-1 mt-1"
                onClick={() => {
                const text = prompt('Enter some text');
                if (text) {
                    setItems((items) => [
                    ...items,
                    {
                        id: uuid(),
                        text,
                        nodeRef: createRef(null),
                    },
                    ]);
                }
                }}
            >
                Add Diary
            </button>
            <StyledDiv>
                <Button> CLick me</Button>
                <CoolButton inverted>CLick me</CoolButton>
            </StyledDiv>
        </div>
    )
}

const Button = styled.button`
background: ${props => props.inverted ? "limegreen" : "white"};
color: ${props => props.inverted ? "white" : "limegreen"};
border: 2px solid limegreen;
margin-left: 1em;
border-radius: 3px;

&:hover {
  opacity: 0.9;
}
`;

const CoolButton = styled(Button)`
&:hover {
    background-color: white;
    color: limegreen;
  }
`;

const Div = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
)

const StyledDiv = styled(Div)`
    background: limegreen;
    border: 2px solid limegreen;
    border-radius: 3px;
    `;

function Body(props){
    const [counterProdTaken, setCounterProdTaken] = useState(0);
    let list = [
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
    ];

    const filterList = (value, currentCategory) => {
        return value.filter(({category}) => category[0] == currentCategory || category[1] == currentCategory);
    }

    const handleChangeCounterTaken = (value) => {
        if(value===true){
            setCounterProdTaken(counterProdTaken + 1);
        }
        else{
            setCounterProdTaken(counterProdTaken - 1);
        }
    }
    return(
        <section id="body">
            <div class="container-xl body">
                <div class='row'>
                    <div class='col-12'>
                        <span>Body</span>
                    </div>
                    <Routes>
                        <Route path='/' element={
                        <ProductsAll
                            count={filterList(list, props.currentCategory).length}
                            counterProdTaken={counterProdTaken}
                            list={filterList(list, props.currentCategory)} handleChangeCounterTaken={handleChangeCounterTaken}
                        />}></Route>
                        <Route path=':id' element={<ProductsGetOne
                        count={filterList(list, props.currentCategory)}
                        counterProdTaken={counterProdTaken}
                        list={filterList(list, props.currentCategory)} handleChangeCounterTaken={handleChangeCounterTaken}
                        />}></Route>
                    </Routes>
                    <TimeTick />
                    <Diaries />
                </div>
            </div>
        </section>
    );
}

export default Body 