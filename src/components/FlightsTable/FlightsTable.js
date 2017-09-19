import React, { Component } from 'react';

import FlightsRow from './FlightsRow';
import {Table} from 'react-materialize';
import axios from 'axios';
import moment from 'moment';

const FLIGHTS_TABLE_HEADER_COLUMNS = [
  {
    label: "Pax number",
    jsonName: "paxNumber"
  },
  {
    label: "Started at",
    jsonName: "startedAtFormated"
  },
  {
    label: "Ended at",
    jsonName: "endedAtFormated"
  },
  {
    label: "Empty",
    jsonName: "empty"
  },
  {
    label: "Airport from",
    jsonName: "airportFromFormated"
  },
  {
    label: "Airport to",
    jsonName: "airportToFormated"
  },
  {
    label: "Tail number",
    jsonName: "tailNumber"
  },
  {
    label: "Aircrews",
    jsonName: "aircrews",
    object: true
  },
  {
    label: "State",
    jsonName: "state",
    object: true
  }
];

class FlightsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };
  }

  componentWillMount() {
    axios.get('https://mocksvc.mulesoft.com/mocks/d6ab7980-98af-4440-8a98-bf1de508de59/api/flights')
      .then(({ data: flights }) => {
        const newFlights = [];
    
        flights.map((flight) => {
          axios
            .get(`https://mocksvc.mulesoft.com/mocks/d6ab7980-98af-4440-8a98-bf1de508de59/api/airports/${flight.airportFrom}`)
            .then(({data: {name}}) => {
              flight.airportFromFormated = name;
              return axios
                .get(`https://mocksvc.mulesoft.com/mocks/d6ab7980-98af-4440-8a98-bf1de508de59/api/airports/${flight.airportTo}`)
                .then(({data: {name}}) => {
                  flight.airportToFormated = name;

                  newFlights.push({
                    ...flight,
                    startedAtFormated: moment(flight.startedAtUtc).format('MMMM Do YYYY, h:mm:ss a'),
                    endedAtFormated: moment(flight.endedAtUtc).format('MMMM Do YYYY, h:mm:ss a')
                  });

                  this.setState({ flights: newFlights });
                })
            });
          });
      })
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            { FLIGHTS_TABLE_HEADER_COLUMNS.map(headerColumn => <th data-field={headerColumn.jsonName} key={headerColumn.jsonName}>{headerColumn.label}</th>) }
          </tr>
        </thead>
      
        <tbody>
          { this.state.flights
            ? this.state.flights.map((flight, id) => <FlightsRow key={id} flight={flight} headerColumns={FLIGHTS_TABLE_HEADER_COLUMNS} id={id} />)
            : null
          }
        </tbody>
      </Table>
    );
  }
}

export default FlightsTable;
