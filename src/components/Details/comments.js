import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addComment } from '../../actions/products';
import { Input } from '../common';
import globalStyle from '../../styles';

@connect(
  state => ({
    comments: state.products.comments,
  }),
  dispatch => bindActionCreators({ addComment }, dispatch)
)
export default class Comments extends Component {

  static propTypes = {
    addComment: PropTypes.func,
    comments: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
    }
    this._input = null;
  }

  submitComment() {
    // get the value from the Input component, then reset it's state to protect from double submit

    const value = this._input.state.value;
    if(!!value) {
      this._input.setState({value: ''});
      this.props.addComment({id: this.props.id, value})
    }
  }

  render() {
    /***
     * Renders the textInput wrapper, handles the submitting of a comment and itterates through each
     * comment added by a given product id in the products object
     ***/
    const comments = this.props.comments[this.props.id] || [];
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Add Comment</Text>
          <Input style={styles.textArea} ref={(r) => this._input = r} multiline={true} />
          <Button 
            title="Submit" 
            onPress={() => this.submitComment()} 
            color={globalStyle.waterBlue} 
          />
        </View>
        <View style={styles.comments}>
          <Text style={[styles.title, styles.content]}>{`Comments (${comments.length})`}</Text>
          {comments.map((comment, index) => (
            <Text style={[styles.text, styles.comment, index % 2 && styles.lightBg]} key={`commentId-${index}`}>{comment}</Text>
          ))}
          {!comments.length && (<Text style={[styles.text, styles.comment]}>no comments...</Text>)}
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 8,
  },
  title: {
    ...globalStyle.title,
    marginBottom: 8,
  },
  text: globalStyle.text,  
  comments: {
    marginTop: 12,
  },
  textArea: {
    marginBottom: 4,
  },
  comment: {
    fontStyle: 'italic',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  lightBg: {
    backgroundColor: globalStyle.lightGray
  }
});
