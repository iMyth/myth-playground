(function (argument) {
	'use strict';
	var itemsJson = [{
		"id": 0,
		"name": "Item0",
		"render": function () {
			return <li className="menu-item"> {this.id + this.name} </li>;
		}
	}, {
		"id": 1,
		"name": "Item1",
		"render": function () {
			return <li> <strong>{this.id + this.name} </strong></li>;
		}
	}, {
		"id": 2,
		"name": "Item2",
		"render": function () {
			return <li className="menu-item"> {this.id + this.name} </li>;
		}
	}, {
		"id": 3,
		"name": "Item3",
		"render": function () {
			return <li className="menu-item"> {this.id + this.name} </li>;
		}
	}];
	var Item = React.createClass({
	    render: function() {
	    	var tplRender = this.props.item.render || this.defalutTplRender;
	        return <li>{tplRender.call(this.props.item)}</li>;
	    },
	    defalutTplRender: function () {
	    	return <li>{this.props.item.name}</li>
	    }
	});
	//import Item from 'item';
	var Menu = React.createClass({
		generateItem: function(item){
	        return <Item item = {item} />
	    },
	    render: function() {
	        var items = this.props.items.map(this.generateItem);
	        return <ul className="menu">{items}</ul>;
	    }
	});

	var Container = React.createClass({
		getInitialState: function() {
		    return {
		    	dragging: false,
		    	clientX: 0,
		    	distance: 0,
		    	originX: 0,
		    	dragStartTime: 0,
		    	released: false,
		    	maxDistance: 200,
		    	maxSpeed: 0.4,
		    	expanded: false
		    };
		},
		genTranslateX: function (x) {
			return this.state.released ? {
				WebkitTransform: "translateX(" + x + "px)",
				WebkitTransitionDuration : "400ms"
			} : {
				WebkitTransform: "translateX(" + x + "px)"
			};
		},
	    render: function() {
	        return (
	        	<div 
	                onMouseDown={this.dragStart}
	                onTouchStart={this.dragStart}
	                onMouseUp={this.dragEnd}
	                onTouchEnd={this.dragEnd}
	                onMouseMove={this.onDrag}
	                onTouchMove={this.onDrag}
	                className="fullscreen container" style={this.genTranslateX(this.state.distance)}>
	                Container
	            </div>
	        );
	    },

	    measureWheretoGo: function (speed) {
	    	if(Math.abs(speed) <= this.state.maxSpeed) {
	    		var distance = this.state.distance > (this.state.maxDistance / 2) ? this.state.maxDistance : 0;
	    		this.setState({
	    			distance : distance,
	    			originX: distance,
	    			expanded: !!distance
	    		});
	    	} else{
	    		speed > this.state.maxSpeed ? (this.slideToRight()) : (this.slideToLeft());
	    	}
	    },

	    slideToLeft: function () {
	    	this.setState({
				distance: 0,
				originX: 0,
				expanded: false
			});
	    },
	    slideToRight: function () {
	    	this.setState({
				distance: this.state.maxDistance,
				originX: this.state.maxDistance,
				expanded: true
			});
	    },
		dragStart: function(e, id) {
			this.setState({
				dragging: true,
				clientX: e.clientX,
				dragStartTime: new Date().getTime(),
				released: false
			});
		},

		dragEnd: function(e, id) {
			//check speed;
			var now = new Date().getTime();
			var speed = (e.clientX - this.state.clientX) / (now - this.state.dragStartTime);
			this.setState({
				dragging: false,
				clientX: this.state.distance,
				originX: this.state.distance,
				released: true
			});
			this.measureWheretoGo(speed);
		},

		onDrag: function(e, id) {
			if(this.state.dragging){
				var clientX = this.state.clientX;
				var left = e.clientX - clientX + this.state.originX
				left < 0 && (left = 0);
				//!this.state.expanded && (left = left / 2);
				//this.state.expanded && (left = left / 2);
				
				this.setState({
					distance: left
				});
			}
		}
	});
	React.render(
		<div className="fullscreen"><Menu items={itemsJson} /><Container className="container"/></div>,
		window["slide-menu"]
		);
})(window, undefined);
