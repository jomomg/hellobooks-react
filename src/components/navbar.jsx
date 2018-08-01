import React from 'react'

const TopNav = (props) => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper teal">
                    <a href="#" className="brand-logo center"><span style={{fontFamily: 'Courier New', fontStyle: 'bold'}}>Hello Books</span></a>
                    <a href="#" data-activates="slide-out" className="button-collapse show-on-large"><i
                        className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                    </ul>
                </div>
            </nav>
        </div>
    )
};

export default TopNav

