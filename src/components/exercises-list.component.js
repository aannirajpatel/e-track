import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Exercise extends Component{
    render(){
        const exercise = this.props.exercise;
        const deleteExercise = this.props.deleteExercise;
        return(
            <tr>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
                <td>{exercise.duration}</td>
                <td>{exercise.date.substring(0,10)}</td>
                <td><Link to={"/edit/" + exercise._id}>edit</Link> | <a href="#" onClick={()=>{deleteExercise(exercise._id)}}>delete</a></td>
            </tr>
        );
    }
}

export default class ExercisesList extends Component{
    constructor(props){
        super(props);
        this.state={
            exercises:[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
        .then(response=>{
            this.setState({
                exercises: response.data
            });
        })
        .catch(err=>console.log('Error: '+err));
    }

    deleteExercise = (id)=>{
        axios.delete('http://localhost:5000/exercises/'+id,id)
        .then(res=>{
            this.setState({
                exercises: this.state.exercises.filter(el=>el._id !== id)
            });
            console.log(res.data);
        })
        .catch(err=>{
            console.log('Error: '+err);
        });
    }

    exerciseList = () => {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>;
        });
    }

    render(){
        return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.exerciseList()}
                </tbody>
            </table>
        </div>
        );
    }
}