[![Build Status](https://travis-ci.org/jomomg/hellobooks-react.svg?branch=develop)](https://travis-ci.org/jomomg/hellobooks-react)
[![Coverage Status](https://coveralls.io/repos/github/jomomg/hellobooks-react/badge.svg?branch=develop)](https://coveralls.io/github/jomomg/hellobooks-react?branch=develop)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/69fb0f7b5f5640f9a2efa1d5a02fe67d)](https://www.codacy.com/project/jomomg/hellobooks-react/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jomomg/hellobooks-react&amp;utm_campaign=Badge_Grade_Dashboard)

# HelloBooks React

Welcome to Hellobooks React. Hellobooks React is a front end for the [Hellobooks REST API](https://github.com/jomomg/hellobooks_api). Therefore, this app allows you to see all the books available in the library, borrow a book and return a book. A user can also see all the books that they have ever borrowed. Administrators can add, edit, modify and delete books in the library.

## How to run this application

*Pre-requisites:* 
Node.js(>10.5.0 Recommended), npm, Hellobooks API
- Clone this repository `git clone https://github.com/jomomg/hellobooks-react.git`
- In the projects root folder, run `npm install` to install dependencies
- Create a `.env` file and put in the following `REACT_APP_API_BASE_URL='base/url/you/are/using/'`. The base url will be the address where Hellobooks API is running
- Open a terminal and run `npm start`
- Navigate to the link provided by the development server in your browser.
- To run the tests, run `npm test` in a terminal

## How to install Hellobooks API

 - Pre-requisites: Python 3.6
 - Clone this repository `git clone https://github.com/jomomg/hellobooks_api.git`
 - Set up a virtual environment. `virtualenv` is recommended
 - Install the apps dependencies by running `pip install -r requirements.txt`
 - Open a terminal and `cd` into the cloned repository
 - Run `python run.py`
 - Heroku link: [Hellobooks API heroku link](hello-kitabu.herokuapp.com)
 
## More info

- [Heroku app](hellobooks-react.herokuapp.com)
- [Hellobooks API heroku link](hello-kitabu.herokuapp.com)
- [Hellobooks API documentation](https://github.com/jomomg/hellobooks_api)

## Contributors

Jomo Gitau
