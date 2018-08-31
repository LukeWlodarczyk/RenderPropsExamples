import React, { Component } from 'react';
import './App.css';
import FetchData from './components/FetchData';
import ErrorBoundaries from './components/ErrorBoundaries';
import Portal from './components/Portal';
import Text from './components/Text';

class App extends Component {
	state = {
		message: 'Hello from Portal',
	};
	render() {
		return (
			<div className="App">
				<ErrorBoundaries
					renderOnError={({ errorInfo }) => <p>Unexpected error occurred</p>}
				>
					<FetchData url="https://randomuser.me/api/?results=4">
						{({ data, loading, error, refetch }) => {
							if (loading) return <p>Loading</p>;
							if (error)
								return (
									<div>
										<p>Ooops, error occurred</p>
										<button onClick={refetch}>Try fetch data again</button>
									</div>
								);
							if (!data || data.results.length === 0) return null;

							return (
								<div>
									{data.results.map(person => (
										<li key={person.login.uuid}>
											<p>
												{person.name.first} {person.name.last}
											</p>
										</li>
									))}
									<button onClick={refetch}>Refetch</button>
								</div>
							);
						}}
					</FetchData>
				</ErrorBoundaries>
				<Portal>
					<Text message={this.state.message} />
				</Portal>
			</div>
		);
	}
}

export default App;
