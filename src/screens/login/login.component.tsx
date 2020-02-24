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
import { required, email as isValidEmail, password as isValidPassword } from '../../utils/validators';

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
        passwordValid: false,
        emailBorder: 'white',
        passwordBorder: 'white'
    }

    render() {
        const { login } = this.props;
        const { email, password, emailBorder,passwordBorder } = this.state;
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <Input
                        onChange={(email: string) => {
                            if (!required(email) || !isValidEmail(email)) {
                                this.setState({ email, emailValid: false,emailBorder:'red' })
                            }
                            else {
                                this.setState({ email, emailValid: true,emailBorder:'green' })
                            }
                        }}
                        val={email}
                        hint="Enter your email"
                        style={{
                            width: width - 50,
                            borderColor:emailBorder
                        }}
                    />
                    <Input
                        onChange={(password: string) => {
                            if (!required(password) || !isValidPassword(password)) {
                                this.setState({ password, passwordValid: false,passwordBorder:'red' })
                            }
                            else {
                                this.setState({ password, passwordValid: true,passwordBorder:'green' })
                            }
                        }}
                        val={password}
                        hint="Enter your password"
                        style={{ width: width - 50, borderColor:passwordBorder }}
                        secureInput={true}
                    />
                    <Button
                        title="Login"
                        onPress={() => {
                            if (!required(email) || !required(password) || !isValidEmail(email) || !isValidPassword(password)) {
                                this.setState({ emailValid: false,passwordValid:false })
                            } else {
                                this.setState({ emailValid: true,passwordValid:true })
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
