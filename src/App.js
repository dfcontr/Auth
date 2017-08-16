import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAnMANcUIrviX3hPKVJVSPmCVsjSdYWEgc',
            authDomain: 'auth-cc9f9.firebaseapp.com',
            databaseURL: 'https://auth-cc9f9.firebaseio.com',
            projectId: 'auth-cc9f9',
            storageBucket: 'auth-cc9f9.appspot.com',
            messagingSenderId: '526749877892'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;

            default:
                return (
                <View style={styles.spinnerStyle}>
                    <Spinner />
                </View>);
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    spinnerStyle: {
        marginTop: 20
    }
};

export default App;
