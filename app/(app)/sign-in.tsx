import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import * as z from "zod";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput, FormMessage } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { openLink } from "@/lib/utils";
import { TERMS_AND_CONDITIONS_URL, PRIVACY_POLICY_URL } from "@/constants/urls";

const formSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
	password: z
		.string()
		.min(8, "Please enter at least 8 characters.")
		.max(64, "Please enter fewer than 64 characters."),
	acceptTerms: z.boolean().refine((val) => val === true, {
		message: "You must accept the terms and privacy policy to continue.",
	}),
});

export default function SignIn() {
	const { signInWithPassword } = useSupabase();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			acceptTerms: false,
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			await signInWithPassword(data.email, data.password);
			form.reset();
		} catch (error: Error | any) {
			console.log(error.message);
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-background p-4" edges={["bottom"]}>
			<View className="flex-1 gap-6 web:m-4">
				<H1 className="self-start text-4xl">Sign In</H1>
				<Form {...form}>
					<View className="gap-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormInput
									label="Email"
									placeholder="Email"
									autoCapitalize="none"
									autoComplete="email"
									importantForAutofill="yes"
									autoCorrect={false}
									keyboardType="email-address"
									{...field}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormInput
									label="Password"
									placeholder="Password"
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry
									importantForAutofill="yes"
									autoComplete="password"
									{...field}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="acceptTerms"
							render={({ field }) => (
								<View className="gap-2">
									<View className="flex-row items-center gap-3">
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
										<Text className="flex-1 text-base text-muted-foreground">
											I accept the{" "}
											<Text
												className="text-primary"
												onPress={() => openLink(TERMS_AND_CONDITIONS_URL)}
											>
												Terms
											</Text>{" "}
											and{" "}
											<Text
												className="text-primary"
												onPress={() => openLink(PRIVACY_POLICY_URL)}
											>
												Privacy Policy
											</Text>
										</Text>
									</View>
									<FormMessage />
								</View>
							)}
						/>
					</View>
				</Form>
			</View>
			<Button
				size="default"
				variant="default"
				onPress={form.handleSubmit(onSubmit)}
				disabled={form.formState.isSubmitting}
				className="web:m-4"
			>
				{form.formState.isSubmitting ? (
					<ActivityIndicator size="small" />
				) : (
					<Text>Sign In</Text>
				)}
			</Button>
		</SafeAreaView>
	);
}
