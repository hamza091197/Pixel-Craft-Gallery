import { Pressable, Text, View, StyleSheet } from 'react-native';
import Octicons, {
  OcticonsIconName,
} from '@react-native-vector-icons/octicons';

type Props = {
  icon: OcticonsIconName;
  title: string;
  onPress?: () => void;
};

export const ProfileRow = ({ icon, title, onPress }: Props) => {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.left}>
        <Octicons name={icon} size={20} color="white" />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Octicons name="chevron-right" size={18} color="#A8B5DB" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
});
