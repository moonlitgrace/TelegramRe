import { For } from "solid-js";
import { groupChatBySender } from "~/functions/group_chat";
import { ChatProps } from "~/types/chat";
import { ChatBubble } from "./chat-bubble";
import { useAuth } from "~/context/auth";

interface Props {
	chat: ChatProps[];
	ref: HTMLDivElement;
}

export const ChatArea = (props: Props) => {
	const { user } = useAuth();

	return (
		<div class="relative flex items-end">
			<div
				ref={props.ref}
				class="md:px-[15vw] flex w-full flex-col gap-[0.5vw] overflow-y-scroll pb-[4.5vw] px-[1vw] pt-[5vw] [scrollbar-width:_thin] [scrollbar-color:_rgba(255,255,255,0.1)_transparent]"
				style={{ "max-height": "calc(100vh - 3.75vw)" }}
			>
				<For each={groupChatBySender(props.chat)}>
					{(group) => (
						<div
							class="relative flex items-end gap-[0.65vw]"
							classList={{ "self-end flex-row-reverse": group.sender.username === user()!.username }}
						>
							<img
								hidden
								src={group.sender.image}
								alt="anya-forger"
								class="sticky bottom-0 w-[2.15vw] select-none rounded-full"
							/>
							<div
								class="flex flex-col gap-[0.15vw]"
								classList={{ "items-end": group.sender.username === user()!.username }}
							>
								<For each={group.chats}>
									{(message, i) => (
										<ChatBubble
											message={message}
											self={group.sender.username === user()!.username}
											lastMessage={message.username !== group.chats[i() + 1]?.username && group.chats.length !== 1}
											middleMessage={message.username === group.chats[i() - 1]?.username && message.username === group.chats[i() + 1]?.username}
											firstMessage={message.username !== group.chats[i() - 1]?.username && message.username === group.chats[i() + 1]?.username}
										/>
									)}
								</For>
							</div>
						</div>
					)}
				</For>
			</div>
		</div>
	);
};