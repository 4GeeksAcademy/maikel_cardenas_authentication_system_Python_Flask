import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const {store, actions}=useContext(Context)
	const navigate = useNavigate();

	async function submitform(e) {
		e.preventDefault();
		let formData = new FormData(e.target);
		let email = formData.get("email");
		let password = formData.get("password");
		let logged = await actions.login(email, password);
		if (logged) navigate("/");
	}
	return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-3 display-5">
                                Get In
                            </h2>
                            <form onSubmit={submitform}>
                                <div className="form-group mt-3 h6">
                                    <label htmlFor="email" className="mb-1">
                                        E-mail:
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name= "email"
                                    />
                                </div>
                                <div className="form-group mt-3 h6">
                                    <label htmlFor="password" className="mb-1">
                                        Password:
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name= "password"
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary mt-5">
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 
	
	
	
	
	