"use client";

import { useState } from "react";
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { t } from "../../../trpc/client/client";
import { useToast } from "../../hooks";

export function LoginView() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });
  const router = useRouter();
  const { toast } = useToast();

  const { mutateAsync: register, isLoading: isRegistering } = t.auth.register.useMutation();
  const { mutateAsync: login, isLoading: isLoggingIn } = t.auth.login.useMutation();

  const handleRegister = async () => {
    try {
      await register(registerData);
      toast({ message: "Registered successfully. Please login." });
    } catch (error: any) {
      toast({ message: error.message });
    }
  };

  const handleLogin = async () => {
    try {
      await login(loginData);
      await signIn("credentials", { email: loginData.email, password: loginData.password, redirect: false });
      router.push("/");
    } catch (error: any) {
      toast({ message: error.message });
    }
  };

  const handleOAuth = (provider: string) => {
    signIn(provider);
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <motion.h2
            className="text-2xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome
          </motion.h2>
        </CardHeader>
        <CardBody>
          <Tabs>
            <Tab key="login" title="Login">
              <motion.div
                className="space-y-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Input
                  label="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
                <Input
                  label="Password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <Button onPress={handleLogin} isLoading={isLoggingIn} color="primary" fullWidth>
                  Login
                </Button>
              </motion.div>
            </Tab>
            <Tab key="register" title="Register">
              <motion.div
                className="space-y-4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Input
                  label="Username"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                />
                <Input
                  label="Email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />
                <Input
                  label="Password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
                <Button onPress={handleRegister} isLoading={isRegistering} color="primary" fullWidth>
                  Register
                </Button>
              </motion.div>
            </Tab>
          </Tabs>
          <motion.div
            className="mt-4 space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button onPress={() => handleOAuth("google")} color="primary" variant="bordered" fullWidth>
              Login with Google
            </Button>
            <Button onPress={() => handleOAuth("twitter")} color="primary" variant="bordered" fullWidth>
              Login with X (Twitter)
            </Button>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
