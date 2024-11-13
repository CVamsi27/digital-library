import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { getProviders } from "next-auth/react";
import { useQuery } from "react-query";
import { Loading } from "../loading/loaging";

export function LoginView(): JSX.Element {
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
        <div className="flex justify-center md:mt-20">
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
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- required
                    onPress={async () => {
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
