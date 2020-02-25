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
        emailfield: {
            email: '',
            emailValid: false,
            emailBorder: 'white'
        },
        passwordfield: {
            password: '',
            passwordValid: false,
            passwordBorder: 'white'
        }
    }

    render() {
        const { login } = this.props;
        const { email, emailBorder } = this.state.emailfield;
        const { password, passwordBorder } = this.state.passwordfield;
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <Input
                        onChange={(email: string) => {
                            let email_f = {...this.state.emailfield}
                            if (!required(email) || !isValidEmail(email)) {
                                email_f.email = email
                                email_f.emailValid = false
                                email_f.emailBorder = 'red'
                                this.setState({ emailfield: email_f })
                            }
                            else {
                                email_f.email = email
                                email_f.emailValid = true
                                email_f.emailBorder = 'green'
                                this.setState({ emailfield: email_f })
                            }
                        }}
                        val={email}
                        hint="Enter your email"
                        style={{
                            width: width - 50,
                            borderColor: emailBorder
                        }}
                    />
                    <Input
                        onChange={(password: string) => {
                            let password_f = {...this.state.passwordfield}
                            if (!required(password) || !isValidPassword(password)) {
                                password_f.password = password
                                password_f.passwordValid = false
                                password_f.passwordBorder = 'red'
                                this.setState({ passwordfield: password_f })
                            }
                            else {
                                password_f.password = password
                                password_f.passwordValid = true
                                password_f.passwordBorder = 'green'
                                this.setState({ passwordfield: password_f })
                            }
                        }}
                        val={password}
                        hint="Enter your password"
                        style={{ width: width - 50, borderColor: passwordBorder }}
                        secureInput={true}
                    />
                    <Button
                        title="Login"
                        onPress={() => {
                            if (!required(email) || !isValidEmail(email)) {
                                let email_f = {...this.state.emailfield}
                                email_f.emailBorder = 'red'
                                this.setState({ emailfield: email_f })   
                            }
                             if(!required(password) || !isValidPassword(password)){
                                let password_f = {...this.state.passwordfield}
                                password_f.passwordBorder = 'red'
                                this.setState({ passwordfield: password_f })
                            } 
                            else {
                                let emailfield = {...this.state.emailfield}
                                emailfield.emailBorder = 'green'
                                let passwordfield = {...this.state.passwordfield}
                                passwordfield.passwordBorder = 'green'
                                this.setState({ emailfield,passwordfield })
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
