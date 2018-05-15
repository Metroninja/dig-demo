import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import globalStyle from '../../styles';

@connect(
  state => ({
    products: state.products.list,
    notes: state.products.notes,
  })
)
export default class Details extends Component {

  static propTypes = {
    products: PropTypes.array,
    notes: PropTypes.object,
  };

  constructor(props) {
    super(props);

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
