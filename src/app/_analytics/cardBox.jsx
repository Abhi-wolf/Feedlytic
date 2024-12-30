import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CardBox({ title, number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl md:text-4xl font-bold">{`${
          number < 10 ? "0" : ""
        }${number}`}</div>
      </CardContent>
    </Card>
  );
}

export default CardBox;
