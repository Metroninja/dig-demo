import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';

import globalStyle from '../../styles';

export default class Input extends Component {
  static propTypes = {
    multiline: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {
    const { multiline } = this.props;
    return (
      <TextInput
        style={styles.inputBox}
        autoCapitalize="none"
        autoCorrect={true}
        keyboardType="default"
        multiline={multiline}
        numberOfLines={4}
        value={this.state.value}
        onChangeText={(value) => this.setState({value})}
        underlineColorAndroid='rgba(0,0,0,0)'
      />
    );
  }
}
const styles = StyleSheet.create({
  inputBox: {
    height: 100,
    textAlignVertical: 'top',
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 3,
    ...globalStyle.text,
    fontSize: 18,
    borderColor: 'rgba(202, 204, 206, 0.5)',
    borderWidth: StyleSheet.hairlineWidth,
    ...globalStyle.shadow,
  },
});
