import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile, deleteUserAccount } from '@/services/userService';
import { auth } from '@/config/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLanguage } from '@/context/LanguageContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, Save, Trash2, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProfileFormData {
  displayName: string;
  email: string;
  photoURL: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const { user: currentUser, setUser, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData | null>(null);
  
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [currentUser, navigate, location, loading]);

  // Removed the loading check that was causing the blank page
  // The loading state is now handled by the button's disabled state and loading indicator

  const form = useForm<ProfileFormData>({
    defaultValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      photoURL: currentUser?.photoURL || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, watch } = form;

  // Update form when user changes
  useEffect(() => {
    if (currentUser) {
      reset({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        photoURL: currentUser.photoURL || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [currentUser, reset]);

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    handleUpdateConfirmation(data);
  };

  const handleUpdateConfirmation = (data: ProfileFormData) => {
    setFormData(data);
    setShowUpdateModal(true);
  };

  const handleConfirmUpdate = async () => {
    if (!currentUser || !formData) return;
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      setShowUpdateModal(false);
    
      const data = formData;
      console.log('Processing update with data:', data);

      // Only include password fields if new password is provided
      const updateData: any = {
        displayName: data.displayName,
        photoURL: data.photoURL || null, // Use null instead of empty string
      };

      console.log('Update data before processing:', updateData);

      if (data.newPassword) {
        console.log('Password change requested');
        if (!data.currentPassword) {
          throw new Error('Current password is required to change password');
        }
        updateData.currentPassword = data.currentPassword;
        updateData.newPassword = data.newPassword;
      }

      // Only include email if changed
      if (data.email !== currentUser.email) {
        console.log('Email change detected');
        updateData.email = data.email;
        // Require current password for email changes
        if (!updateData.currentPassword) {
          updateData.currentPassword = data.currentPassword || '';
        }
      }

      console.log('Calling updateUserProfile with:', updateData);
      // Ensure user is authenticated before updating profile
      if (!auth.currentUser) {
        throw new Error('User must be authenticated to update profile');
      }
      await updateUserProfile(auth.currentUser, updateData);
      
      console.log('Profile update successful');
      // Update the auth context with the latest user data
      const updatedUser = {
        ...currentUser,
        displayName: data.displayName,
        email: data.email || currentUser.email,
        photoURL: data.photoURL || null,
      };
      setUser(updatedUser);

      const successMessage = t('Profile updated successfully') || 'Profile updated successfully';
      setSuccess(successMessage);
      toast({
        title: 'Success',
        description: successMessage,
      });
      
      // Clear password fields
      reset({
        ...data,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err: any) {
      console.error('Update error:', err);
      const errorMessage = err.message || (t('Profile update failed') || 'Failed to update profile');
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      // Keep the modal open on error
      setShowUpdateModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser || !deletePassword) {
      setDeleteError(t('Please enter your password') || 'Please enter your password');
      return;
    }
    
    setDeleteError('');
    setIsDeleting(true);
    
    try {
      // First, try to delete the user account using our service
      await deleteUserAccount(currentUser, deletePassword);
      
      // Show success message
      toast({
        title: t('Account deleted'),
        description: t('Your account has been successfully deleted.'),
        variant: 'default',
      });
      
      // Sign out the user after successful deletion
      await signOut();
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      console.error('Delete error:', error);
      let errorMessage = t('Failed to delete account. Please try again.') || 'Failed to delete account. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setDeleteError(errorMessage);
      
      // Show error toast
      toast({
        title: t('Error'),
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!currentUser) {
    return null; // Will be redirected by the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            {t('Profile')}
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <div className="ml-3">
                <AlertTitle className="text-lg">Error</AlertTitle>
                <AlertDescription className="text-base">{error}</AlertDescription>
              </div>
            </Alert>
          </div>
        )}
        
        {success && (
          <div className="mb-6">
            <Alert>
              <AlertCircle className="h-5 w-5 text-green-600" />
              <div className="ml-3">
                <AlertTitle className="text-lg text-green-800">Success</AlertTitle>
                <AlertDescription className="text-base text-green-700">
                  {success}
                </AlertDescription>
              </div>
            </Alert>
          </div>
        )}

        <div className="space-y-8">
          {/* Profile Information Card */}
          <Card className="shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <CardTitle className="text-white text-2xl">
                Profile Information
              </CardTitle>
              <CardDescription className="text-blue-100">
                Update your account's profile information and email address
              </CardDescription>
            </div>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="displayName" className="text-base">
                        {t('Display Name')}
                      </Label>
                      <Input
                        type="text"
                        id="displayName"
                        {...register('displayName', { required: t('Name required') })}
                        className={`h-12 text-base ${errors.displayName ? 'border-red-500' : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.displayName && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.displayName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">
                        {t('email')}
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        {...register('email', {
                          required: t('Email required'),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('Invalid email'),
                          },
                        })}
                        className={`h-12 text-base ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photoURL" className="text-base">
                        {t('Profile picture URL')} <span className="text-gray-500">(Optional)</span>
                      </Label>
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {watch('photoURL') ? (
                            <img 
                              src={watch('photoURL')} 
                              alt="Profile" 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <Input
                          type="url"
                          id="photoURL"
                          {...register('photoURL')}
                          className="h-12 text-base flex-1"
                          placeholder="https://example.com/photo.jpg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Section */}
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t('Change password')}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {t('Change password description')}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-base">
                          {t('Current password')}
                        </Label>
                        <Input
                          type="password"
                          id="currentPassword"
                          {...register('currentPassword', {
                            validate: (value) => 
                              !watch('newPassword') || value ? true : t('current password required'),
                          })}
                          className={`h-12 text-base ${errors.currentPassword ? 'border-red-500' : ''}`}
                          placeholder="••••••••"
                        />
                        {errors.currentPassword && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.currentPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-base">
                          {t('New password')}
                        </Label>
                        <Input
                          type="password"
                          id="newPassword"
                          {...register('newPassword', {
                            minLength: {
                              value: 6,
                              message: t('password min length')
                            }
                          })}
                          className={`h-12 text-base ${errors.newPassword ? 'border-red-500' : ''}`}
                          placeholder="••••••••"
                        />
                        {errors.newPassword && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.newPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-base">
                          {t('Confirm password')}
                        </Label>
                        <Input
                          type="password"
                          id="confirmPassword"
                          {...register('confirmPassword', {
                            validate: (value) =>
                              value === watch('newPassword') || t('passwords do not match'),
                          })}
                          className={`h-12 text-base ${errors.confirmPassword ? 'border-red-500' : ''}`}
                          placeholder="••••••••"
                        />
                        {errors.confirmPassword && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="px-8 py-6 text-base font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t('saving') || 'Saving...'}
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-5 w-5" />
                          {t('Save changes') || 'Save changes'}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Danger Zone Card */}
          <Card className="border-red-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-4">
              <CardTitle className="text-white text-2xl">
                {t('Danger zone')}
              </CardTitle>
              <CardDescription className="text-red-100">
                {t('Delete account warning')}
              </CardDescription>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium text-red-800">
                    Delete Account
                  </h3>
                  <p className="text-sm text-red-600">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(true)}
                  className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('Delete my account')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Update Confirmation Dialog */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to save these changes?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {formData?.newPassword && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-700">
                  You're about to change your password. Make sure you remember your new password.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowUpdateModal(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmUpdate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Confirm Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('Confirm account deletion')}</DialogTitle>
            <DialogDescription>
              {t('Delete account confirmation')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="deletePassword">{t('Enter password')}</Label>
              <Input
                id="deletePassword"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder={t('Your password')}
              />
              {deleteError && (
                <p className="text-sm text-destructive">{deleteError}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              {t('cancel')}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              disabled={!deletePassword || isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {t('Delete my account')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
