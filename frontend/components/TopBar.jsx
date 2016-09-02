import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Save from 'material-ui/svg-icons/content/save';
import Search from 'material-ui/svg-icons/action/search';
import Collapse from 'react-collapse';
import SearchInput from 'react-search-input';

const TopBar = React.createClass({
  getInitialState() {
    return {isOpened: false};
  },

  render() {
    var divStyle = {
      width: '50%',
      margin: 'auto'
    };
    var searchBox = {
      marginTop: 10,
      height: 35,
      fontSize: 25,
      width: '100%',
      borderStyle: 'groove'
    }

    var icon;
    if(this.props.editMode){
      icon = <Save/>;
    } else {
      icon = <Edit/>;
    }

    const {isOpened} = this.state;
    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          title={<span>Title</span>}
          iconElementRight={
            <div>
              <IconButton label="Search" onTouchTap={ () => this.setState({isOpened: !isOpened}) }> <Search/></IconButton>
              <IconButton label="Edit" onTouchTap={this.props.onGlobalEdit}> {icon}</IconButton>
            </div>
          }
          >
        </AppBar>
        <Collapse isOpened={isOpened} fixedHeight={50}>
          <div style={divStyle}><SearchInput style={searchBox} onChange={this.searchUpdated} /></div>
        </Collapse>
      </div>)
  }
});

export default TopBar;