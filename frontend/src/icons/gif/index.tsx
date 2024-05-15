import type { Icon } from "~/types/icon";

export default function Gif(props: Icon) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 16 16"
		>
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M14 4.5V14a2 2 0 0 1-2 2H9v-1h3a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.278 13.124a1.4 1.4 0 0 0-.14-.492a1.3 1.3 0 0 0-.314-.407a1.5 1.5 0 0 0-.48-.275a1.9 1.9 0 0 0-.636-.1q-.542 0-.926.229a1.5 1.5 0 0 0-.583.632a2.1 2.1 0 0 0-.199.95v.506q0 .408.105.745q.105.336.32.58q.213.243.533.377q.323.132.753.132q.402 0 .697-.111a1.29 1.29 0 0 0 .788-.77q.097-.261.097-.551v-.797H1.717v.589h.823v.255q0 .199-.09.363a.67.67 0 0 1-.273.264a1 1 0 0 1-.457.096a.87.87 0 0 1-.519-.146a.9.9 0 0 1-.305-.413a1.8 1.8 0 0 1-.096-.615v-.499q0-.547.234-.85q.237-.3.665-.301a1 1 0 0 1 .3.044q.136.044.236.126a.7.7 0 0 1 .17.19a.8.8 0 0 1 .097.25zm1.353 2.801v-3.999H3.84v4h.79Zm1.493-1.59v1.59h-.791v-3.999H7.88v.653H6.124v1.117h1.605v.638z"
			/>
		</svg>
	);
}
