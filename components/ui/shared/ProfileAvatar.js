import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Edit, User } from 'lucide-react-native';

const ProfileAvatar = ({ 
  imageUri, 
  size = 120, 
  onEditPress, 
  style 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <View style={[styles.avatar, styles.defaultAvatar, { width: size, height: size, borderRadius: size / 2 }]}>
          <User size={size * 0.4} color="#9ca3af" />
        </View>
      )}
      {onEditPress && (
        <TouchableOpacity 
          style={[styles.editButton, { width: size * 0.3, height: size * 0.3, borderRadius: (size * 0.3) / 2 }]} 
          onPress={onEditPress}
        >
          <Edit size={size * 0.15} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#f3f4f6',
  },
  defaultAvatar: {
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ec4899',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
});

export default ProfileAvatar;
