'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LogInForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result.error) {

            if (result.error === 'CredentialsSignin') {
                setError(`Your email/password combination does not match.`);
            } else {
                setError(`Error Code ${result.status} : ${result.error}`);
            }

        }
    }

    return (
        <>
            <div className="antialiased bg-poke-yellow flex min-h-full flex-1 flex-col justify-center px-6 py-12 rounded-2xl lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src="/img/logos/poke-logo.png"
                        alt="PokéWire Re-Imagined"
                        width={1920}
                        height={1920}
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
                                Sign In
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