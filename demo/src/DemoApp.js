import React from 'react';
import ReactDOM from 'react-dom';

import VirtualList from '../../src/VirtualList';
import Controls from './Controls';

function itemFactory(item, compProps) {
    var props = {
        'data-idx': item.number,
        className: item.number % 2 ? 'odd' : 'even',
        key: item.number,
        style: { height: compProps.itemHeight + 'px' }
    };
    return (
        <li { ...props }>
            <h1>Item #{ item.number }</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus.
                Morbi suscipit semper dolor non vulputate. Quisque ut risus ac ante finibus congue et vitae urna.
            </p>
        </li>
    );
}

export default React.createClass({

    items: [],

    fillItems(count) {
        this.items = [];
        for (var i = 1; i <= count; i++) {
            this.items.push({ number: i });
        }
    },

    handleBufferChange(buffer) {
        this.setState({ buffer });
    },

    handleCountChange(count) {
        this.fillItems(count);
        this.setState({ count });
    },

    handleHeightChange(height) {
        this.setState({ height });
    },

    handleViewportChange(viewport) {
        this.setState({ viewport });
    },

    componentWillMount() {
        this.fillItems(this.state.count);
    },

    getInitialState() {
        return {
            buffer: 0,
            count: 10000,
            height: 100,
            viewport: 'window'
        };
    },

    render() {
        var props = {
            items: this.items,
            itemFactory,
            itemHeight: this.state.height,
            bufferSize: this.state.buffer,
            viewport: this.state.viewport === Controls.VIEWPORT.CONTAINER ? this.refs.container : window
        };

        return (
            <div>
                <Controls
                    buffer={ this.state.buffer }
                    count={ this.state.count }
                    height={ this.state.height }
                    viewport={ this.state.viewport }
                    onBufferChange={ this.handleBufferChange }
                    onCountChange={ this.handleCountChange }
                    onHeightChange={ this.handleHeightChange }
                    onViewportChange={ this.handleViewportChange }
                    />
                <div id="list-wrapper">
                    <div ref="container" id="viewport" className={ this.state.viewport } >
                        <VirtualList { ...props } />
                    </div>
                </div>
            </div>
        );
    }
});