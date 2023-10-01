import axios, {AxiosResponse} from 'axios'
import React, {useState} from 'react'

type Counter = {
    username: string,
    count: number,
}

const getCounters = (): Promise<AxiosResponse<{ counters: Counter[] }>> => {
    return axios.get(
        'http://localhost:4000/api/counters',
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }
    );
}

const loginUser = (
    username: string,
    password: string,
): Promise<AxiosResponse<{ username: string }>> => {
    return axios.post(
        'http://localhost:4000/api/users/login',
        {
            username,
            password
        },
    )
}

const increaseCounter = (
    username: string,
): Promise<AxiosResponse<{ counters: Counter[] }>> => {
    return axios.post(
        'http://localhost:4000/api/counters/increase',
        {
            username
        }
    )
}

const logoutUser = (username: string, password: string): Promise<AxiosResponse<void>> => {
    return axios.post(
        'http://localhost:4000/api/users/logout',
        {
            username,
            password
        }
    )
}

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
                                <input type='text' name='username' value={username} placeholder='Username' onChange={handleUsernameChange} />
                                <input type='text' name='password' value={password} placeholder='Password' onChange={handlePasswordChange} />
                                <input type='submit' value='Login' />
                            </form>
                        </div>
                    )
                    : (
                        <div>
                            <h1>Counters</h1>
                            <h3>Logged in as {loggedInAs} (<a href='#' onClick={handleLogout}>logout</a>)</h3>
                            <div id="counters">
                                <ul>
                                    {counters.map((counter) => (
                                        <li key={counter.username}>{counter.username}: {counter.count}</li>
                                    ))}
                                </ul>
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
