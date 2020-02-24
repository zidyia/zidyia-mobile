import React from 'react';
import { Button } from "../../components/button/button.component"
import { Input } from '../../components/textinput/textinput.component';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import {
    View,
    Text,
    StatusBar,
    Alert,
    Dimensions
} from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { login } from '../../redux/user/user.actions'
import { AccessToken } from '../../redux/user/user.reducer'
import { State } from '../../redux/user/user.reducer'
import { styles } from './login.styles'
import { required,email as isValidEmail } from '../../utils/validators';

interface DispatchProps {
    login: (username: string, password: string) => void
}

interface StateProps {
    accessToken: AccessToken
}
interface OwnProps {
    navigation: any;
}
type Props = StateProps & OwnProps & DispatchProps



class LoginScreen extends React.Component<Props> {
    state = {
        email: '',
        password: '',
        emailValid: false,
        passwordValid: false
    }

    render() {
        const { login } = this.props;
        const { email, password, emailValid, passwordValid } = this.state;
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <Input
                        onChange={(email: string) => this.setState({ email })}
                        val={email}
                        hint="Enter your email"
                        style={{ width: width - 50, borderColor: emailValid ? 'green' : 'white' }}
                    />
                    <Input
                        onChange={(password: string) => this.setState({ password })}
                        val={password}
                        hint="Enter your password"
                        style={{ width: width - 50, borderColor: passwordValid ? 'green' : 'white' }}
                        secureInput={true}
                    />
                    <Button
                        title="Login"
                        onPress={() => {
                            if (!required(email) || !required(password)) {
                                Alert.alert("Alert", "All Fields are required")
                            }else if(!isValidEmail(email)){
                                Alert.alert("Alert", "Please Enter a valid email address")
                            } else {
                                login(email, password)
                            }
                        }}
                        style={{ width: width - 50 }}
                        textStyle={{ fontSize: 20 }}
                    />
                </View>
            </>
        )
    }
}

const mapStateToProps = (states: State, ownProps: OwnProps): StateProps => {
    return {
        accessToken: states.accessToken
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
    return {
        login: async (username, password) => {
            await dispatch(login(username, password))
            console.log('Login completed [UI]')
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
