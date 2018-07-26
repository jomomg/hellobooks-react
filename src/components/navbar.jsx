import React from 'react'

const TopNav = (props) => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper teal">
                    <a href="#" className="brand-logo center">Hello Books</a>
                    <a href="#" data-activates="slide-out" className="button-collapse show-on-large"><i
                        className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {/*<li><a href="profile.html">My profile</a></li>*/}
                    </ul>
                </div>
            </nav>
        </div>
    )
};

export default TopNav

