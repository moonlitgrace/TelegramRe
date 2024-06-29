import type { Icon } from "~/types/icon";

export default function Photo(props: Icon) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
      >
        <path d="M15 8h.01M12.5 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6.5" />
        <path d="m3 16l5-5c.928-.893 2.072-.893 3 0l4 4" />
        <path d="m14 14l1-1c.67-.644 1.45-.824 2.182-.54M16 19h6m-3-3v6" />
      </g>
    </svg>
  );
}