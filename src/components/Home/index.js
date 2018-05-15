import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setProducts } from '../../actions/products';
import globalStyle from '../../styles';

@connect(
  state => ({
    products: state.products.list
  }),
  dispatch => bindActionCreators({ setProducts }, dispatch)
)
export default class Home extends Component {

  static propTypes = {
    products: PropTypes.array,
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
