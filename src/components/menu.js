import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styles from '../cardStyle.module.css';


function Menu(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const nodeRef = useRef(null);
    const [showButton, setShowButton] = useState(true);
    const [showMessage, setShowMessage] = useState(false);


    const buttonLogIn = () => {
        setIsLoggedIn(!isLoggedIn);
        setShowMessage(true);
    }
    return(
        <section id="menu">
            <div class="container-xl menu">
                <div class='row menu'>
                    <div class='col-12'>
                        Menu
                    </div>
                    
                    <div class='col-2 offset-10 d-grid gap-1'>
                        {showButton && (   
                            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => buttonLogIn()} >{isLoggedIn == false ? "Log In" : "Log Out"}</button>
                        )}
                        <CSSTransition
                            in={showMessage}
                            nodeRef={nodeRef}
                            timeout={300}
                            classNames="alert"
                            unmountOnExit
                            onEnter={() => setShowButton(false)}
                            onExited={() => setShowButton(true)}
                        >
                            <div className={`card ${styles.colorCard}`} ref={nodeRef} dismissible onClose={() => setShowMessage(false)}>
                                <div className='card-body'>
                                    <p> {isLoggedIn == true ? "Welcome, back!" : "See you later"} </p>
                                    <button type="button" class="btn btn-secondary" onClick={() => setShowMessage(false)}>Close</button>
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                    <div class='col-4 d-grid gap-2 mx-auto'>
                        <button type="button" class="btn btn-secondary"><Link class="link-dark" to="/">All</Link></button>
                    </div>
                    <div class='col-4 d-grid gap-2 mx-auto'>
                        <button type="button" class="btn btn-secondary"><Link class="link-dark" to="/popular">Most pupular</Link></button>
                    </div>
                    <div class='col-4 d-grid gap-2 mx-auto'>
                        <button type="button" class="btn btn-secondary"><Link class="link-dark" to="/promotion">Promotion products</Link></button>
                    </div> 
                </div>
            </div>
        </section>
        
    );
}

export default Menu