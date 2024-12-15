import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CardBox({ title, number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{number}</div>
      </CardContent>
    </Card>
  );
}

export default CardBox;
