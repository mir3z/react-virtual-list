import React from 'react';
import ReactDOM from 'react-dom';

import rafDebounce from './rafDebounce';
import VirtualState from './VirtualState';

var VerticalList = React.createClass({
    displayName: 'VerticalList',
    scrollDebounce: null,
    virtualState: null,

    propTypes: {
        itemHeight: React.PropTypes.number.isRequired,
        itemFactory: React.PropTypes.func.isRequired,
        items: React.PropTypes.array,
        bufferSize: React.PropTypes.number,
        viewport: React.PropTypes.object,
        tagName: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            viewport: window,
            items: [],
            bufferSize: 0,
            tagName: 'ul'
        };
    },

    getInitialState() {
        return {
            contentHeight: 0,
            topOffset: 0,
            items: []
        };
    },

    componentWillMount() {
        this.rafDebounce = rafDebounce(this.update);
    },

    componentDidMount() {
        this.initVirtualState(this.props);
        this.bindEvents(this.props);
        this.update();
    },

    componentWillUnmount() {
        this.unbindEvents(this.props);
    },

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.contentHeight !== nextState.contentHeight) {
            return true;
        }

        if (this.state.items.length !== nextState.items.length) {
            return true;
        }

        return this.state.topOffset !== nextState.topOffset;
    },

    componentWillReceiveProps(nextProps) {
        this.initVirtualState(nextProps);
        this.unbindEvents(nextProps);
        this.bindEvents(nextProps);
        this.update();
    },

    initVirtualState(props) {
        this.virtualState = new VirtualState(
            props.viewport,
            ReactDOM.findDOMNode(this),
            props.items,
            props.itemHeight,
            props.bufferSize
        );
    },

    bindEvents(props) {
        props.viewport.addEventListener('scroll', this.handleScroll);

        if (props.viewport === window) {
            props.viewport.addEventListener('resize', this.handleResize);
        }
    },

    unbindEvents(props) {
        props.viewport.removeEventListener('scroll', this.handleScroll);
        props.viewport.removeEventListener('resize', this.handleResize);
    },

    update(force) {
        if (force) {
            this.virtualState.reset();
        }

        this.setState(this.virtualState.calculate());
    },

    handleScroll() {
        this.rafDebounce.request();
    },

    handleResize() {
        this.virtualState.reset();
        this.rafDebounce.request();
    },

    renderItems() {
        return this.state.items.map((item) => this.props.itemFactory(item, this.props, this.state));
    },

    render() {
        var css = {
            boxSizing: 'border-box',
            height: this.state.contentHeight + 'px',
            paddingTop: this.state.topOffset + 'px'
        };

        return (
            <this.props.tagName style={ css }>{ this.renderItems() }</this.props.tagName>
        );
    }
});

export default VerticalList;