import { A } from "solid-start";
import { AuthLayout } from "~/layouts/auth_layout";

export default function SignIn() {
	return (
		<AuthLayout class="md:gap-[3vw]">
			<div class="flex flex-col md:gap-[0.5vw]">
				<h2 class="md:text-[2vw] font-bold">Welcome to Telegram-re</h2>
				<h4 class="md:text-[1.2vw] opacity-75">A Telegram inspired web messaging experience</h4>
			</div>
			<form class="flex flex-col md:gap-[1vw] w-full">
				<div class="flex flex-col md:gap-[0.25vw]">
					<label class="md:text-[1vw] opacity-50 font-medium" for="username">Username:</label>
					<input
						autofocus
						type="text" id="username" name="username" placeholder="eg: forger"
						class="bg-transparent md:border-b-[0.15vw] border-stone-400 focus:border-stone-900 md:py-[0.5vw] md:text-[1.1vw] font-medium transition-colors"
					/>
				</div>
				<div class="flex flex-col md:gap-[0.25vw]">
					<label class="md:text-[1vw] opacity-50 font-medium" for="password">Password:</label>
					<input
						type="text" id="password" name="password" placeholder="eg: forger-****"
						class="bg-transparent md:border-b-[0.15vw] border-stone-400 focus:border-stone-900 md:py-[0.5vw] md:text-[1.1vw] font-medium transition-colors"
					/>
				</div>
				<div class="flex flex-col md:gap-[0.25vw]">
					<label class="md:text-[1vw] opacity-50 font-medium" for="confirm-password">Confirm Password:</label>
					<input
						type="text" id="confirm-password" name="confirm-password" placeholder="eg: forger-****"
						class="bg-transparent md:border-b-[0.15vw] border-stone-400 focus:border-stone-900 md:py-[0.5vw] md:text-[1.1vw] font-medium transition-colors"
					/>
				</div>
				<div class="flex items-center md:gap-[0.5vw]">
					<input checked type="checkbox" id="remember-me" name="remember-me" class="accent-stone-900" />
					<label for="remember-me" class="md:text-[1vw] opacity-75">Agree with Terms and conditions</label>
				</div>
				<input type="submit" value="Sign in" class="bg-stone-900 text-white md:py-[1vw] font-medium md:text-[1.1vw] md:rounded-full cursor-pointer" />
				<span class="self-center md:text-[1.1vw]">
					Don't have an account?&nbsp;
					<A href="/user/sign-up/" class="font-medium underline">Sign up</A>&nbsp;
					now!
				</span>
			</form>
		</AuthLayout>
	)
}