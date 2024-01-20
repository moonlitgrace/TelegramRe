import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Show } from "solid-js";
import { A } from "solid-start";
import { useAuth } from "~/context/auth";
import Google from "~/icons/google";

interface Props {
	onFormSubmit: (e: CustomEvent) => void;
    authType: "login" | "register";
}

const EmailForm = (props: Props) => {
	const { loading } = useAuth();
	const dispatch = createEventDispatcher(props);

	const handleFormSubmit = (evt: SubmitEvent) => {
		evt.preventDefault();
		const formData = new FormData(evt.currentTarget as HTMLFormElement);
		const email = formData.get("email");

		dispatch("formSubmit", email);
	};

	return (
		<>
			<Show
                when={props.authType === "login"}
                fallback={
                    <div class="flex flex-col md:gap-[0.5vw]">
                        <h2 class="font-semibold text-stone-50 md:text-[1.75vw]">Join Telegram RE</h2>
                        <span class="flex max-w-[17vw] self-center text-stone-400 md:text-[1.05vw]">
                            Use OAuth or register via Email <br /> ( Passwordless )
                        </span>
                    </div>
                }
            >
                <div class="flex flex-col md:gap-[0.5vw]">
                    <h2 class="font-semibold text-stone-50 md:text-[1.75vw]">Login to Telegram RE</h2>
                    <span class="flex max-w-[17vw] self-center text-stone-400 md:text-[1.05vw]">
                        Use OAuth or login via Email <br /> ( Passwordless )
                    </span>
                </div>
            </Show>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-[0.75vw]"
			>
				<button type="button" class="grid grid-cols-[3.5vw_auto] bg-stone-800 text-stone-100 leading-none md:gap-[0.75vw] md:text-[1.1vw] font-medium md:rounded-[0.65vw] overflow-hidden">
					<div class="w-full h-full grid place-items-center bg-stone-700">
						<Google class="md:size-[1.5vw] text-stone-100" />
					</div>
					<span class="w-full md:p-[1vw]">Continue with Google</span>
				</button>
				<input
					required
					type="email"
					name="email"
					autofocus
					placeholder="Email address"
					class="w-full border-stone-700 bg-transparent text-stone-50 md:rounded-[0.65vw] md:border-[0.1vw] md:p-[0.75vw] md:text-[1.1vw]"
				/>
				<div class="flex items-center text-stone-50 md:gap-[1vw] md:text-[1vw]">
					<input
						name="keep-me"
						checked
						id="keep-me"
						type="checkbox"
						class="md:size-[1vw]"
					/>
					<label for="keep-me">Keep me signed in</label>
				</div>
				<button
					disabled={loading()}
					classList={{ "opacity-75": loading() }}
					class="flex items-center justify-center bg-blue-600 font-medium uppercase leading-none text-white transition-opacity md:gap-[1vw] md:rounded-[0.65vw] md:p-[1vw] md:text-[1.1vw]"
				>
					submit
				</button>
				<Show
                    when={props.authType === "login"}
                    fallback={
                        <A
                            class="text-stone-400 md:text-[1.1vw]"
                            href="../login"
                        >
                            Already have an account? Login!
                        </A>
                    }
                >
                    <A
                        class="text-stone-400 md:text-[1.1vw]"
                        href="../register"
                    >
                        Don't have an account? Register!
                    </A>
                </Show>
			</form>
		</>
	);
};

export default EmailForm;