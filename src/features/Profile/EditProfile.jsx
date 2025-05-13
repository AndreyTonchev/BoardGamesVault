import { useState } from 'react';
import { useNavigate } from 'react-router';
import InputField from '../../ui/InputField';
import Button from '../../ui/Button';
import supabase from '../../services/supabase';

function EditProfile({ profile, toggle }) {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(profile.display_name);
    const [newAvatarUrl, setNewAvatarUrl] = useState(profile.avatar_url);
    const [newBio, setNewBio] = useState(profile.bio);
    const [loading, setLoading] = useState(false);

    async function handleSaveProfile(e) {
        e.preventDefault();

        const updateObject = {
            bio: newBio || profile.bio,
            avatar_url: newAvatarUrl || profile.avatar_url || '',
            display_name: newDisplayName || profile.display_name,
        };
        setLoading(true);

        try {
            const { error } = await supabase
                .from('user_profiles')
                .update(updateObject)
                .eq('id', profile.id);

            if (error) throw error;

            setNewDisplayName('');
            setNewAvatarUrl('');
            setNewBio('');
            toggle(false);
            navigate(0);
        } catch (error) {
            console.error('Error Updating user:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            className="container flex flex-col gap-6 p-6"
            onSubmit={handleSaveProfile}
        >
            <h2 className="border-b-1 border-neutral-600 pb-6 text-2xl font-semibold">
                Edit Profile
            </h2>
            <InputField
                placeholder="Your display name"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
            >
                Display Name:
            </InputField>
            <InputField
                placeholder="https://example.com/avatar.png"
                value={newAvatarUrl}
                onChange={(e) => setNewAvatarUrl(e.target.value)}
            >
                Avatar URL:
            </InputField>
            <InputField
                placeholder="Tell us about yourself"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                moreContent={true}
            >
                Bio:
            </InputField>
            <Button disabled={loading} type="submit">
                Save Profile
            </Button>
        </form>
    );
}

export default EditProfile;
