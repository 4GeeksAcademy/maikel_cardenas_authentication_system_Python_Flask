import React, { useState } from "react";
const apiUrl = process.env.BACKEND_URL;

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = { email, password };
        try {
            const response = await fetch(apiUrl + "/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),

            });
            console.log(response)
            const responseData = await response.json();
            if (response.ok) {
                alert("Usuario creado");
            } else {
                alert("Error al crear usuario");
            }
            console.log (responseData)
        } catch (error) {
            console.error("error al realizar solicitud")
        }
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-3 display-5">
                                Register
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mt-3 h6">
                                    <label htmlFor="email" className="mb-1">
                                        E-mail:
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        name="email"
                                        onChange={handleEmailChange}
                                        required
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
                                        name="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
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

export default Signup;