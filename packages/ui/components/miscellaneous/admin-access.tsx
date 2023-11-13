/* eslint-disable @typescript-eslint/no-unsafe-call -- required */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- required */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- required */
import { Button, Input } from "@nextui-org/react";
import { t } from "../../../trpc/client/client";
import { useState } from "react";

export function AccessView(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync: grantAccess, isLoading } =
    t.grantAdminAccess.useMutation();
  return (
    <div className="grid grid-col-1 gap-4 w-72 mt-10 mx-auto">
      <div className="mx-auto">Provide Admin Access</div>
      <Input
        label="Email"
        onValueChange={setEmail}
        placeholder="Enter email"
        type="email"
        value={email}
      />
      <Input
        label="Password"
        onValueChange={setPassword}
        placeholder="Enter password"
        type="password"
        value={password}
      />
      <Button
        color="primary"
        isLoading={isLoading}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- required
        onPress={async () => {
          const message = await grantAccess({
            email,
            password,
          });
          // eslint-disable-next-line no-alert -- required
          alert(message);
          if (message.endsWith("Access")) {
            setEmail("");
            setPassword("");
          }
        }}
      >
        Grant Access
      </Button>
    </div>
  );
}
