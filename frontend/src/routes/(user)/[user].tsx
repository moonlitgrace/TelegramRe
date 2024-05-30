import { Title } from "@solidjs/meta";
import { RouteDefinition, RouteSectionProps, cache } from "@solidjs/router";
import { Show } from "solid-js";
import ChatScreen from "~/components/pages/chat";
import ChatSidebar from "~/components/shared/chat/chat-sidebar";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import ApiEndpoints from "~/endpoints/api/api-endpoints";
import { fetchAPI } from "~/functions/api/fetch-api";
import { get_username } from "~/functions/get-username";
import DefaultLayout from "~/layouts/default-layout";

const getUser = cache(async (username: string) => {
	try {
		const data = await fetchAPI("http://backend:8000/api/v1/user/auth/session/", {
			credentials: "include",
		});
		console.log("Data on getUser: ", data);
		return data;
	} catch (err) {
		console.log("Err: ", err);
	};
}, "user");

export const route = {
	load: (args) => {
		const username = get_username(args.params.user);
		console.debug(username);
		getUser(username);
	},
  	matchFilters: {
  		user: (v: string) => v.length > 1 && v.includes("@")
  	}
} satisfies RouteDefinition;

const UserChat = (props: RouteSectionProps) => {
	const { showSidebar } = useShared();
	const { activeRoom } = useChat();

	const title = activeRoom()?.member[0].full_name ?? props.params.user;

	return (
		<>
			<Title>{title}</Title>
			<DefaultLayout>
				<ChatScreen />
				<Show when={showSidebar()}>
					<ChatSidebar />
				</Show>
			</DefaultLayout>
		</>
	);
};

export default UserChat;