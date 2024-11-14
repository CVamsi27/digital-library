import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { getProviders } from "next-auth/react";
import { useQuery } from "react-query";
import { Loading } from "../loading/loaging";
import { useState } from "react";

export function LoginView(): JSX.Element {
  const [isLoginLoading, setIsLoginLoading] = useState<Record<string, boolean>>(
    {},
  );
  const isAnyLoading = Object.values(isLoginLoading).some((state) => state);
  const retrieveProviders = async () => getProviders();
  const { data: providers, isLoading } = useQuery(
    "providersData",
    retrieveProviders,
  );
  return (
    <>
      {isLoading || !providers ? (
        <Loading />
      ) : (
        <div className="flex justify-center mt-10 md:mt-20">
          <Card>
            <CardHeader className="flex flex-col gap-2 text-xl font-bold">
              Log In Using
            </CardHeader>
            <CardBody>
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    className="m-2"
                    color="primary"
                    size="lg"
                    isLoading={isLoginLoading[provider.name]}
                    disabled={isAnyLoading && !isLoginLoading[provider.name]}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- required
                    onPress={async () => {
                      setIsLoginLoading((prev) => ({
                        ...prev,
                        [provider.name]: true,
                      }));
                      await signIn(provider.id);
                    }}
                  >
                    Sign in with {provider.name}
                  </Button>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
