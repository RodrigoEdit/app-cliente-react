const React = require('react'); 
const ReactDOM = require('react-dom'); 
const client = require('./client'); 


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {instrumentos: []};
	}

	componentDidMount() { 
		client({method: 'GET', path: '/api/instrumentos'}).done(response => {
			this.setState({employees: response.entity._embedded.instrumentos});
		});
	}

	render() { 
		return (
			<instrumentosList instrumentos={this.state.instrumentos}/>
		)
	}
}



class InstrumentosList extends React.Component{
	render() {
		const instrumentos = this.props.instrumentos.map(instrumento =>
			<Instrumentos key={instrumento._links.self.href} instrumento={instrumento}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Nombre</th>
						<th>Categoria</th>
						<th>Descripcion</th>
					</tr>
					{instrumentos}
				</tbody>
			</table>
		)
	}
}

class Employee extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.instrumento.Nombre}</td>
				<td>{this.props.instrumento.Categoria}</td>
				<td>{this.props.instrumento.Descripcion}</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)