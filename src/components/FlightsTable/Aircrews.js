import React, { Component } from 'react';

import {Table} from 'react-materialize';
import axios from 'axios';

class FlightsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aircrews: []
    };
  }

  componentWillMount() {
    this.props.aircrews.map((aircrewId) => {
      axios.get(`https://mocksvc.mulesoft.com/mocks/d6ab7980-98af-4440-8a98-bf1de508de59/api/aircrews/${aircrewId}`)
      .then((aircrew) => {
        const newAircrews = this.state.aircrews;

        newAircrews.push(aircrew);
        this.setState({ aircrews: newAircrews });
      })
      .catch(() => {
        this.setState({ ...this.state, message: 'Not Available' })
      });
    })
  }

  render() {
    return (
      <Table>
        <thead>
        </thead>
        <tbody>
          {message
            ? this.state.message
            : null
          }
        </tbody>
      </Table>
    );
  }
}

export default FlightsTable;
