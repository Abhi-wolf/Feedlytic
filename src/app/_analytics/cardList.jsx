"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardList({ items, title, col1, col2 }) {
  const maxVisits = items?.reduce(
    (max, item) => (Number(item.visits) > max ? Number(item.visits) : max),
    0
  );

  return (
    <Card className="max-h-[60vh] overflow-y-auto w-full">
      <CardHeader>
        <CardTitle>{title} </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <div className="min-w-full divide-y divide-border">
                <div className=" px-6 py-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  <div className="flex justify-between">
                    <span>{col1}</span>
                    <span>{col2}</span>
                  </div>
                </div>
                <div className="bg-background">
                  {items?.length === 0 ? (
                    <div className="px-6 py-4 text-sm text-center text-destructive">
                      No data found
                    </div>
                  ) : (
                    items?.map((item, index) => {
                      const widthPercentage =
                        (Number(item.visits) / Number(maxVisits + 5)) * 100;

                      return (
                        <div
                          key={index}
                          className="relative hover:bg-accent smooth my-2"
                        >
                          <div className="px-3 py-2">
                            <div className="flex justify-between items-center">
                              <div className="text-sm font-medium text-foreground relative z-10">
                                {item[col1]}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {item.visits?.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute left-0 top-0 h-full bg-chart-1/20 smooth rounded-lg"
                            style={{ width: `${widthPercentage}%` }}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
