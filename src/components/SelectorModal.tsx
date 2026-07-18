import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';

const SelectorModal = ({
  setVisible,
  visible,
  onPress,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onPress: (mode: 'home' | 'lock' | 'both') => void;
}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType={'slide'}
      transparent
    >
      <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
        <Pressable
          style={styles.bottomSheet}
          onPress={e => e.stopPropagation()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.handle} />
            <Text style={styles.header}>What would you like to do?</Text>
            <TouchableOpacity
              style={styles.optBtn}
              onPress={() => onPress('home')}
              activeOpacity={0.7}
            >
              <Text style={styles.optBtnText}>Set on home screen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optBtn}
              onPress={() => onPress('lock')}
              activeOpacity={0.7}
            >
              <Text style={styles.optBtnText}>Set on lock screen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optBtn}
              onPress={() => onPress('both')}
              activeOpacity={0.7}
            >
              <Text style={styles.optBtnText}>Set on both screens</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '100%',
    overflow: 'hidden',
    paddingBottom: 30,
  },
  modalContainer: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    padding: 24,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#D1D1D6',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
  optBtn: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  optBtnText: {
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 20,
    width: '90%',
  },
  cancelBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SelectorModal;
