import { Icon } from "~/types/icon.types";

export default function Mic(props: Icon) {
	return (
		<svg
			{...props}
			fill="currentColor"
			stroke-width="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style={{ overflow: "visible" }}
			height="1em"
			width="1em"
		>
			<path
				fill="currentColor"
				d="M12 3a3 3 0 0 0-3 3v4a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3Zm0-2a5 5 0 0 1 5 5v4a5 5 0 0 1-10 0V6a5 5 0 0 1 5-5ZM3.055 11H5.07a7.002 7.002 0 0 0 13.858 0h2.016A9.004 9.004 0 0 1 13 18.945V23h-2v-4.055A9.004 9.004 0 0 1 3.055 11Z"
			/>
		</svg>
	);
}