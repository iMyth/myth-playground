/** @jsx React.DOM */
import NavBarItem from 'js/nav-bar－items';
var NavBar = React.createClass({
  generateItem: function(item){
    return <NavBarItem text={item.text} url={item.url} submenu={item.submenu} />
  },
  render: function() {
    var items = this.props.items.map(this.generateItem);
    return (
      <ul className="menu">
      {items}
      </ul>
    );
  }
})
