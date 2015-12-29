/** @jsx React.DOM */
import NavBarLink from 'js/nav-bar－links';

var NavBarItem = React.createClass({
  generateLink: function(){
  //Right now we don't need our class but what if we wanted to change the text, add an arrow or something? 
    //Single responsibility principles tell us that it our "Item" should not handle this.
    return <NavBarLink url={this.props.url} text={this.props.text} />;
  },
  generateSubmenu: function(){
  //We generate a simple Navbar (the parent). 
  //Spoilers: it takes items as its argument. 
    return <NavBar items={this.props.submenu} />
  },
  generateContent: function(){
    var content = [this.generateLink()];
    if(this.props.submenu){
      //If there is a submenu in our data for this item
      //We add a generated Submenu to our content
      content.push(this.generateSubmenu());
    }
    return content;
  },
  render: function() {
    var content = this.generateContent();
    return (
      <li>
        {content}
      </li>
    );
  }
})
