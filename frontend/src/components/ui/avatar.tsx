import { Show } from "solid-js";
import { sample } from "~/functions/sample";
import { cn } from "~/functions/cn";

interface Props {
    src: string;
    alt: string;
    class?: string;
};

// TODO add more colors later
const color_mapping = ["#fab387", "#eba0ac", "#a6e3a1"];

export const Avatar = (props: Props) => {
    const has_avatar = props.src !== null;

    const getName = (str: string): string => {
        return str.charAt(0).toUpperCase();
    };

    return <>
        <Show
            when={has_avatar}
            fallback={
                <div
                    class={cn(props.class, "grid place-items-center")}
                    style={{"background-color": sample(color_mapping)}}
                >
                    {getName(props.alt)}
                </div>
            }
        >
            <img {...props} />
        </Show>
    </>;
};