import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import Button from '../Shared/Button';
import InputField from '../Shared/InputField';
import sharedStyles from '../Shared/styles';
import { SCREENS } from '../constants';

class NewCardView extends PureComponent {
    static propTypes = {
        navigation: PropTypes.shape( {
            state: PropTypes.shape( {
                params: PropTypes.shape( {
                    deckId: PropTypes.string.isRequired
                } )
            } )
        } )
    };

    constructor( props ) {
        super( props );
        this.state = {
            answer: '',
            question: ''
        };
        this.handleAnswerInput = this.handleAnswerInput.bind( this );
        this.handleCancelPress = this.handleCancelPress.bind( this );
        this.handleQuestionInput = this.handleQuestionInput.bind( this );
        this.handleSavePress = this.handleSavePress.bind( this );
    }

    handleAnswerInput( text ) {
        this.setState( { answer: text } );
    }

    handleCancelPress() {
        const deckId = this.props.navigation.state.params.deckId;
        this.props.navigation.navigate( SCREENS.SINGLE_DECK, { deckId } );
    }

    handleQuestionInput( text ) {
        this.setState( { question: text } );
    }

    handleSavePress() {
        const deckId = this.props.navigation.state.params.deckId;
        const cardData = {
            answer: this.state.answer,
            deckId,
            question: this.state.question
        };
        this.props.dispatch( actions.saveNewCardStart( cardData ) );
        this.props.navigation.navigate( SCREENS.SINGLE_DECK, { deckId } );
    }

    render() {
        return (
            <View style={ [ sharedStyles.container, sharedStyles.containerVerticalCenter ] }>
                <Text style={ sharedStyles.inputLabel }>Question</Text>
                <InputField currentValue={ this.state.question } onChangeFunction={ this.handleQuestionInput } />
                <Text style={ sharedStyles.inputLabel }>Answer</Text>
                <InputField currentValue={ this.state.answer } onChangeFunction={ this.handleAnswerInput } />
                <Button onPressFunction={ this.handleSavePress }>
                    <Text style={ sharedStyles.buttonText }>Save</Text>
                </Button>
                <Button onPressFunction={ this.handleCancelPress }>
                    <Text style={ sharedStyles.buttonText }>Cancel</Text>
                </Button>
            </View>
        );
    }
}

// export default NewCardView;
export default connect()( NewCardView );
