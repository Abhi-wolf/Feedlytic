import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PersonalInfo() {
  const session = await auth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
          <AvatarFallback>{session?.user?.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
          <p className="text-gray-500">{session?.user?.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
