'use client'

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

export default function LogInForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {data: session, status} = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            window.location.href = '/dashboard';
        }
    }, [session, status]);

    async function handleSubmit(e) {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result.error) {
            setError(result.error);
        }
    }

    return (
        <>
            <div className="antialiased bg-poke-yellow flex min-h-full flex-1 flex-col justify-center px-6 py-12 rounded-2xl lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        <span className="text-poke-white">
                            Sign in
                        </span>

                        <span className="text-poke-red">
                            &nbsp;to your account
                        </span>
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-poke-blue">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-poke-blue">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-dark-blue hover:text-[var(--poke-blue)]">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-dark-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[var(--poke-blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log In
                            </button>
                        </div>
                    </form>

                    {/* Error Message Display */}
                    {error && <div className="text-red-500 text-sm my-2">{error}</div>}

                    <p className="mt-10 text-center text-sm text-poke-red">
                        Don't have an account?{' '}
                        <a href="/signup" className="font-semibold leading-6 text-dark-blue hover:text-[var(--poke-blue)]">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}