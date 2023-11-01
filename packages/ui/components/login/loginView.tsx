import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { getProviders } from "next-auth/react";
import { useQuery } from "react-query";
import { Loading } from "../loading/loaging";

export function LoginView() {
  const retrieveProviders = async () => await getProviders();
  const { data: providers, isLoading } = useQuery(
    "providersData",
    retrieveProviders,
  );
  return (
    <>
      {isLoading || !providers ? (
        <Loading />
      ) : (
        <div className="h-full flex justify-center mt-20">
          <Card>
            <CardHeader className="flex flex-col gap-2">Log In</CardHeader>
            <CardBody>
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    className="m-2"
                    size="lg"
                    onClick={() => {
                      signIn(provider.id);
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
