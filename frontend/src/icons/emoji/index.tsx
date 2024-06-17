import type { Icon } from "~/types/icon";

export default function Emoji(props: Icon) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M12 15a2 2 0 1 0 0-4a2 2 0 0 0 0 4m10-2a2 2 0 1 1-4 0a2 2 0 0 1 4 0M9.553 19.106a1 1 0 0 1 1.338.44l.003.006l.034.058c.035.057.093.146.177.259c.169.225.44.536.832.85C12.71 21.337 13.993 22 16 22s3.29-.663 4.063-1.28c.393-.315.664-.626.832-.851a3 3 0 0 0 .211-.317l.004-.007a1 1 0 0 1 1.785.902v.001l-.002.002v.002l-.004.006l-.008.015a3 3 0 0 1-.1.175a5 5 0 0 1-.285.42a6.8 6.8 0 0 1-1.184 1.213C20.21 23.163 18.493 24 16 24s-4.21-.837-5.312-1.72a6.8 6.8 0 0 1-1.183-1.211a5 5 0 0 1-.386-.596l-.008-.015l-.003-.006l-.001-.003l-.001-.002a1 1 0 0 1 .447-1.341M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14s14-6.268 14-14S23.732 2 16 2M4 16C4 9.373 9.373 4 16 4s12 5.373 12 12s-5.373 12-12 12S4 22.627 4 16"
      />
    </svg>
  );
}
