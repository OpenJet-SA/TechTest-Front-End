import {Button, Icon, Modal, Table} from 'react-materialize';
import React, { Component } from 'react';

import Aircrews from './Aircrews.js'

function FlightsRow({flight, headerColumns, id}) {
  return (
    <tr>
      { headerColumns.map(function ({jsonName, object, label}) {
          if (object) {
            return (
              <Modal
                header={label}
                trigger={<Button><Icon small>insert_chart</Icon></Button>}
                key={`${jsonName}_${id}`}>
                  <Aircrews aircrews={flight.aircrews} />
              </Modal>
            )
          }
          return <td key={`${jsonName}_${id}`}>{flight[jsonName]}</td>
        })
      }
    </tr>
  )
}

export default FlightsRow;
