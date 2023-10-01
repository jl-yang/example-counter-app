import React, { useState } from "react";
import { Counter } from "./models/Counter";
import { getCounters, increaseCounter, loginUser, logoutUser } from "./api/counterAppService";
import CounterTable from "./components/CounterTable";

const App: React.FC = () => {
    const [loggedInAs, setLoggedInAs] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [counters, setCounters] = useState<Counter[]>([]);

    const login = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        loginUser(username, password)
            .then(() => setLoggedInAs(username))
            .then(() => fetchCounters())
            .catch(console.error);
    }

    const fetchCounters = (): void => {
        getCounters()
            .then((response) => setCounters(response.data.counters))
            .catch(console.error);
    }

    const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setUsername(e.currentTarget.value);
    };

    const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setPassword(e.currentTarget.value);
    };

    const handleIncreaseCounter = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        increaseCounter(username)
            .then(() => fetchCounters())
            .catch(console.error);
    };

    const handleLogout = (): void => {
        logoutUser(username, password)
            .then(() => setLoggedInAs(undefined))
            .catch(console.error);
    };

    return (
        <main className='App'>
            {
                loggedInAs === undefined
                    ? (
                        <div>
                            <h1>Welcome</h1>
                            <form onSubmit={login}>
                                <input type='text' name='username' value={username} placeholder='Username' autoComplete={"off"} onChange={handleUsernameChange} />
                                <input type='text' name='password' value={password} placeholder='Password' autoComplete={"off"} onChange={handlePasswordChange} />
                                <input type='submit' value='Login' />
                            </form>
                        </div>
                    )
                    : (
                        <div>
                            <h1>Counters</h1>
                            <h3>Logged in as {loggedInAs} (<a href='#' onClick={handleLogout}>logout</a>)</h3>
                            <div id="counters">
                                <CounterTable counters={counters} />
                            </div>
                            <div id="increase-counter">
                                <button onClick={handleIncreaseCounter}>Click here!</button>
                            </div>
                        </div>
                    )
            }
        </main>
    )
}

export default App
