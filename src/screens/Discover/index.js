import {StyleSheet, Text, View, ScrollView, FlatList,TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {BlogList, Library} from '../../../data';
import {ItemSmall} from '../../components'; 
import {SearchNormal1} from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { useNavigation } from "@react-navigation/native";

const data = [
  {id: 1, label: 'Bali'},
  {id: 2, label: 'Lombok'},
  {id: 3, label: 'Jawa Timu'},
  {id: 4, label: 'Jawa Barat'},
  {id: 5, label: 'Yogyakarta'},
];

const ItemRecent = ({item}) => {
  return (
    <View style={recent.button}>
      <Text style={recent.label}>{item.label}</Text>
    </View>
  );
};
const FlatListRecent = () => {
  const renderItem = ({item}) => {
    return <ItemRecent item={item} />;
  };
  return (
    <FlatList style={styles.category}
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 10}}
      horizontal
      showsHorizontalScrollIndicator={false}
      color={colors.white()}
    />
  );
};


const Discover = () => {
  const navigation = useNavigation();
  const recentBlog = Library.slice(0);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("SearchPage")}>
      <View style={styles.header}>
        <View style={styles.bar}>
          <SearchNormal1 size={18} color={colors.white()} variant="Linear" />
          <Text style={styles.placeholder}>Search</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
      <View>
        <Text style={recent.text}>Browse All</Text>
        <FlatListRecent />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listCard}>
          {recentBlog.map}
        </View>
        <View>
        <ListBlog />
        </View>
      </ScrollView>
    </View>
  );
};
const ListBlog = () => {
 
  const verticalData = BlogList.slice(0);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listCard}>
          {verticalData.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
        </View>
    </ScrollView>
    
  );
          };
export default Discover;

const styles = StyleSheet.create({
  listCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
    paddingHorizontal: 24,
    paddingBottom: 10,
    color: colors.white(),
  },
  container: {
    flex: 1,
    backgroundColor: colors.latar(),
  },
header: {
    paddingHorizontal: 24,
    gap: 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  bar: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.green(),
    borderRadius: 10,
    flex: 1,
  },
  placeholder: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.white(),
    lineHeight: 18,
  },
  category:{
color:colors.white(),
  },
});
const recent = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderColor: colors.grey(0.15),
    borderWidth: 1,
    backgroundColor: colors.grey(0.03),
  },
  label: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.white(),
    backgroundColor:colors.latar(),
  },
  text: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
    paddingVertical: 5,
    paddingHorizontal: 24,
  },
});