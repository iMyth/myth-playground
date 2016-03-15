;;(function () {
	// body...
	'use strict';

	var testData = [[1,2,3],[4,5,6],[7,8,9]];
	function itemOnClick (props) {
		console.log(props);
	}
	var InputText = React.createClass({
	    render: function() {
	        return <div>{this.state.value}</div>;
	    },
	    getInitialState: function() {
		    return {
		    	value: "df"
		    };
		}
	});
	var Keypad = React.createClass({
	    render: function() {
	        return <div ref="click" className="keypad"><InputText />{this.generateToolBar(this.props.items)}</div>;
	    },
	    getInitialState: function (argument) {
	    	return {
	    		valid: true,
	    		text: ""
	    	}
	    }.
	    generateToolBar: function (json) {
	    	return json.map(function (items) {
	        	return <KeypadToolbar onInput={this.onInput.bind(this)} json = {items} />;
	        });
	    },
	    onInput: function () {
	    	// body...
	    }
	});
	var KeypadToolbar = React.createClass({
	    render: function() {
	        return <div className="keypad-toolbar">{this.generateItems(this.props.json)}</div>;
	    },
	    generateItems: function(json){
	        return json.map(function (items) {
	        	return <KeypadKeys item = {items} />;
	        });
	    }
	});

	var KeypadKeys = React.createClass({
	    render: function() {
	        return <div onClick={itemOnClick.bind(this, this.props)} className="key">{this.props.item}</div>;
	    },
	    click: function (e) {
	    	e.stopPropagation();
	    	e.preventDefault();
	    	console.log(this.props.item);
	    }
	});

	React.render(
		<div className="fullscreen"><Keypad items={testData} /></div>,
		window.document.body
		);

})(window, undefined);
