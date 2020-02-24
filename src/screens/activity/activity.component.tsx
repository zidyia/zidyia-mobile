import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../redux/store/store';
import { ThunkDispatch } from 'redux-thunk';
import { IActivity } from '../../redux/activity/activity.reducer';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { getAllActivities } from '../../redux/activity/activity.actions'
import { logout as LogoutAction } from '../../redux/user/user.actions'
import { styles } from './activity.styles';
// Create the containers interface
interface IProps {
    activities: IActivity[];
    navigation: any;
}

interface DispatchProps {
    getActivities: () => void
    logout: () => void
}

type Props = IProps & DispatchProps

class ActivitiesScreen extends React.Component<Props> {
    public componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.props.getActivities()
        });

    }
    public render() {
        const { activities, navigation } = this.props;
        return (
            <>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.headerTitlePrimary}>Welcome Andreh</Text>
                    <TouchableOpacity onPress={this.props.logout} style={{ marginHorizontal: 10 }}>
                        <Text style={{ color: 'white' }}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerTitleSecondary}>My Activities</Text>
                <FlatList
                    data={activities}
                    keyExtractor={item => item.title}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={Math.random() * 10000} onPress={() => navigation.navigate('ActivityDetail', { activity: item.title })}>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemText}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </>
        );
    }
}


const mapStateToProps = (store: IAppState) => {
    return {
        activities: store.activityState.activities,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: IProps): DispatchProps => {
    return {
        getActivities: async () => {
            await dispatch(getAllActivities())
            console.log('Display Activities Done [UI]')
        },
        logout: async () => {
            await dispatch(LogoutAction())
            console.log('logout Done [UI]')
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesScreen);