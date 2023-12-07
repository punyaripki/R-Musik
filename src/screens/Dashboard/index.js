import {View,Text,StyleSheet} from "react-native";

const Dashboard = () =>{
    return(
        <View style={styles.container}> 
        <Text style={styles.text}></Text>
        </View>
    );
};
export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems  : "center",
        justifyContent : "center",
    },
    text: {
        fontSize:24,
        fontWeight:"bold",
    }

});