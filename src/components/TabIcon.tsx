import { StyleSheet, View } from 'react-native';
import Icon, { OcticonsIconName } from '@react-native-vector-icons/octicons';

export const TabIcon = ({ focused, icon }: { focused: boolean; icon: OcticonsIconName }) => {
  return (
    <View style={styles.unfocusedTab}>
      <Icon name={icon} color={focused ? '#fff' : '#666666'} size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  unfocusedTab: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
