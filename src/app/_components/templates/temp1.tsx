import { Card, CardContent } from "~/components/ui/card";


export function Temp1() {
    return (
        <Card className="w-[250px] h-[300px] p-1">
            <CardContent className="h-full p-0">
                <div className="grid grid-cols-3 grid-rows-6 gap-2 h-full">
                    <div className="col-span-2 row-span-2 bg-gray-200 flex items-center justify-center rounded-md border border-dashed">
                        <span className="text-center text-sm text-gray-500"> 1<br /></span>
                    </div>
                    <div className="col-span-1 row-span-2 bg-gray-200 flex items-center justify-center rounded-md border border-dashed">
                        <span className="text-center text-sm text-gray-500">2<br /></span>
                    </div>
                    <div className="col-span-1 row-span-4 bg-gray-200 flex items-center justify-center rounded-md border border-dashed">
                        <span className="text-center text-sm text-gray-500">3<br /></span>
                    </div>
                    <div className="col-span-2 row-span-2 bg-gray-200 flex items-center justify-center rounded-md border border-dashed gap-x-1">
                        <span className="text-center text-sm text-gray-500">4<br /></span>
                    </div>
                    <div className="col-span-2 row-span-2 bg-gray-200 flex items-center justify-center rounded-md border border-dashed">
                        <span className="text-center text-sm text-gray-500">5<br /></span>
                    </div>
                    <div className="col-span-1 row-span-2 bg-gray-200 flex items-center justify-center rounded-md border border-dashed">
                        <span className="text-center text-sm text-gray-500">6<br /></span>
                    </div>
                    <div className="col-span-2 row-span-2 bg-gray-200 flex items-center justify-center rounded-md border border-dashed">
                        <span className="text-center text-sm text-gray-500">7<br /></span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}