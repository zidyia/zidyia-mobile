import React from 'react'
import {
    View, Text
} from 'react-native'
import { styles } from './activity-detail.styles'

interface ActivityDetailProps {
    navigation: any;
}

export default class ActivityDetail extends React.Component<ActivityDetailProps>{
    render() {
        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.coursename}>{this.props.navigation.getParam('activity')}</Text>
                    <Text style={styles.courseteacher}>Course Teached By Adam</Text>
                    <Text style={styles.coursedescription}> Lorem Ipsum has been the industry's standard dummy text ever since  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                </View>
            </>
        )
    }
}