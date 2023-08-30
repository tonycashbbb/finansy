import {UseQueryOptions, useQuery} from '@tanstack/react-query';

export const profileKeys = {
	profile: {
		root: ['profile'],
		username: (userId: string) => [...profileKeys.profile.root, userId],
	},
};

type Profile = {
	username: string;
	bio: string;
	image: string;
};
type Error = 'error';
type UseProfileQuery = UseQueryOptions<Profile, Error, Profile, string[]>;
type UseProfileQueryOptions = Omit<UseProfileQuery, 'queryKey' | 'queryFn'>;

type useProfileProps = {
	userId: string;
	options?: UseProfileQueryOptions;
};

export function useProfile(props: useProfileProps) {
	const {userId, options} = props;

	return useQuery({
		queryKey: profileKeys.profile.username(userId),
		queryFn: async ({signal}) => {
			// profileApi.getItem({userId}, {signal})
			console.log(userId);
			console.log(signal);

			return Promise.resolve({username: 'q', bio: 'q', image: 'q'});
		},
		...options,
	});
}
