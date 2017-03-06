import React, { Component } from 'react';
import client from './client.js';
import { Link} from 'react-router';

class ListNotes extends Component {
	constructor(props){
		super(props);
		this.state = {notes: []};
		this.componentWillMount=this.componentWillMount.bind(this);
  }

  componentWillMount(){
  	var that = this;
		client.findAll(function(notes){
			console.log("Notes are:"+JSON.stringify(notes));
			that.setState({notes: notes});
		});

  }

	render(){
		const notes = this.state.notes;
		return (
			<div>
				<h1 className="text-center" >List of notes:</h1>
				<div className="col-sm-12 text-center blue-background">

				<div className="col-sm-3 text-center" >
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 listNote">
							<Link to="/create" > <span className="glyphicon glyphicon-plus text-white"></span> Create a new note</Link>
						</div>
				</div>

				{notes.map(function(note) {
					return(
									<div key={note.id} className="col-sm-3 text-center" >
											<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 listNote">
													<Link to={"/note/"+note.id} >{note.title}</Link>
								 			</div>
									</div>
					)
				})}

				</div>
			</div>
		)

	}

};

export default ListNotes;
