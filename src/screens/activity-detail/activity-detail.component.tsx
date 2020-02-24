import React from 'react'
import {
    View, Text
} from 'react-native'
import { styles } from './activity-detail.styles'

interface ActivityDetailProps {
    navigation: any;
}

export default class ActivityDetail extends React.Component<ActivityDetailProps>{
    componentDidMount(){
        console.log(this.props.navigation.getParam('activity'))
    }
    render() {
        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.coursename}>{this.props.navigation.getParam('activity')}</Text>
                    <Text style={styles.courseteacher}>Course Teached By Adam</Text>
                    <Text style={styles.coursedescription}>{this.props.navigation.getParam('details')}</Text>
                </View>
            </>
        )
    }
}