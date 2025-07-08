import { User, updateProfile, deleteUser, updateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

export interface UpdateProfileData {
  displayName?: string;
  photoURL?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export const updateUserProfile = async (user: User, data: UpdateProfileData) => {
  try {
    const updates: Promise<any>[] = [];
    const updatedData: any = {};

    // Reauthenticate user if changing email or password
    if ((data.email && data.email !== user.email) || data.newPassword) {
      if (!data.currentPassword) {
        throw new Error('Current password is required to update email or password');
      }
      
      // For email/password users, reauthenticate with current credentials
      const credential = EmailAuthProvider.credential(
        user.email || '',
        data.currentPassword
      );
      await reauthenticateWithCredential(user, credential);
    }

    // Update display name if changed
    if (data.displayName !== undefined && data.displayName !== user.displayName) {
      updates.push(updateProfile(user, { displayName: data.displayName }));
      updatedData.displayName = data.displayName;
    }

    // Update photo URL if changed
    if (data.photoURL !== undefined && data.photoURL !== user.photoURL) {
      updates.push(updateProfile(user, { photoURL: data.photoURL }));
      updatedData.photoURL = data.photoURL;
    }

    // Update email if changed
    if (data.email && data.email !== user.email) {
      updates.push(updateEmail(user, data.email));
      updatedData.email = data.email;
    }

    // Update password if new password is provided
    if (data.newPassword) {
      updates.push(updatePassword(user, data.newPassword));
    }

    // Execute all updates
    await Promise.all(updates);
    
    // Return the updated user data
    return { 
      success: true, 
      user: {
        ...user,
        ...updatedData
      }
    };
  } catch (error: any) {
    console.error('Error updating profile:', error);
    let errorMessage = 'Failed to update profile';
    
    // Provide more specific error messages
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already in use by another account';
    } else if (error.code === 'auth/requires-recent-login') {
      errorMessage = 'Please re-authenticate to update your email or password';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect current password';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

export const deleteUserAccount = async (user: User, password: string) => {
  try {
    // Get the current user's token
    const token = await user.getIdToken();
    
    // Reauthenticate user
    const credential = EmailAuthProvider.credential(user.email || '', password);
    await reauthenticateWithCredential(user, credential);
    
    // First, delete the user from your backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        firebaseUid: user.uid
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete user account');
    }
    
    // If backend deletion is successful, delete the Firebase auth user
    await deleteUser(user);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting user account:', error);
    let errorMessage = 'Failed to delete account';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = String(error.message);
    }
    
    throw new Error(errorMessage);
  }
};
