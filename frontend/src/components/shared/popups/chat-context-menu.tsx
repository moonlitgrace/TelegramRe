import { destructure } from "@solid-primitives/destructure";
import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Accessor, Show, createSignal, onCleanup, onMount } from "solid-js";
import { useShared } from "~/context/shared";
import { FormatDate } from "~/functions/format-date";
import Copy from "~/icons/copy";
import Pencil from "~/icons/pencil";
import Tick from "~/icons/tick";
import { ChatMessage } from "~/types/chat.types";

type Props = {
    x: number;
    y: number;
    self: Accessor<boolean>;
    message: Accessor<ChatMessage>;
    onClose: (e: CustomEvent) => void;
};

export const ChatContextMenu = (props: Props) => {
    const { setEditMessage } = useShared();

    const [copied, setCopied] = createSignal(false);
    const [x, setX] = createSignal(props.x);
    const [y, setY] = createSignal(props.y);

    const dispatch = createEventDispatcher(props);
    let ref: HTMLDivElement;
    const formatedDate = new FormatDate(props.message().timestamp).format_to_relative_time;

    const handleOutsideClick = (event: MouseEvent) => {
		if (!ref.contains(event.target as HTMLElement)) {
			dispatch("close", {});
		}
	};

	onMount(() => {
        const rect = ref.getBoundingClientRect();
        setX((prev) => prev > window.innerWidth - rect.width ? prev - rect.width : prev);
        setY((prev) => prev > window.innerHeight - rect.height ? prev - rect.height : prev);

		document.addEventListener("click", handleOutsideClick);
	});

	onCleanup(() => {
		document.removeEventListener("click", handleOutsideClick);
	});

    // Functions
    const handleCopy = async () => {
        await navigator.clipboard.writeText(props.message().content);
        setCopied(true);
    };

    const handleEdit = () => {
        setEditMessage(props.message());
        dispatch("close", {});
    };

    return (
        <div
			ref={ref!}
			class="absolute z-50 w-max select-none overflow-hidden rounded-lg bg-stone-900 p-1"
            style={{
                top: `${y()}px`,
                left: `${x()}px`,
            }}
		>
            <Show when={props.message().is_read && props.self()}>
                <div
                    class="grid grid-cols-12 gap-2 px-3 py-1.5 text-start text-stone-300"
                >
                    <Tick variant="double" class="col-span-2 size-full" />
                    <span class="col-span-10 text-sm font-medium">Seen {formatedDate}</span>
                </div>
            </Show>
			<Show when={props.self()}>
                <div
                    onClick={handleEdit}
                    class="grid cursor-pointer grid-cols-12 gap-2 px-3 py-1.5 rounded-md text-start text-stone-300 hover:bg-stone-800 hover:text-stone-100"
                >
                    <Pencil class="col-span-2 size-full" />
                    <span class="col-span-10 text-sm font-medium">Edit</span>
                </div>
            </Show>
            <div
                onClick={handleCopy}
                class="grid cursor-pointer grid-cols-12 gap-2 px-3 py-1.5 rounded-md text-start text-stone-300 hover:bg-stone-800 hover:text-stone-100"
            >
                <Copy class="col-span-2 size-full" />
                <span class="col-span-10 text-sm font-medium">
                    {copied() ? "Copied" : "Copy"}
                </span>
            </div>
		</div>
    )
};