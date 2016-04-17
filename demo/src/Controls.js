import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';

import Meta from './Meta';

const VIEWPORT = {
    WINDOW: 'window',
    CONTAINER: 'container'
};

export default React.createClass({

    statics: {
        VIEWPORT
    },

    componentWillMount() {
        this.callDebouncedHandler = debounce((handler, value) => {
            handler.call(this, value);
        }, 500);
    },

    _handleBufferChange(e) {
        this.callDebouncedHandler(this.props.onBufferChange, +e.target.value || 0);
    },

    _handleCountChange(e) {
        this.callDebouncedHandler(this.props.onCountChange, +e.target.value || 0);
    },

    _handleHeightChange(e) {
        this.callDebouncedHandler(this.props.onHeightChange, +e.target.value || 0);
    },

    _handleViewportChange(e) {
        this.props.onViewportChange(e.target.value);
    },

    render() {
        return (
            <div className="controls">
                <h1>React Virtual List</h1>
                <h2>interactive demo</h2>
                <div className="form">
                    <div className="row">
                        <label>Items count</label>
                        <input type="text" defaultValue={ this.props.count } onChange={ this._handleCountChange } />
                        <span>That much items is on the list. Only the visible part is rendered.</span>
                    </div>
                    <div className="row">
                        <label>Buffer size</label>
                        <input type="text" defaultValue={ this.props.buffer } onChange={ this._handleBufferChange } />
                        <span>The number of items that will be rendered before and after the visible part.</span>
                    </div>
                    <div className="row">
                        <label>Item height</label>
                        <input type="text" defaultValue={ this.props.height } onChange={ this._handleHeightChange } />
                        <span>The height of the single item. This number have to be set in CSS rules as well.</span>
                    </div>
                    <div className="row">
                        <label>Viewport</label>
                        <div>
                            <p className="row">
                                <input type="radio" name="viewport"
                                       checked={ this.props.viewport === VIEWPORT.WINDOW }
                                       value={ VIEWPORT.WINDOW }
                                       onChange={ this._handleViewportChange }
                                />
                                Whole window
                            </p>
                            <p className="row">
                                <input type="radio" name="viewport"
                                       checked={ this.props.viewport === VIEWPORT.CONTAINER }
                                       value={ VIEWPORT.CONTAINER }
                                       onChange={ this._handleViewportChange }
                                />
                                Scrollable container
                            </p>
                        </div>
                        <span>The element that contains the list. It defines the visible part of the list.</span>
                    </div>
                </div>
                <div className="info">
                    Keep in mind that browsers have <a target="_blank" href="http://goo.gl/xE2Xfe">technical
                    limitations</a> on maximum element height. The list will become broken if you set too
                    much items.
                </div>
                <Meta />
            </div>
        );
    }
});