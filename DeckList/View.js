import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class DeckListView extends PureComponent {
    render() {
        return (
            <View>
                <Text>Hello { this.props.hello }!</Text>
                <Text>DECK LIST</Text>
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return { hello: state.getIn( [ 'foo', 'hello' ] ) };
}

export default connect( mapStateToProps )( DeckListView );