import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Notfound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
      <Card className="text-center shadow-lg max-w-lg">
        <CardHeader>
          <CardTitle>Not found</CardTitle>
          <p className="text-gray-600">The page you looking is not exist</p>
        </CardHeader>
        <CardContent>
          <img
            className="round-lg shadow-lg"
            src="https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg"
          />
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => Navigate(-1)}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
