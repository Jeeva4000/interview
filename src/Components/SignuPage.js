import React, { useState } from 'react';
import Base from '../Base/Base.js';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {

        const userDetail = {
            email,
            password,
            confirmPassword,
        };
        console.log(userDetail)

        try {

            const response = await fetch('http://localhost:9000/api/user/signup', {
                method: 'POST',
                body: JSON.stringify(userDetail),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log(data)

            if (data.token) {
                setError('');
                localStorage.setItem('token', data.token);
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error(error)
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <Base>
            <div className="main">
                <div className="signup-form">
                    <p className='sign'>SIGNUP</p>
                    <input
                        type="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={handleSignup}>Sign Up</button>
                    {error && <p className="error-message">{error}</p>}

                    <div className='log'>
                        <span>Do you have an account? </span>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default SignupPage;