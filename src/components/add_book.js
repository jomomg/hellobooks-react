import React, {Component} from 'react'
import { Modal } from 'react-materialize'

const AddBook = (props) => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 offset-m3">
                        <div className="card blue-grey darken-1">
                            <div className="card-content">
                                <span className="card-title">Add Book</span>
                                <div className="row">
                                    <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="title" type="text" className="validate"/>
                                                <label htmlFor="title">Title</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="author" type="text" className="validate"/>
                                                <label htmlFor="author">Author</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="publisher" type="text" className="validate"/>
                                                <label htmlFor="publisher">Publisher</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="pub-year" type="text" className="validate active"/>
                                                <label htmlFor="pub-year">Publication Year</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="edition" type="number" className="validate"/>
                                                <label htmlFor="edition">Edition</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <select>
                                                    <option value="" disabled selected>Choose the Category</option>
                                                    <option value="1">Textbook</option>
                                                    <option value="2">Non-fiction</option>
                                                    <option value="3">Fiction</option>
                                                </select>
                                                <label>Category</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="subcategory" type="text" className="validate"/>
                                                <label htmlFor="subcategory">Sub-category</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea id="description" className="materialize-textarea"></textarea>
                                                <label htmlFor="description">Description</label>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="card-action">
                                <a className="btn teal" href="admin.html">Add Book</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
};

export default AddBook;