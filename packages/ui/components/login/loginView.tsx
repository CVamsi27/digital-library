import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { Mail } from "../../icons/mail";
import { Lock } from "../../icons/lock";
import { useRouter } from "next/navigation";

export function LoginView() {
  const router = useRouter();

  return (
    <div className="h-full flex justify-center mt-20">
      <Card className="w-4/12">
        <CardHeader className="flex flex-col gap-1">Log in</CardHeader>
        <CardBody className="relative">
          <Input
            autoFocus
            endContent={
              <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            className="mb-4"
          />
          <Input
            endContent={
              <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Password"
            placeholder="Enter your password"
            type="password"
            className="mb-4"
          />
          <div className="flex pt-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button color="primary" onPress={() => router.push("/")}>
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
