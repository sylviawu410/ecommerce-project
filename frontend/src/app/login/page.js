"use client";

import Navbar from './../components/Navbar.js';
import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess('Login successful!');
                setError('');

                localStorage.setItem('user', JSON.stringify(data.user));

                if (data.user.isAdmin) {
                    window.location.href = '/admin'; 
                } else {
                    window.location.href = '/'; 
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed. Please try again.');
                setSuccess('');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
            setSuccess('');
            console.error('Login error:', err);
        }
    };

    return (
        <div>
            <Navbar />
            <main className="flex flex-col">
                <div className="text-4xl mt-12 mb-6 mx-auto font-semibold">Login</div>
                <div className="flex items-baseline gap-10 justify-center flex-wrap">
                    <form className="flex flex-col" onSubmit={handleLogin}>
                        <div className="flex flex-col my-10">
                            <label
                                htmlFor="email-input"
                                className="block text-gray-900 font-medium mt-5 mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email-input"
                                className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label
                                htmlFor="password-input"
                                className="block text-gray-900 font-medium mt-5 mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password-input"
                                className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                className="mr-0 ml-auto bg-indigo-900 text-white px-4 py-2 rounded text-md font-semibold my-7 w-fit"
                            >
                                Login
                            </button>

                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;