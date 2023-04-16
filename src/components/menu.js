import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Menu(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const buttonLogIn = () => {
        if(isLoggedIn == isLoggedIn){
            setIsLoggedIn(!isLoggedIn);
        }
    }
    return(
        <section id="menu">
            <div class="container-xl menu">
                <div class='row menu'>
                    <div class='col-12'>
                        Menu
                    </div>
                    <div class='col-2 offset-10 d-grid gap-1'>
                        <button type="button" class="btn btn-dark" onClick={()=>{buttonLogIn()}} >{isLoggedIn == false ? "Log In" : "Log Out"}</button>
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