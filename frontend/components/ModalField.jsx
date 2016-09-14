import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import {List, ListItem} from 'material-ui/List'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import Clipboard from 'clipboard-js';
import config from '../config.js';

// Icons
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/Delete';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Save from 'material-ui/svg-icons/content/save';
import Undo from 'material-ui/svg-icons/content/undo';

const styles = {
  paleGrey: {
    'background-color': '#ddd',
  },
  keyField: {
    width: '100px',
    marginRight: '10px',
  },
  rightAllign: {
    float: 'right',
  }
};

const clean = 'clean';
const dirty = 'dirty';
const deleted = 'deleted';

// Key value text field that can be toggled between view and edit modes.
class ModalField extends React.Component {
  constructor(props) {
    super(props);

    this.key = props.identifier;
    this.value = props.value;

    this.state = {
      dirty: false,
      open: false,
      editable: props.editable
    };
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  enableEditMode = () => {
    this.setState({
      editable: true
    });
  }

  disableEditMode = (event) => {
    event.preventDefault();

    this.setState({
      editable: false
    });
  }

  handleKeyChange = (event) => {
    this.key = event.target.value;

    // Set state to dirty so we know to save this change.
    this.setState({dirty: dirty});
  }

  handleValueChange = (event) => {
    this.value = event.target.value;

    // Set state to dirty so we know to save this change.
    this.setState({dirty: dirty});
  }

  toggleDeleted = (event) => {
    if (this.state.dirty !== deleted) {
      // Set state to deleted so we know to save this change.
      this.setState({dirty: deleted});
    } else {
      // Undelete this node
      this.setState({dirty: clean});
    }
  }

  copyToClipboard = () => {
    // Copies the value of this key-value to the clipboard, will fail on unsupported browsers.
    Clipboard.copy(this.value).then(
      function() {console.log("success");},
      function(err) {console.log("failure", err);}
    );
  }

  render() {
    if (this.props.editable) {
      // Render editable field
      return (
        <ListItem>
          <TextField
            name="key"
            floatingLabelText="Key"
            defaultValue={this.key}
            style={styles.keyField}
            onChange={this.handleKeyChange}
            disabled={this.state.dirty === deleted}
          />
          <TextField
            name="value"
            floatingLabelText="Value"
            defaultValue={this.value}
            style={styles.valueField}
            onChange={this.handleValueChange}
            disabled={this.state.dirty === deleted}
          />
          <RaisedButton
            icon={this.state.dirty === deleted ? <Undo/> : <Delete />}
            style={styles.rightAllign}
            onTouchTap={this.toggleDeleted}
          />
        </ListItem>
      );
    } else {
      // Render viewable field
      if (this.state.dirty === dirty) {
        // Update on server if changes have been made.
        this.setState({dirty: clean});
        this.serverRequest = $.ajax(config.apiHost + 'Items/' + this.props.childId, {
          method: 'PUT',
          data: {
            "Id": parseInt(this.props.childId),
            "Key": this.key,
            "Type": "leaf"
          },
          success: function (result) {
            if (result.status !== 200){
              console.error(result);
            }
          },
        });
      } else if (this.state.dirty === deleted) {
        // Send delete request if deleted.
        this.setState({dirty: clean});
        this.serverRequest = $.delete(config.apiHost + 'Items/' + this.props.childId, function (result) {
          if (result.status !== 200){
            console.error(result);
          }
        });
      }
      return (
        <ListItem primaryText={this.value} secondaryText={this.key} rightIcon={<ContentCopy />} onTouchTap={this.copyToClipboard}></ListItem>
      );
    }
  }
}
export default ModalField;