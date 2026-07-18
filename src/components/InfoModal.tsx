import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Linking,
} from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import Icon from '@react-native-vector-icons/octicons';

const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.linkRow}>{value}</Text>
    </View>
  );
};

const LinkInfo = ({
  label,
  value,
  url,
}: {
  label: string;
  value: string;
  url: string;
}) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        onPress={() => Linking.openURL(url)}
        style={styles.linkRow}
        android_ripple={{ color: '#E5E5EA' }}
      >
        <Text style={styles.linkText}>{value}</Text>
        <Icon name="link-external" size={16} color="#2563EB" />
      </Pressable>
    </View>
  );
};

const InfoModal = ({
  details,
  setVisible,
  visible,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  details: any;
}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
      animationType={'slide'}
      transparent
    >
      <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
        <Pressable style={styles.bottomSheet}>
          <View style={styles.modalContainer}>
            <View style={styles.handle} />
            <Info label="Description" value={details.alt} />
            <Info label={'Photo ID'} value={details.id} />
            <LinkInfo
              label="Photographer"
              value={details.photographer}
              url={details.photographer_url}
            />
            <Info
              label="Resolution"
              value={`${details.width} × ${details.height}`}
            />
            <LinkInfo
              label={'Source'}
              value={'View on Pexels'}
              url={details.url}
            />
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
  infoContainer: {
    marginBottom: 14,
  },

  label: {
    fontSize: 18,
    fontWeight: '500',
  },

  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingBottom: 4,
  },

  linkText: {
    fontSize: 15,
    color: '#2563EB',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#D1D1D6',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
});

export default InfoModal;
