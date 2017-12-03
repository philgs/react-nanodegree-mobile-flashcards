import {  } from 'expo';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from '../Shared/Button';
import sharedStyles from '../Shared/styles';
import { ACTIONS, STORE } from '../constants';

const styles = StyleSheet.create( {
    cardCount: {
        fontSize: 30,
        paddingTop: 10
    },
    title: {
        fontSize: 48
    }
} );

class SingleDeckView extends PureComponent {
    static propTypes = {};

    constructor( props ) {
        super( props );
        this.handleAddCardPress = this.handleAddCardPress.bind( this );
        this.handleDeleteDeckPress = this.handleDeleteDeckPress.bind( this );
        this.handleStartQuizPress = this.handleStartQuizPress.bind( this );
    }

    handleAddCardPress( deckId ) {
        this.props.navigation.navigate( 'NewCard', { deckId } );
    }

    handleDeleteDeckPress( deckId ) {
        this.props.dispatch( { type: ACTIONS.PLACEHOLDER, data: deckId } );
    }

    handleStartQuizPress( deckId ) {
        this.props.dispatch( { type: ACTIONS.PLACEHOLDER, data: deckId } );
    }

    render() {
        const deckId = this.props.navigation.state.params.id;
        const deckMetadata = this.props[ STORE.DECK_METADATA ].get( deckId );
        const deckData = this.props[ STORE.DECKS ].get( deckId );
        const deckTitle = _.startCase( deckMetadata.get( 'title' ) );
        const cardCount = deckData ? deckData.size() : 0;
        const cardCountLabel = cardCount === 1 ? 'card' : 'cards';
        const { height } = Dimensions.get('screen');

        return (
            <View style={ sharedStyles.container }>
                <Text style={ [ styles.title, { paddingTop: height * 0.2 } ] }>{ deckTitle }</Text>
                <Text style={ [ styles.cardCount, { paddingBottom: height * 0.1 } ] }>
                    { cardCount } { cardCountLabel }
                </Text>
                <Button onPressFunction={ this.handleAddCardPress } payload={ deckId }>
                    <Text style={ sharedStyles.buttonText }>Add Card</Text>
                </Button>
                <Button onPressFunction={ this.handleStartQuizPress } payload={ deckId }>
                    <Text style={ sharedStyles.buttonText }>Start Quiz</Text>
                </Button>
                <Button onPressFunction={ this.handleDeleteDeckPress } payload={ deckId }>
                    <Text style={ sharedStyles.buttonText }>Delete Deck</Text>
                </Button>
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return {
        [ STORE.DECK_METADATA ]: state.get( STORE.DECK_METADATA ),
        [ STORE.DECKS ]: state.get( STORE.DECKS )
    };
}

export default connect( mapStateToProps )( SingleDeckView );
