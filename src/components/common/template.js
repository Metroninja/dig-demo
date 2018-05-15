import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import globalStyle from '../../styles';

// This is in essence a completely blank file used for copy pasta for each new
//component.  If this is still at the top of any file make sure to clean it up properly

@connect(
  state => ({
  }),
  dispatch => bindActionCreators({ }, dispatch)
)
export default class ChangeMeDoNotForget extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <View>
      </View>
    )
  }
}
const styles = StyleSheet.create({

});
