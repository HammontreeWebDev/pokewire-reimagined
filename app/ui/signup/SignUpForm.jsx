'use client'
import { useState } from "react";
import { redirect } from "next/navigation";
import validatePassword from "@/app/utils/validatePassword";
import ListAlert from "@/app/ui/alerts/ListAlert";
import Image from "next/image";

export default function SignUpForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const [errorTitle, setErrorTitle] = useState('');
    const [userCreated, setUserCreated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorTitle('There was an error processing your request:');
            setErrorMessage(['Passwords do not match!']);
            return;
        }

        if (!validatePassword(password)) {
            setErrorTitle('Please review the password requirements:');
            setErrorMessage(
                [
                    'At least 1 upper case letter (A-Z)',
                    'At least 1 lower case letter (a-z)',
                    'At least 1 special character (!@#$%^&*)',
                    'At least 1 number (0-9)',
                    'Minimum of 8 characters in length'
                ]
            );
            return;
        }

        // API CALL
        try {
            // ! may need to update path
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to create the account');
            }

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrorMessage([]);
            setErrorTitle('');

            alert('Account created successfully! You will be redirected to login.');
            setUserCreated(true);

        } catch (error) {
            setErrorTitle('There was an error processing your request:')
            setErrorMessage([error.message]);
        }
    };

    userCreated ? redirect('/login') : null;

    return (
        <>
            <div className="antialiased bg-poke-yellow flex min-h-full flex-1 flex-col justify-center px-6 py-12 rounded-2xl lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src="/img/logos/poke-logo.png"
                        alt="Your Company"
                        width={1920}
                        height={1920}
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        <span className="text-poke-white">
                            Sign Up
                        </span>

                        <span className="text-poke-red">
                            &nbsp;For A New Account
                        </span>
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="#"
                        onSubmit={handleSubmit}
                        method="POST">

                        {/* // ! Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-poke-blue">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* // ! Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-poke-blue">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* // ! Password */}

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-poke-blue">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* // ! Confirm Password */}

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-poke-blue">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirm-password"
                                    name="password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-dark-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[var(--poke-blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create My Account
                            </button>

                            {errorMessage.length > 0 && (
                                <ListAlert
                                    errorTitle={errorTitle}
                                    errorListItems={errorMessage}
                                />
                            )}

                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-poke-red">
                        Already Have An Account?{' '}
                        <a href="/login" className="font-semibold leading-6 text-dark-blue hover:text-[var(--poke-blue)]">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}