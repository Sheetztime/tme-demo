import React from 'react';
import { PureComponent } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { hot } from 'react-hot-loader';
import Tenants from './Tenants';
import Topology from './Topology';
import ConfigViewer from './ConfigViewer';
import NsoWrapper from './NsoWrapper';

@DragDropContext(HTML5Backend, { window })
@hot(module)
class App extends PureComponent {
  render() {
    console.debug('App Render');
    return (
      <NsoWrapper>
        <Tenants/>
        <Topology/>
        <ConfigViewer/>
      </NsoWrapper>
    );
  }
}

export default App;
