import { JSX, Show } from "solid-js";
import { Navigate } from "solid-start";
import Sidebar from "~/components/shared/sidebar";
import { useAuth } from "~/context/auth";

export function DefaultLayout(props: { children?: JSX.Element }) {
	const { isAuthenticated } = useAuth();

	return (
		<Show
			when={isAuthenticated()}
			fallback={<Navigate href={"/auth/login"} />}
		>
			<main class="mx-auto grid h-screen w-screen grid-cols-[21rem_1fr_auto] overflow-x-hidden 2xl:container">
				{/* dark overlay for background-image */}
				<div class="absolute inset-0 -z-[9999] bg-black/95" />

				<Sidebar />
				{props.children}
			</main>
		</Show>
	);
}
